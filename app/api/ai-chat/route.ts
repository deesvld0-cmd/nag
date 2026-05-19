import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const systemMessage = {
      role: 'system' as const,
      content: `You are a professional fitness and nutrition AI assistant. Provide helpful, accurate advice about:
- Workout routines and exercises
- Nutrition and diet planning
- Fitness goals and progress tracking
- Recovery and injury prevention
- Supplements and performance

Keep responses concise, practical, and encouraging. Always prioritize safety and suggest consulting professionals for medical concerns.`
    };

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}
