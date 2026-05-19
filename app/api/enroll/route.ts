import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { trainerId, plan, payment } = body;

    if (!trainerId || !plan) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Paid plans must provide some payment confirmation details.
    if (plan === 'pro' || plan === 'elite') {
      const method = payment?.method;
      if (method !== 'card' && method !== 'qr') {
        return NextResponse.json({ error: 'Payment method is required for this plan' }, { status: 400 });
      }
      if (method === 'card') {
        const last4 = String(payment?.cardLast4 ?? '').trim();
        if (last4.length < 4) {
          return NextResponse.json({ error: 'Card details are required to proceed' }, { status: 400 });
        }
      }
      if (method === 'qr') {
        const ref = String(payment?.qrReference ?? '').trim();
        if (ref.length < 4) {
          return NextResponse.json({ error: 'Payment reference is required to proceed' }, { status: 400 });
        }
      }
    }

    const trainer = await prisma.trainer.findUnique({
      where: { id: trainerId },
    });

    if (!trainer) {
      return NextResponse.json({ error: 'Selected trainer not found. Please refresh and try again.' }, { status: 404 });
    }

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.userSubscription.findFirst({
      where: {
        userId: user.id,
        status: 'active',
      },
    });

    let subscription;

    if (existingSubscription) {
      // If user already has a subscription, treat trainer selection as an update.
      subscription = await prisma.userSubscription.update({
        where: { id: existingSubscription.id },
        data: {
          trainerId,
          plan,
          status: 'active',
          updatedAt: new Date(),
        },
        include: {
          trainer: true,
        },
      });
    } else {
      // Create subscription
      subscription = await prisma.userSubscription.create({
        data: {
          userId: user.id,
          trainerId,
          plan,
          status: 'active',
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
        include: {
          trainer: true,
        },
      });
    }

    return NextResponse.json({ 
      success: true, 
      subscription,
      message: `Successfully enrolled with ${subscription.trainer?.name}` 
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
