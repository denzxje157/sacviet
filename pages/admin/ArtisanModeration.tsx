import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { artisanPortalService, ArtisanProfile } from '../../services/artisanPortalService';

const ArtisanModeration: React.FC = () => {
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal xem ảnh minh chứng phóng to
  const [previewProof, setPreviewProof] = useState<{ url: string; title: string; desc?: string } | null>(null);

  // Modal từ chối
  const [rejectModalArtisan, setRejectModalArtisan] = useState<ArtisanProfile | null>(null);
  const [rejectReason, setRejectReason] = useState('Hình ảnh/video minh chứng chưa rõ không gian làm nghề thực tế.');

  useEffect(() => {
    fetchArtisans();
  }, []);

  const fetchArtisans = async () => {
    setIsLoading(true);
    try {
      const data = await artisanPortalService.getAllArtisans();
      setArtisans(data || []);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  const handleApprove = async (id: string, name: string) => {
    if (!window.confirm(`Xác nhận phê duyệt và cấp Tích Vàng Di Sản cho nghệ nhân "${name}"?`)) return;
    try {
      await artisanPortalService.approveArtisan(id);
      await fetchArtisans();
      alert(`🎉 Đã phê duyệt thành công gian hàng cho nghệ nhân ${name}!`);
    } catch (e) {
      alert('Có lỗi xảy ra khi phê duyệt');
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectModalArtisan) return;
    try {
      await artisanPortalService.rejectArtisan(rejectModalArtisan.id, rejectReason);
      setRejectModalArtisan(null);
      await fetchArtisans();
      alert(`Đã từ chối hồ sơ của ${rejectModalArtisan.name}`);
    } catch (e) {
      alert('Có lỗi xảy ra khi từ chối');
    }
  };

  const filtered = filterStatus === 'all' 
    ? artisans 
    : artisans.filter(a => a.status === filterStatus);

  const pendingCount = artisans.filter(a => a.status === 'pending').length;
  const approvedCount = artisans.filter(a => a.status === 'approved').length;

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-black uppercase tracking-wider mb-2 border border-gold/20">
              <span className="material-symbols-outlined text-sm">verified</span>
              Kiểm Định Di Sản
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-text-main uppercase tracking-tight">
              Duyệt Hồ Sơ Nghệ Nhân
            </h1>
            <p className="text-text-soft text-sm mt-1">
              Thẩm định minh chứng làm nghề thực tế để cấp Tích Vàng Di Sản và kích hoạt gian hàng bán sản phẩm.
            </p>
          </div>

          {/* Bộ lọc */}
          <div className="flex gap-2 bg-white p-1 rounded-xl border border-gold/10 shadow-sm overflow-x-auto w-full md:w-auto">
            {[
              { id: 'all', label: `Tất cả (${artisans.length})` },
              { id: 'pending', label: `Chờ duyệt (${pendingCount})` },
              { id: 'approved', label: `Đã cấp Tích Vàng (${approvedCount})` },
              { id: 'rejected', label: 'Bị từ chối' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase whitespace-nowrap transition-all ${
                  filterStatus === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-soft hover:bg-gold/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Thẻ thống kê */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gold/10 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-text-soft uppercase tracking-wider">Hồ sơ chờ duyệt</div>
              <div className="text-2xl font-black text-amber-600 mt-1">{pendingCount} hồ sơ</div>
            </div>
            <span className="size-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center material-symbols-outlined text-2xl">
              hourglass_top
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gold/10 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-text-soft uppercase tracking-wider">Đã cấp Tích Vàng</div>
              <div className="text-2xl font-black text-green-700 mt-1">{approvedCount} nghệ nhân</div>
            </div>
            <span className="size-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center material-symbols-outlined text-2xl">
              verified
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gold/10 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-[10px] font-black text-text-soft uppercase tracking-wider">Tổng số nghệ nhân</div>
              <div className="text-2xl font-black text-text-main mt-1">{artisans.length} hồ sơ</div>
            </div>
            <span className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center material-symbols-outlined text-2xl">
              groups
            </span>
          </div>
        </div>

        {/* Danh sách hồ sơ */}
        <div className="bg-white rounded-2xl border border-gold/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[750px]">
              <thead className="bg-[#FAF7F0] text-text-soft text-xs uppercase font-black tracking-wider">
                <tr>
                  <th className="p-4">Minh chứng thực tế</th>
                  <th className="p-4">Nghệ nhân</th>
                  <th className="p-4">Bản làng & Dân tộc</th>
                  <th className="p-4">Số điện thoại</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-center">Thao tác thẩm định</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold/10 text-sm">
                {isLoading ? (
                  <tr><td colSpan={6} className="p-8 text-center text-text-soft font-bold">Đang tải hồ sơ...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-text-soft">
                      <span className="material-symbols-outlined text-4xl text-gold/30 mb-2 block">inventory_2</span>
                      <p className="font-bold">Không có hồ sơ nào trong mục này.</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(artisan => (
                    <tr key={artisan.id} className="hover:bg-background-light/50 transition-colors">
                      {/* Minh chứng */}
                      <td className="p-4">
                        <div 
                          onClick={() => setPreviewProof({ url: artisan.proofUrl, title: `Minh chứng: ${artisan.name}`, desc: artisan.proofDescription })}
                          className="relative size-16 rounded-xl overflow-hidden border-2 border-gold/30 cursor-pointer group shadow-sm shrink-0"
                          title="Bấm để xem ảnh phóng to"
                        >
                          <img src={artisan.proofUrl} alt={artisan.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <span className="material-symbols-outlined text-lg">zoom_in</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-text-soft mt-1 block truncate max-w-[120px]">
                          {artisan.proofType === 'workshop' ? '📸 Ảnh xưởng' : artisan.proofType === 'certificate' ? '📜 Bằng khen' : '🪪 CCCD làng nghề'}
                        </span>
                      </td>

                      {/* Tên & Đại diện */}
                      <td className="p-4">
                        <div className="font-bold text-text-main text-base">{artisan.name}</div>
                        {artisan.representative ? (
                          <div className="text-xs text-text-soft flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-xs text-primary">diversity_1</span>
                            Đại diện: <span className="font-bold text-primary">{artisan.representative}</span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-text-soft italic">Tự quản lý</div>
                        )}
                      </td>

                      {/* Làng nghề & Dân tộc */}
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/20 text-gold-dark text-[10px] font-black uppercase tracking-wider inline-block mb-1">
                          {artisan.ethnic}
                        </span>
                        <div className="text-xs text-text-soft">{artisan.village}</div>
                      </td>

                      {/* Số điện thoại */}
                      <td className="p-4 font-mono font-bold text-xs text-text-main">
                        {artisan.phone}
                      </td>

                      {/* Trạng thái */}
                      <td className="p-4">
                        {artisan.status === 'approved' ? (
                          <span className="px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-black uppercase rounded-full inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">verified</span>
                            Đã Cấp Tích Vàng
                          </span>
                        ) : artisan.status === 'pending' ? (
                          <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase rounded-full inline-flex items-center gap-1 animate-pulse">
                            <span className="material-symbols-outlined text-xs">hourglass_empty</span>
                            Chờ Duyệt
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-black uppercase rounded-full inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">cancel</span>
                            Từ chối
                          </span>
                        )}
                      </td>

                      {/* Thao tác */}
                      <td className="p-4 text-center">
                        {artisan.status === 'pending' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleApprove(artisan.id, artisan.name)}
                              className="px-3 py-1.5 bg-green-700 hover:bg-green-800 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1 transition-transform active:scale-95"
                              title="Duyệt và cấp Tích Vàng"
                            >
                              <span className="material-symbols-outlined text-sm">check</span>
                              Duyệt
                            </button>
                            <button
                              onClick={() => setRejectModalArtisan(artisan)}
                              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1 transition-transform active:scale-95"
                              title="Từ chối hồ sơ"
                            >
                              <span className="material-symbols-outlined text-sm">close</span>
                              Từ chối
                            </button>
                          </div>
                        ) : artisan.status === 'approved' ? (
                          <span className="text-xs text-green-700 font-bold flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            Đang hoạt động
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApprove(artisan.id, artisan.name)}
                            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold"
                          >
                            Xét duyệt lại
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL XEM ẢNH MINH CHỨNG PHÓNG TO */}
      {previewProof && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setPreviewProof(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden p-4 border-2 border-gold shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-gold/10">
              <h3 className="font-black text-sm uppercase text-text-main">{previewProof.title}</h3>
              <button onClick={() => setPreviewProof(null)} className="size-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-600">
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
            <div className="py-3">
              <img src={previewProof.url} alt="Proof" className="w-full max-h-[400px] object-contain rounded-xl bg-stone-100" />
              {previewProof.desc && (
                <p className="text-xs text-text-soft italic mt-2 bg-[#FAF7F0] p-2.5 rounded-lg border border-gold/10">
                  {previewProof.desc}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL NHẬP LÝ DO TỪ CHỐI */}
      {rejectModalArtisan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border-2 border-red-300 shadow-2xl space-y-4">
            <h3 className="font-black text-base uppercase text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              Từ chối hồ sơ: {rejectModalArtisan.name}
            </h3>
            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-soft uppercase mb-1">
                  Lý do từ chối (để nghệ nhân/con cháu bổ sung lại):
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectReason}
                  onChange={e => setRejectReason(e.target.value)}
                  className="w-full p-3 border border-gold/20 rounded-xl text-xs outline-none focus:border-red-500 resize-none bg-[#FAF7F0]"
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalArtisan(null)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-bold text-stone-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-black uppercase"
                >
                  Xác nhận Từ Chối
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ArtisanModeration;
