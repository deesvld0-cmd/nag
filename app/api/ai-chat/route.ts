import OpenAI from 'openai'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const apiKey = (process.env.OPENAI_API_KEY || '').trim()
    if (!apiKey || apiKey === 'your-openai-api-key-here') {
      return new Response(
        'AI is not configured yet. Please set OPENAI_API_KEY in your Vercel project (Production environment) and redeploy.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      )
    }

    const openai = new OpenAI({ apiKey })

    const systemMessage = {
      role: 'system' as const,
      content: `You are a professional fitness and nutrition AI assistant. Provide helpful, accurate advice about:
- Workout routines and exercises
- Nutrition and diet planning
- Fitness goals and progress tracking
- Recovery and injury prevention
- Supplements and performance

Keep responses concise, practical, and encouraging. Always prioritize safety and suggest consulting professionals for medical concerns.`,
    }

    // Streaming gives the user an answer "instantly" (first tokens appear quickly),
    // which feels much faster than waiting for the full JSON response.
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini',
      messages: [systemMessage, ...(Array.isArray(messages) ? messages : [])],
      max_tokens: 400,
      temperature: 0.7,
      stream: true,
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices?.[0]?.delta?.content || ''
            if (delta) controller.enqueue(encoder.encode(delta))
          }
        } catch (error) {
          console.error('AI Chat Stream Error:', error)
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
    })
  } catch (error) {
    console.error('AI Chat Error:', error)

    const status = (error as any)?.status as number | undefined
    const message = (error as any)?.message as string | undefined

    if (status === 401) {
      return new Response(
        'AI auth failed (OpenAI API key is missing/invalid). Please check OPENAI_API_KEY in Vercel and redeploy.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      )
    }

    if (status === 429) {
      return new Response('AI is rate limited right now. Please try again in a minute.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      })
    }

    return new Response(message || 'Failed to get AI response.', {
      status: 500,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }
}
