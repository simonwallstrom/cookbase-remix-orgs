import type { Organization, Prisma } from '@prisma/client'
import { prisma } from '~/utils/prisma.server'

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
  let filter: Prisma.RecipeWhereInput = {}

  if (tagFilter.length) {
    filter = {
      tag: {
        some: {
          title: {
            in: tagFilter,
          },
        },
      },
    }
  }

  return prisma.recipe.findMany({
    where: {
      organizationId,
      ...filter,
    },
    include: { tag: true },
  })
}

// export async function getRecipesByOrganizationId(
//   organizationId: Organization['id'],
//   filters: string[] | undefined
// ) {
//   let filter = undefined
//   if (filters && filters.length) {
//     filter = {
//       tag: {
//         some: {
//           title: {
//             in: filters,
//           },
//         },
//       },
//     }
//   }
//   return prisma.recipe.findMany({
//     where: {
//       organizationId,
//       ...filter,
//     },
//     include: { tag: true },
//   })
// }
