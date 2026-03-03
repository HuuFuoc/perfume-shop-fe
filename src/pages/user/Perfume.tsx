import { useEffect, useState } from "react";
import { PerfumeService } from "../../services/perfume/perfume.services";
import type { getAllPerfumeRes } from "../../types/perfume/Perfume.res.type";

export default function Perfume() {
  const [perfumes, setPerfumes] = useState<getAllPerfumeRes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PerfumeService.getAllPerfumes({})
      .then((res) => {
        setPerfumes(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-amber-600 font-medium tracking-widest uppercase text-sm">
            Đang tải...
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-stone-800 tracking-widest uppercase mb-2">
          Bộ sưu tập nước hoa
        </h1>
        <p className="text-stone-400 text-sm tracking-widest">
          {perfumes.length} sản phẩm
        </p>
        <div className="mt-4 w-16 h-0.5 bg-amber-400 mx-auto" />
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {perfumes.map((perfume, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-stone-100"
          >
            {/* Image */}
            <div className="relative h-52 bg-gradient-to-br from-amber-50 to-stone-100 overflow-hidden">
              {perfume.uri && perfume.uri !== "string" ? (
                <img
                  src={perfume.uri}
                  alt={perfume.perfumeName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-6xl">🌸</span>
                </div>
              )}
              {/* Badge */}
              <span className="absolute top-3 right-3 bg-amber-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {perfume.concentration}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-stone-800 text-base truncate mb-1">
                {perfume.perfumeName}
              </h3>
              <p className="text-xs text-stone-400 mb-3 line-clamp-2">
                {perfume.description}
              </p>

              {/* Info row */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
                <span>🧴 {perfume.volume}ml</span>
                <span>👤 {perfume.targetAudience}</span>
              </div>

              {/* Price + Button */}
              <div className="flex items-center justify-between">
                <span className="text-amber-600 font-bold text-lg">
                  {perfume.price.toLocaleString("vi-VN")}₫
                </span>
                <button className="bg-stone-800 hover:bg-amber-500 text-white text-xs font-medium px-3 py-2 rounded-xl transition-colors duration-200">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
