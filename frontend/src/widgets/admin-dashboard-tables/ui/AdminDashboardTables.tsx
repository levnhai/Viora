export function AdminDashboardTables({ tables, requestsList }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top Viewed Weddings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
        <h3 className="text-base font-semibold text-slate-800 mb-4">
          Top thiệp cưới nhiều lượt xem
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="pb-3 font-medium w-8">#</th>
                <th className="pb-3 font-medium">Thiệp cưới</th>
                <th className="pb-3 font-medium text-right">Lượt xem</th>
                <th className="pb-3 font-medium text-right">Khách mời</th>
                <th className="pb-3 font-medium text-right">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tables.topWeddings.length > 0 ? (
                tables.topWeddings.map((w: any, i: number) => (
                  <tr
                    key={w.id}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3 text-slate-500 text-xs">{i + 1}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-indigo-100 shrink-0 overflow-hidden">
                          <img
                            src={`https://i.pravatar.cc/150?img=${i + 20}`}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 text-xs">
                            {w.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{w.sub}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right font-medium text-slate-700 text-xs">
                      {w.views}
                    </td>
                    <td className="py-3 text-right text-slate-600 text-xs">
                      {w.guests}
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs">
                      {w.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-400 text-sm"
                  >
                    Chưa có thiệp cưới nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Invitations Requests */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex flex-col">
        <h3 className="text-base font-semibold text-slate-800 mb-4">
          Thiệp cưới mới tạo (Yêu cầu)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500 uppercase tracking-wider">
                <th className="pb-3 font-medium w-8">#</th>
                <th className="pb-3 font-medium">Thiệp cưới</th>
                <th className="pb-3 font-medium">Chủ sở hữu</th>
                <th className="pb-3 font-medium text-right">Ngày tạo</th>
                <th className="pb-3 font-medium text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requestsList.length > 0 ? (
                requestsList.slice(0, 5).map((req: any, i: number) => (
                  <tr
                    key={req._id || i}
                    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3 text-slate-500 text-xs">{i + 1}</td>
                    <td className="py-3 text-xs font-medium text-slate-800">
                      Thiệp cưới{" "}
                      {req.fullName?.split(" ")[
                        req.fullName.split(" ").length - 1
                      ] || "Khách"}
                    </td>
                    <td className="py-3 text-xs text-slate-500">
                      {req.email || req.phoneNumber}
                    </td>
                    <td className="py-3 text-right text-slate-500 text-xs">
                      {new Date(req.createdAt).toLocaleDateString("vi-VN")}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                          req.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : req.status === "contacted"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {req.status === "completed"
                          ? "Đã xuất bản"
                          : req.status === "contacted"
                            ? "Bản nháp"
                            : "Chờ duyệt"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 text-center text-slate-400 text-sm"
                  >
                    Chưa có yêu cầu mới
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
