import type { Organization, Password, User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { prisma } from '~/utils/prisma.server'
export type { User } from '@prisma/client'

export async function getUserById(id: User['id']) {
  return prisma.user.findUnique({
    where: { id },
    include: { organization: true },
  })
}

export async function getUserByEmail(email: User['email']) {
  return prisma.user.findUnique({ where: { email } })
}

export async function createUser(
  account: Organization['name'],
  email: User['email'],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      organization: {
        create: {
          name: account,
        },
      },
    },
  })

  await prisma.invitation.create({
    data: {
      organizationId: user.organizationId,
    },
  })

  return user
}

export async function createInvitedUser(
  organizationId: User['organizationId'],
  email: User['email'],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      organizationId,
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

export async function deleteUserByEmail(email: User['email']) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin(email: User['email'], password: Password['hash']) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}
