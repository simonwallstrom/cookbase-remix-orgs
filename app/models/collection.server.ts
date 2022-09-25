import type { Organization } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export async function getCollectionsByOrganizationId(organizationId: Organization['id']) {
  return prisma.collection.findMany({
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
