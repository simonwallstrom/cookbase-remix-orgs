import type { Organization, Prisma, Recipe } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

function getRecipeFilters(input: string[]) {
  let filter: Prisma.RecipeWhereInput = {}
  if (input.length) {
    filter = {
      tags: {
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
  const filter = getRecipeFilters(tagFilter)

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

export async function getRecipes(
  organizationId: Organization['id'],
  tagFilter: string[],
  page?: number
) {
  const filter = getRecipeFilters(tagFilter)
  const take = 100
  const skip = page ? take * (page - 1) : undefined

  return prisma.recipe.findMany({
    where: {
      organizationId,
      ...filter,
    },
    take: take,
    skip: skip,
    include: { tags: true },
  })
}

export async function getRecipe({
  organizationId,
  id,
}: {
  organizationId: Organization['id']
  id: Recipe['id']
}) {
  return prisma.recipe.findFirst({
    where: { id, organizationId },
    include: { tags: true },
  })
}
