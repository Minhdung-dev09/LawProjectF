import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaGooglePlay,
  FaAppStore,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description - Always visible */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="SushiLaw Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-text-red">SushiLaw</span>
            </div>
            <p className="text-white text-sm">
              Đồng hành cùng bạn trên con đường pháp lý, mang đến giải pháp tư
              vấn pháp luật toàn diện và chuyên nghiệp.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-500 transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-500 transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-500 transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-500 transition-colors"
              >
                <SiZalo className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4 text-text-red">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Dịch vụ
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4 text-text-red">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/corporate"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Tư vấn doanh nghiệp
                </Link>
              </li>
              <li>
                <Link
                  to="/services/litigation"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Tranh tụng
                </Link>
              </li>
              <li>
                <Link
                  to="/services/real-estate"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Bất động sản
                </Link>
              </li>
              <li>
                <Link
                  to="/services/intellectual-property"
                  className="text-white hover:text-accent-500 transition-colors"
                >
                  Sở hữu trí tuệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Hidden on mobile */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4 text-text-red">
              Liên hệ
            </h3>
            <ul className="space-y-2">
              <li className="text-white">
                <strong>Địa chỉ:</strong> Cầu Giấy - Hà Nội 
              </li>
              <li className="text-white">
                <strong>Điện thoại:</strong> 08682986620868298662
              </li>
              <li className="text-white">
                <strong>Email:</strong> cv.minhdung09@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
