import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">SushiLaw</h3>
            <p className="text-primary-200 mb-4 relative">
              "Công lý không chỉ là lý thuyết, mà là hành động - Chúng tôi biến
              lý thuyết thành thực tế"
              <span className="text-red-500 text-sm ml-2">Mrs. LTT-Ngan</span>
            </p>
            <p className="text-primary-200">
              Địa chỉ: Hà Nội, Việt Nam
              <br />
              Điện thoại: 0392085583
              <br />
              Email: doanminhdung662@gmail.com
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Cửa hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/consultation"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Tư vấn
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-200">Tư vấn pháp lý</span>
              </li>
              <li>
                <span className="text-primary-200">Đại diện pháp lý</span>
              </li>
              <li>
                <span className="text-primary-200">Soạn thảo hợp đồng</span>
              </li>
              <li>
                <span className="text-primary-200">Tư vấn doanh nghiệp</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-heading">Liên hệ</h3>
            <p className="text-primary-200 mb-4">
              Luật sư Ngân - Cử nhân Luật Đại học Quốc gia Hà Nội
            </p>
            <div className="space-y-2">
              <p className="text-primary-200">
                <strong>Địa chỉ:</strong> Hà Nội, Việt Nam
              </p>
              <p className="text-primary-200">
                <strong>Điện thoại:</strong> 0392085583
              </p>
              <p className="text-primary-200">
                <strong>Email:</strong> doanminhdung662@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center">
          <p className="text-primary-200">
            © {new Date().getFullYear()} SushiLaw. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
