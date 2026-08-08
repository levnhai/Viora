import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const audioDir = path.join(process.cwd(), "public", "audio");
    if (!fs.existsSync(audioDir)) {
      return NextResponse.json({ success: true, data: [] });
    }

    const files = fs.readdirSync(audioDir);
    const audioFiles = files
      .filter((file) => /\.(mp3|wav|ogg|m4a|aac)$/i.test(file))
      .map((file) => {
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        return {
          name: nameWithoutExt,
          url: `/audio/${file}`,
        };
      });

    return NextResponse.json({ success: true, data: audioFiles });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
