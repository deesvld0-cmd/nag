import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const availableOnly = searchParams.get('availableOnly') === 'true'
    const featured = searchParams.get('featured') === 'true'

    const where: any = {}

    if (availableOnly) {
      where.availability = true
    }

    if (featured) {
      where.isFeatured = true
    }

    const trainers = await prisma.trainer.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' }
      ]
    })

    let filteredTrainers = trainers

    if (category && category !== 'All') {
      filteredTrainers = trainers.filter(trainer =>
        trainer.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      )
    }

    return NextResponse.json(filteredTrainers)
  } catch (error) {
    console.error('Error fetching trainers:', error)
    return NextResponse.json({ error: 'Failed to fetch trainers' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const trainer = await prisma.trainer.create({
      data: body
    })
    return NextResponse.json(trainer, { status: 201 })
  } catch (error) {
    console.error('Error creating trainer:', error)
    return NextResponse.json({ error: 'Failed to create trainer' }, { status: 500 })
  }
}
