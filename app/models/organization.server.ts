import type { User } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export async function getOrganizationMembersById(id: User["organizationId"]) {
  return await prisma.user.findMany({
    where: { organizationId: id },
    select: {
      email: true,
    },
  });
}
