import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const uploadUrl = `${backendUrl}/api/media/upload`;

    const contentType = request.headers.get("content-type") || "";
    const cookie = request.headers.get("cookie") || "";
    const authHeader = request.headers.get("authorization") || "";

    const headers: Record<string, string> = {
      "content-type": contentType,
      "cookie": cookie,
    };
    if (authHeader) {
      headers["authorization"] = authHeader;
    }

    // Gửi request upload trực tiếp từ NextJS Server sang NestJS Backend
    // Tránh được giới hạn hoặc lỗi ngắt kết nối của dev server proxy mặc định
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers,
      body: request.body,
      duplex: "half",
    } as any);

    if (!response.ok) {
      try {
        const errResult = await response.json();
        return NextResponse.json(errResult, { status: response.status });
      } catch {
        const errText = await response.text();
        return new NextResponse(errText, { status: response.status });
      }
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Error proxying upload request:", error);
    return NextResponse.json(
      { message: "Lỗi proxying upload qua NextJS API", error: error.message },
      { status: 500 }
    );
  }
}
