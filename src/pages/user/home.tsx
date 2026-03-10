import Threads from "../../components/Threads";

const collections = [
  {
    name: "Noir Absolu",
    note: "Oud · Hổ phách · Trầm hương",
    desc: "Hương phương Đông sâu lắng, khói nhẹ, toả sáng trong mọi không gian.",
    badge: "Bán chạy",
  },
  {
    name: "Lumière Rose",
    note: "Hoa hồng · Mẫu đơn · Xạ hương",
    desc: "Hương hoa tinh tế với độ toả sáng khó quên.",
    badge: "Mới về",
  },
  {
    name: "Velours Bleu",
    note: "Thanh yên · Iris · Vetiver",
    desc: "Mát lạnh, thanh lịch và tinh tế.",
    badge: "Giới hạn",
  },
];

const features = [
  {
    icon: "✦",
    title: "Nguyên liệu quý hiếm",
    desc: "Nguồn gốc từ những vùng trồng trọt tinh túy nhất — từ hoa hồng Grasse đến oud Oman.",
  },
  {
    icon: "◈",
    title: "Bậc thầy điều chế",
    desc: "Mỗi mùi hương được tạo nên cùng những chuyên gia hàng đầu với nhiều thập kỷ kinh nghiệm.",
  },
  {
    icon: "◉",
    title: "Lưu hương bền lâu",
    desc: "Công thức nồng độ cao, lưu hương đẹp từ sáng đến đêm.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-blush text-brown-dark font-sans overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center">
        {/* ── Threads full-screen ambient background ── */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <Threads
            color={[0.753, 0.471, 0.314]}
            amplitude={0.6}
            distance={0}
            enableMouseInteraction={false}
          />
        </div>
        {/* Warm pastel gradient wash on top of threads */}
        <div className="absolute inset-0 bg-gradient-to-br from-blush/80 via-blush/60 to-petal/40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 grid lg:grid-cols-2 gap-16 items-center py-28">
          {/* Left — copy */}
          <div className="flex flex-col gap-8">
            {/* Eyebrow with decorative lines */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-rosewood/40" />
              <span className="text-xs tracking-[0.35em] text-rosewood uppercase font-medium">
                Ngôi nhà nước hoa cao cấp
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-light leading-[1.08] tracking-tight text-brown-dark">
              Khoác lên <span className="italic text-rosewood">ký ức.</span>
              <br />
              Để lại <span className="italic text-rosewood">huyền thoại.</span>
            </h1>

            {/* Thin accent rule */}
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 max-w-[3rem] bg-border-soft" />
              <span className="text-[10px] tracking-[0.4em] text-brown-muted uppercase">
                Thành lập 2010 · Paris
              </span>
              <div className="h-px flex-1 max-w-[3rem] bg-border-soft" />
            </div>

            <p className="text-brown-mid text-lg max-w-[26rem] leading-relaxed">
              Khám phá bộ sưu tập nước hoa thủ công quý hiếm — mỗi chai là một hành trình qua những nguyên liệu đặc biệt nhất thế giới.
            </p>

            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="/perfumes"
                className="px-8 py-3.5 bg-rosewood text-white text-sm font-semibold tracking-widest uppercase rounded-full shadow-card hover:bg-rosewood-deep transition-all duration-300"
              >
                Khám phá bộ sưu tập
              </a>
              <a
                href="/about"
                className="px-8 py-3.5 border border-border-soft text-brown-mid text-sm font-semibold tracking-widest uppercase rounded-full hover:border-rosewood hover:text-rosewood hover:bg-petal/50 transition-all duration-300"
              >
                Câu chuyện thương hiệu
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-10 pt-6 border-t border-border-soft">
              {[
                ["120+", "Mùi hương"],
                ["18", "Quốc gia"],
                ["50K+", "Khách hàng"],
              ].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-semibold text-rosewood">{val}</p>
                  <p className="text-xs text-brown-muted tracking-widest uppercase mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Fragrance note composition */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-[400px] h-[400px] select-none">
              {/* Ambient glow layers */}
              <div className="absolute inset-0 rounded-full bg-peach/25 blur-3xl" />
              <div className="absolute inset-8 rounded-full bg-petal/30 blur-2xl" />

              {/* Concentric decorative rings */}
              <div className="absolute inset-0 rounded-full border border-border-soft/50" />
              <div className="absolute inset-[3.5rem] rounded-full border border-rosewood/10" />
              <div className="absolute inset-[6.5rem] rounded-full border border-border-soft/40" />

              {/* Tick marks on outer ring */}
              {[0, 60, 120, 180, 240, 300].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-1 h-1 rounded-full bg-rosewood/25"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `rotate(${deg}deg) translateX(196px) translate(-50%, -50%)`,
                  }}
                />
              ))}

              {/* Centre monogram */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                <span className="text-[5.5rem] font-light text-rosewood/15 italic leading-none tracking-widest">
                  P
                </span>
                <div className="flex gap-1.5 items-center">
                  <div className="w-4 h-px bg-rosewood/20" />
                  <span className="text-[8px] tracking-[0.4em] text-brown-muted/50 uppercase">
                    Perfume
                  </span>
                  <div className="w-4 h-px bg-rosewood/20" />
                </div>
              </div>

              {/* ── Orbiting note pills ── */}
              {/* Top centre */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-white/75 backdrop-blur-md border border-border-soft rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Rose
                  </span>
                </div>
              </div>

              {/* Top-right */}
              <div className="absolute top-[13%] right-[4%]">
                <div className="bg-peach/85 backdrop-blur-md border border-peach-deep/40 rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Oud
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2">
                <div className="bg-white/65 backdrop-blur-md border border-border-soft rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Amber
                  </span>
                </div>
              </div>

              {/* Bottom-right */}
              <div className="absolute bottom-[13%] right-[4%]">
                <div className="bg-petal/90 backdrop-blur-md border border-petal-deep/50 rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Musk
                  </span>
                </div>
              </div>

              {/* Bottom centre */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2">
                <div className="bg-white/75 backdrop-blur-md border border-border-soft rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Vetiver
                  </span>
                </div>
              </div>

              {/* Left */}
              <div className="absolute top-1/2 -left-2 -translate-y-1/2">
                <div className="bg-peach/70 backdrop-blur-md border border-peach-deep/30 rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Bergamot
                  </span>
                </div>
              </div>

              {/* Top-left */}
              <div className="absolute top-[13%] left-[4%]">
                <div className="bg-white/60 backdrop-blur-md border border-border-soft rounded-full px-4 py-1.5 shadow-soft">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase font-semibold">
                    Iris
                  </span>
                </div>
              </div>

              {/* Floating micro-dots */}
              <div className="absolute top-[22%] right-[22%] w-1.5 h-1.5 rounded-full bg-rosewood/30" />
              <div className="absolute bottom-[24%] left-[20%] w-1 h-1 rounded-full bg-peach-deep/50" />
              <div className="absolute top-[40%] left-[14%] w-1 h-1 rounded-full bg-rosewood/20" />
              <div className="absolute bottom-[36%] right-[16%] w-2 h-2 rounded-full bg-petal-deep/40" />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brown-muted">
          <span className="text-[10px] tracking-[0.3em] uppercase">Cuộn xuống</span>
          <div className="w-px h-10 bg-gradient-to-b from-brown-muted/50 to-transparent" />
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <div className="border-y border-border-soft py-4 overflow-hidden bg-petal">
        <div className="flex gap-12 animate-marquee whitespace-nowrap select-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-xs tracking-[0.4em] text-brown-muted uppercase"
            >
              Rose · Oud · Bergamot · Amber · Vetiver · Iris · Musk · Peony
              &nbsp;&nbsp;✦
            </span>
          ))}
        </div>
      </div>

      {/* ── Signature Collection ── */}
      <section className="bg-blush py-28 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] text-rosewood uppercase font-medium mb-3">
                Dành riêng cho bạn
              </p>
              <h2 className="text-4xl lg:text-5xl font-light text-brown-dark">
                Bộ sưu tập đặc trưng
              </h2>
            </div>
            <a
              href="/perfumes"
              className="hidden md:flex items-center gap-2 text-sm text-brown-muted hover:text-rosewood transition-colors duration-300 font-medium"
            >
              Xem tất cả <span className="text-base">→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((item) => (
              <article
                key={item.name}
                className="group relative bg-petal border border-border-soft rounded-2xl p-8 shadow-soft hover:shadow-card-hover hover:border-peach-deep transition-all duration-500 cursor-pointer overflow-hidden"
              >
                {/* Soft hover wash */}
                <div className="absolute inset-0 bg-gradient-to-br from-peach/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

                <div className="flex justify-between items-start mb-10">
                  <span className="text-[10px] tracking-[0.3em] text-brown-dark uppercase bg-peach px-3 py-1 rounded-full font-semibold">
                    {item.badge}
                  </span>
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-peach via-petal-deep to-rosewood/30 blur-sm group-hover:from-peach-deep group-hover:to-rosewood/50 transition-all duration-500" />
                </div>

                <h3 className="text-2xl font-light mb-2 text-brown-dark group-hover:text-rosewood transition-colors duration-300">
                  {item.name}
                </h3>
                <p className="text-[11px] tracking-widest text-brown-muted uppercase mb-4">
                  {item.note}
                </p>
                <p className="text-sm text-brown-mid leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-xs text-brown-muted group-hover:text-rosewood transition-colors duration-300 uppercase tracking-widest font-medium">
                  Khám phá <span>→</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="relative bg-petal py-32 px-6 lg:px-16 overflow-hidden">
        {/* Decorative threads accent */}
        <div className="absolute -right-28 top-1/2 -translate-y-1/2 w-[420px] h-[420px] opacity-25 pointer-events-none rounded-full overflow-hidden">
          <Threads
            color={[0.988, 0.722, 0.682]}
            amplitude={0.8}
            distance={0}
            enableMouseInteraction={false}
          />
        </div>
        {/* Subtle left blob */}
        <div className="absolute -left-24 bottom-0 w-72 h-72 rounded-full bg-peach/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-rosewood uppercase font-medium mb-6">
            Thành lập 2010
          </p>
          <h2 className="text-4xl lg:text-5xl font-light leading-tight mb-8 text-brown-dark">
            Nước hoa không chỉ là sản phẩm.
            <br />
            <span className="italic text-rosewood">
              Đó là thơ ca trong từng chai.
            </span>
          </h2>
          <p className="text-brown-mid text-lg leading-relaxed max-w-xl mx-auto">
            Ra đời tại trung tâm Paris, ngôi nhà của chúng tôi đã dành hơn một thập kỷ chuyển tải cảm xúc, ký ức và khát khao thành hương thơm. Mỗi mùi hương bắt đầu từ một câu chuyện — và kết thúc bằng câu chuyện của bạn.
          </p>
          <a
            href="/about"
            className="inline-block mt-10 text-sm tracking-[0.25em] uppercase text-rosewood border-b-2 border-rosewood/30 pb-0.5 hover:border-rosewood transition-colors duration-300 font-medium"
          >
            Đọc câu chuyện của chúng tôi
          </a>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-blush py-28 px-6 lg:px-16 border-t border-border-soft">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-rosewood uppercase text-center font-medium mb-16">
            Vì sao chọn chúng tôi
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4 bg-petal rounded-2xl p-8 border border-border-soft shadow-soft hover:shadow-card hover:border-peach-deep transition-all duration-300"
              >
                <span className="text-rosewood text-2xl">{f.icon}</span>
                <h3 className="text-xl font-medium text-brown-dark">
                  {f.title}
                </h3>
                <p className="text-brown-muted text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="relative bg-peach py-24 px-6 lg:px-16 text-center overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-petal/50 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-blush/60 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <p className="text-xs tracking-[0.4em] uppercase mb-4 text-brown-mid font-medium">
            Phiên bản giới hạn
          </p>
          <h2 className="text-4xl lg:text-5xl font-light mb-6 text-brown-dark">
            Mùi hương đặc trưng đang chờ bạn.
          </h2>
          <p className="text-brown-mid mb-10 max-w-md mx-auto text-sm leading-relaxed">
            Miễn phí giao hàng đơn từ 500.000₫. Tặng kèm mẫu thử cho mỗi đơn hàng.
          </p>
          <a
            href="/perfumes"
            className="inline-block px-10 py-4 bg-brown-dark text-peach text-sm font-semibold tracking-widest uppercase rounded-full shadow-card hover:bg-[#5C3D2E] hover:shadow-card-hover transition-all duration-300"
          >
            Mua ngay
          </a>
        </div>
      </section>
    </div>
  );
}
