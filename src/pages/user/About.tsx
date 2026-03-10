import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

export default function About() {
  return (
    <div className="min-h-screen bg-blush text-brown-dark">
      <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
        <p className="text-xs tracking-[0.3em] text-rosewood uppercase font-medium mb-4">
          Về chúng tôi
        </p>
        <h1 className="text-4xl lg:text-5xl font-light leading-tight mb-8 text-brown-dark">
          Câu chuyện thương hiệu
        </h1>
        <div className="space-y-6 text-brown-mid leading-relaxed">
          <p>
            Perfume Maison de Luxe ra đời từ niềm đam mê với hương thơm cao cấp và mong muốn mang đến trải nghiệm mua sắm tinh tế cho người Việt. Chúng tôi tin rằng mỗi chai nước hoa không chỉ là mùi hương — đó là ký ức, cá tính và sự chăm chút cho bản thân.
          </p>
          <p>
            Chúng tôi tuyển chọn những mùi hương từ các thương hiệu uy tín, đảm bảo nguồn gốc chính hãng và trải nghiệm mua hàng minh bạch, tận tâm. Từ những bước đầu khám phá đến khi tìm được mùi hương “định mệnh”, chúng tôi đồng hành cùng bạn.
          </p>
          <p>
            Cảm ơn bạn đã tin tưởng và ủng hộ Perfume Maison de Luxe. Mọi góp ý và câu chuyện của bạn luôn là nguồn động lực để chúng tôi không ngừng cải thiện.
          </p>
        </div>
        <div className="mt-12 pt-10 border-t border-border-soft">
          <Link
            to={ROUTER_URL.PUBLIC.PRODUCTS}
            className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-rosewood hover:text-rosewood-deep transition-colors"
          >
            Khám phá bộ sưu tập nước hoa
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
