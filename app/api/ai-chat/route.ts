import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

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
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...(Array.isArray(messages) ? messages : [])],
      max_tokens: 260,
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
    return NextResponse.json({ error: 'Failed to get AI response' }, { status: 500 })
  }
}
