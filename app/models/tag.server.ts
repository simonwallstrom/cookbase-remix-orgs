import type { Organization } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export async function getTagsByOrganizationId(organizationId: Organization['id']) {
  return prisma.tag.findMany({
    where: { organizationId },
    include: {
      _count: {
        select: {
          recipes: true,
        },
      },
    },
    orderBy: {
      recipes: {
        _count: 'desc',
      },
    },
  })
}
