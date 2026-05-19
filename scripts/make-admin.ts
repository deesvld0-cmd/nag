import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function makeAdmin() {
  const email = process.argv[2] || process.env.ADMIN_EMAIL

  if (!email) {
    console.log('❌ Usage: npx tsx scripts/make-admin.ts <email>')
    console.log('   Or set ADMIN_EMAIL in .env')
    process.exit(1)
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      console.log(`❌ User with email ${email} not found. Please sign in first.`)
      process.exit(1)
    }

    await prisma.user.update({
      where: { email },
      data: { role: 'admin' }
    })

    console.log(`✅ User ${email} is now an admin`)
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

makeAdmin()
