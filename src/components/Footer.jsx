import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Công ty Luật ABC</h3>
            <p className="text-primary-200">
              Chuyên cung cấp dịch vụ pháp lý chuyên nghiệp, uy tín hàng đầu
              Việt Nam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
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
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-primary-200">
              <li>123 Đường ABC, Quận XYZ</li>
              <li>TP. Hồ Chí Minh, Việt Nam</li>
              <li>Email: info@abclaw.com</li>
              <li>Phone: (84) 123 456 789</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-primary-200 mb-4">
              Nhận thông tin mới nhất về tin tức và dịch vụ của chúng tôi.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="w-full px-4 py-2 rounded bg-primary-700 text-white placeholder-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-500 transition-colors"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-300">
          <p>
            &copy; {new Date().getFullYear()} Công ty Luật ABC. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
