export function AdminDashboardTables({ requestsList = [] }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-base font-semibold text-slate-800 flex items-center gap-2">
            Yêu cầu tạo thiệp
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Danh sách khách hàng đăng ký tư vấn và tạo thiệp cưới
          </p>
        </div>
        {requestsList && requestsList.length > 0 && (
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200/60">
            {requestsList.length} yêu cầu
          </span>
        )}
      </div>

      <div className="overflow-x-auto flex-1 max-h-[365px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-white">
              <th className="pb-3 pt-1 pl-2 bg-white w-10">#</th>
              <th className="pb-3 pt-1 bg-white">Khách hàng</th>
              <th className="pb-3 pt-1 bg-white">Liên hệ</th>
              <th className="pb-3 pt-1 bg-white">Ghi chú</th>
              <th className="pb-3 pt-1 text-right bg-white">Ngày gửi</th>
              <th className="pb-3 pt-1 text-center pr-2 bg-white">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs">
            {requestsList && requestsList.length > 0 ? (
              requestsList.map((req: any, i: number) => {
                const customerName = req.name || req.fullName || "Khách hàng";
                const contact = req.phone || req.phoneNumber || req.email || "-";
                const templateInfo = req.templateName || req.notes || "Tư vấn làm thiệp";
                const createdDate = req.createdAt
                  ? new Date(req.createdAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                    })
                  : "-";

                return (
                  <tr
                    key={req._id || req.id || i}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3 pl-2 font-bold text-slate-400">
                      {i + 1}
                    </td>
                    <td className="py-3 font-semibold text-slate-800">
                      {customerName}
                    </td>
                    <td className="py-3 text-slate-600 font-medium font-mono text-[11px]">
                      {contact}
                    </td>
                    <td className="py-3 text-slate-600 max-w-[140px] truncate">
                      {templateInfo}
                    </td>
                    <td className="py-3 text-right text-slate-500 font-medium">
                      {createdDate}
                    </td>
                    <td className="py-3 text-center pr-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          req.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : req.status === "contacted"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : req.status === "cancelled"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {req.status === "completed"
                          ? "Hoàn thành"
                          : req.status === "contacted"
                            ? "Đã liên hệ"
                            : req.status === "cancelled"
                              ? "Đã hủy"
                              : "Mới"}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-slate-400 text-xs"
                >
                  Chưa có yêu cầu tạo thiệp nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
