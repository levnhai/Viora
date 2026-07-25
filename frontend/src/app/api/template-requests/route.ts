import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface TemplateRequest {
  id: string;
  name: string;
  phone: string;
  notes?: string;
  templateCode?: string;
  templateName?: string;
  status: "new" | "contacted" | "completed" | "cancelled";
  createdAt: string;
}

// Dữ liệu mẫu dự phòng khi chưa khởi động NestJS backend
let fallbackRequests: TemplateRequest[] = [
  {
    id: "req_1",
    name: "Nguyễn Văn Nam",
    phone: "0912345678",
    notes: "Cần làm gấp trước ngày 15/10, hỗ trợ thay đổi sơ đồ nhà hàng",
    templateCode: "temp_1",
    templateName: "Song Hỷ - Xanh",
    status: "new",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "req_2",
    name: "Trần Thị Mai",
    phone: "0987654321",
    notes: "Tư vấn gói thiết kế riêng theo màu chủ đạo hồng nhạt",
    templateCode: "minimal-green",
    templateName: "Minimalism - Nâu",
    status: "contacted",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "req_3",
    name: "Lê Hoàng Anh",
    phone: "0909123456",
    notes: "Gửi báo giá thiệp VIP có nhạc nền tự chọn",
    templateCode: "classic-white",
    templateName: "Hoa Mộc - Xanh",
    status: "completed",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/template-requests`, {
      cache: "no-store",
    });
    if (res.ok) {
      const result = await res.json();
      const formatted = (result.data || []).map((item: any) => ({
        ...item,
        id: item._id ? item._id.toString() : item.id,
      }));
      return NextResponse.json({
        success: true,
        data: formatted,
        total: formatted.length,
      });
    }
  } catch (error) {
    // Backend offline fallback
  }

  return NextResponse.json({
    success: true,
    data: fallbackRequests,
    total: fallbackRequests.length,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, notes, templateCode, templateName } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, message: "Họ tên và số điện thoại là bắt buộc" },
        { status: 400 }
      );
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/template-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const result = await res.json();
        return NextResponse.json(result, { status: 201 });
      }
    } catch (backendError) {
      // Fallback
    }

    const newRequest: TemplateRequest = {
      id: `req_${Date.now()}`,
      name,
      phone,
      notes: notes || "",
      templateCode: templateCode || "",
      templateName: templateName || "Chưa chọn mẫu",
      status: "new",
      createdAt: new Date().toISOString(),
    };

    fallbackRequests.unshift(newRequest);

    return NextResponse.json(
      {
        success: true,
        message: "Gửi yêu cầu tạo thiệp thành công!",
        data: newRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Lỗi xử lý yêu cầu" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    try {
      const res = await fetch(`${BACKEND_URL}/api/template-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const result = await res.json();
        return NextResponse.json(result);
      }
    } catch (backendError) {
      // Fallback
    }

    const target = fallbackRequests.find((r) => r.id === id);
    if (target) {
      target.status = status;
    }

    return NextResponse.json({
      success: true,
      message: "Cập nhật trạng thái thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Lỗi cập nhật yêu cầu" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Thiếu ID yêu cầu" },
        { status: 400 }
      );
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/template-requests/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const result = await res.json();
        return NextResponse.json(result);
      }
    } catch (backendError) {
      // Fallback
    }

    fallbackRequests = fallbackRequests.filter((r) => r.id !== id);

    return NextResponse.json({
      success: true,
      message: "Xóa yêu cầu thành công",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Lỗi xóa yêu cầu" },
      { status: 500 }
    );
  }
}
