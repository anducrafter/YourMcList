"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/actions/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateServer(serverId: string, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Unauthorized");


  const rawConfig = formData.get("config") as string;
  const formattedConfig = rawConfig
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0)
    .join(",");

  await prisma.mcServer.update({
    where: { 
      serverid: serverId,
      userId: session.user.id // Only allow owner to update
    },
    data: {
      servername: formData.get("servername") as string,
      ip: formData.get("ip") as string,
      description: formData.get("description") as string,
      servercountry: formData.get("servercountry") as string,
      versionMajor: parseInt(formData.get("versionMajor") as string) || 1,
      versionMinor: parseInt(formData.get("versionMinor") as string) || 20,
      bedrock: formData.get("bedrock") === "on",
      config: formattedConfig,
      website: formData.get("website") as string || null,
      discord: formData.get("discord") as string || null,
      instagram: formData.get("instagram") as string || null,
      youtube: formData.get("youtube") as string || null,
      ticktock: formData.get("ticktock") as string || null,
    },
  });

  revalidatePath(`/serverliste/server/${serverId}`);
  revalidatePath("/profile");
  redirect("/profile");
}