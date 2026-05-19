import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const programs = await prisma.program.findMany()
    return NextResponse.json(programs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const program = await prisma.program.create({
      data: body
    })
    return NextResponse.json(program, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 })
  }
}
