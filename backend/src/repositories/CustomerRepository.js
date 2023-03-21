import bcryptjs from 'bcryptjs'
import prisma from '../config/database.js'

export default class CustomerRepository {
  async index() {
    const user = await prisma.users.findMany()
    await prisma.$disconnect()
    return user
  }

  async store({ name, email, password }) {
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password_hash: await bcryptjs.hash(password, 8),
        created_at: new Date(),
        updated_at: new Date(),
      },
    })
    await prisma.$disconnect()
    return newUser
  }

  async show(userId) {
    const returnedUser = await prisma.users.findUnique({
      where: {
        id: +userId,
      },
    })
    await prisma.$disconnect()
    return returnedUser
  }

  async update(userId, { name }) {
    const updatedUser = await prisma.users.update({
      where: {
        id: +userId,
      },
      data: {
        name,
        updated_at: new Date(),
      },
    })
    await prisma.$disconnect()
    return updatedUser
  }

  async delete(userId) {
    const deletedUser = await prisma.users.delete({
      where: {
        id: +userId,
      },
    })
    await prisma.$disconnect()
    return deletedUser
  }
}
