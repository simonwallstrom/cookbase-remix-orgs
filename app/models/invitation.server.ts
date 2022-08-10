import type { Invitation, Organization } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export async function getInvitations(organizationId: Organization['id']) {
  return prisma.invitation.findFirst({
    where: {
      organizationId,
    },
    select: {
      id: true,
    },
  })
}

export async function getInviteById(id: Invitation['id']) {
  return prisma.invitation.findUnique({
    where: { id },
    select: {
      id: true,
      organization: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
}
