import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get user subscription with trainer
    let subscription = null;
    try {
      subscription = await (prisma as any).userSubscription?.findFirst({
        where: {
          userId: user.id,
          status: 'active',
        },
        include: {
          trainer: true,
        },
      });
    } catch (e) {
      console.log('UserSubscription model not available yet');
    }

    // Get user progress stats
    let progress: any[] = [];
    try {
      progress = await (prisma as any).userProgress?.findMany({
        where: { userId: user.id },
      }) || [];
    } catch (e) {
      console.log('UserProgress model not available yet');
    }

    const stats = {
      workoutsCompleted: progress.filter(p => p.completed).length,
      inProgress: progress.filter(p => !p.completed && p.progress > 0).length,
      totalPrograms: progress.length,
      currentStreak: 0,
      caloriesBurned: 0,
      goalsAchieved: 0,
    };

    return NextResponse.json({ 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
      subscription,
      stats,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
