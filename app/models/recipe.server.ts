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

export async function getRecipeCount(organizationId: Organization['id'], tagFilter: string[]) {
  const filter = getFilters(tagFilter)

  const totalCount = await prisma.recipe.count({
    where: {
      organizationId,
    },
  })

  const filteredCount = await prisma.recipe.count({
    where: {
      organizationId,
      ...filter,
    },
  })

  return { totalCount, filteredCount }
}

export async function getRecipesByOrganizationId(
  organizationId: Organization['id'],
  tagFilter: string[],
  page?: number
) {
  const filter = getFilters(tagFilter)
  const take = 2
  const skip = page ? take * (page - 1) : undefined

  return prisma.recipe.findMany({
    where: {
      organizationId,
      ...filter,
    },
    take: take,
    skip: skip,
    include: { tag: true },
  })
}
