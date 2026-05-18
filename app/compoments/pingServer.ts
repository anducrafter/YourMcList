import { status, statusBedrock } from "minecraft-server-util";

export async function pingServer(host: string, port?: number, type?: string) {
  try {

    if (type === "bedrock") {
      return await statusBedrock(host, port ?? 19132, { timeout: 5000 });
    } else {
      return await status(host, port ?? 25565, { timeout: 5000 });
    }
  } catch (err: any) {
    return null;
  }
}