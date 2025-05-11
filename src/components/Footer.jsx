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
              <span className="text-2xl font-bold">SushiLaw</span>
            </div>
            <p className="text-primary-200 text-sm">
              Đồng hành cùng bạn trên con đường pháp lý, mang đến giải pháp tư
              vấn pháp luật toàn diện và chuyên nghiệp.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="https://zalo.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 hover:text-white transition-colors"
              >
                <SiZalo className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-col space-y-2">
              <a
                href="#"
                className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors"
              >
                <FaGooglePlay className="w-5 h-5" />
                <span className="text-sm">Tải ứng dụng trên Google Play</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-primary-200 hover:text-white transition-colors"
              >
                <FaAppStore className="w-5 h-5" />
                <span className="text-sm">Tải ứng dụng trên App Store</span>
              </a>
            </div>
          </div>

          {/* Quick Links - Hidden on mobile */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Dịch vụ
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
                  to="/faq"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services - Hidden on mobile */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services/corporate"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Tư vấn doanh nghiệp
                </Link>
              </li>
              <li>
                <Link
                  to="/services/litigation"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Tranh tụng
                </Link>
              </li>
              <li>
                <Link
                  to="/services/real-estate"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Bất động sản
                </Link>
              </li>
              <li>
                <Link
                  to="/services/intellectual-property"
                  className="text-primary-200 hover:text-white transition-colors"
                >
                  Sở hữu trí tuệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact - Hidden on mobile */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="text-primary-200">
                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP. HCM
              </li>
              <li className="text-primary-200">
                <strong>Điện thoại:</strong> (028) 1234 5678
              </li>
              <li className="text-primary-200">
                <strong>Email:</strong> info@sushilaw.vn
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center text-primary-200 text-sm">
          <p>
            &copy; {new Date().getFullYear()} SushiLaw. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
