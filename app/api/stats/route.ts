import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const userCount = await prisma.user.count();
    const trainerCount = await prisma.trainer.count();

    return NextResponse.json({
      members: userCount,
      trainers: trainerCount,
      rating: 4.9
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({
      members: 50,
      trainers: 200,
      rating: 4.9
    });
  }
}
