import { getLinkPreview } from "link-preview-js";

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl.searchParams.get("url") as string;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "A valid URL is required" },
        { status: 400 }
      );
    }

    const preview = await getLinkPreview(url);
    return NextResponse.json(preview, { status: 200 });
  } catch (error: unknown) {
    let message = "Unknown error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json(
      { error: `Failed to fetch metadata: ${message}` },
      { status: 500 }
    );
  }
}
