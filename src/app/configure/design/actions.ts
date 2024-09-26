"use server";

import { db } from "@/db";
import { CardColor, CardFinish } from "@prisma/client";

export type SaveConfigArgs = {
  color: CardColor;
  finish: CardFinish;
  configId: string;
};

export async function saveConfig({ color, finish, configId }: SaveConfigArgs) {
  await db.configuration.update({
    where: { id: configId },
    data: { color, finish },
  });
}
