import type { Organization, Prisma } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

function getFilters(input: string[]) {
  let filter: Prisma.RecipeWhereInput = {}
  if (input.length) {
    filter = {
      tag: {
        some: {
          title: {
            in: input,
          },
        },
      },
    }
    return filter
  }
  return undefined
}

export async function getRecipeCount(organizationId: Organization['id']) {
  return prisma.recipe.count({
    where: {
      organizationId,
    },
  })
}

export async function getRecipesByOrganizationId(
  organizationId: Organization['id'],
  tagFilter: string[]
) {
  const filter = getFilters(tagFilter)

  return prisma.recipe.findMany({
    where: {
      organizationId,
      ...filter,
    },
    include: { tag: true },
  })
}
