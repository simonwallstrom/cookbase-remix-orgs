import type { Invite } from "@prisma/client";
import { prisma } from "~/utils/prisma.server";

export async function getInviteById(id: Invite["id"]) {
  return prisma.invite.findUnique({
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
  });
}
