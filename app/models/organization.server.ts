import type { Organization, User } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export async function getOrganizationById(id: Organization["id"]) {
  return prisma.organization.findUnique({
    where: { id },
    include: {
      invite: true,
    },
  });
}

export async function getOrganizationMembersById(id: User["organizationId"]) {
  return await prisma.user.findMany({
    where: { organizationId: id },
    select: {
      email: true,
    },
  });
}
