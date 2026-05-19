import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@nanzad.mn'
  const name = process.env.ADMIN_NAME || 'Admin User'

  try {
    // Check if admin user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('User with this email already exists. Updating role to admin...')
      await prisma.user.update({
        where: { email },
        data: { role: 'admin' }
      })
      console.log('✅ User role updated to admin')
    } else {
      // Create new admin user
      const admin = await prisma.user.create({
        data: {
          email,
          name,
          role: 'admin',
          emailVerified: new Date()
        }
      })
      console.log('✅ Admin user created:', admin)
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()
