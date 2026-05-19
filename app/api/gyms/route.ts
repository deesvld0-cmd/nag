import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const district = searchParams.get('district')
    const featured = searchParams.get('featured') === 'true'
    const availableOnly = searchParams.get('availableOnly') === 'true'
    const minRating = searchParams.get('minRating')
    const userLat = searchParams.get('lat')
    const userLng = searchParams.get('lng')

    const where: any = {}

    if (district && district !== 'All') {
      where.district = district
    }

    if (featured) {
      where.isFeatured = true
    }

    if (availableOnly) {
      where.availability = true
    }

    if (minRating) {
      where.rating = { gte: parseFloat(minRating) }
    }

    const gyms = await prisma.gym.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' }
      ]
    })

    // Calculate distances if user location is provided
    let gymsWithDistance = gyms
    if (userLat && userLng) {
      const userLatitude = parseFloat(userLat)
      const userLongitude = parseFloat(userLng)

      gymsWithDistance = gyms.map(gym => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          gym.latitude,
          gym.longitude
        )
        return { ...gym, distance }
      }).sort((a, b) => a.distance - b.distance)
    }

    return NextResponse.json(gymsWithDistance)
  } catch (error) {
    console.error('Error fetching gyms:', error)
    return NextResponse.json({ error: 'Failed to fetch gyms' }, { status: 500 })
  }
}

// Calculate distance between two coordinates in kilometers
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const gym = await prisma.gym.create({
      data: body
    })
    return NextResponse.json(gym, { status: 201 })
  } catch (error) {
    console.error('Error creating gym:', error)
    return NextResponse.json({ error: 'Failed to create gym' }, { status: 500 })
  }
}
