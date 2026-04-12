import { status, statusBedrock } from "minecraft-server-util";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const host = searchParams.get("host");
  const portParam = searchParams.get("port");
  const type = searchParams.get("type") ?? "java";

  if (!host) {
    return Response.json(
      { error: "Host is required" },
      { status: 400 }
    );
  }

  try {
    let result;

    if (type === "bedrock") {
      const port = portParam ? Number(portParam) : 19132;
      result = await statusBedrock(host, port, { timeout: 5000 });
    } else {
      const port = portParam ? Number(portParam) : 25565;
      result = await status(host, port, { timeout: 5000 });
    }

    return Response.json(
      { success: true, data: result },
      { status: 200 }
    );

  } catch (err: any) {
    return Response.json(
      { success: false, error: err?.message ?? "Unable to ping server" },
      { status: 500 }
    );
  }
}
