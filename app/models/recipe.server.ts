import type { Organization } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

export async function getRecipesByOrganizationId(organizationId: Organization['id']) {
  return prisma.recipe.findMany({
    where: { organizationId },
  })
}
