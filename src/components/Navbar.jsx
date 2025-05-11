import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSignOutAlt,
  FaBalanceScale,
  FaShoppingCart,
  FaClipboardList,
} from "react-icons/fa";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Tin tức", href: "/news" },
  { name: "Cửa hàng", href: "/shop" },
  { name: "Tư vấn", href: "/consultation" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  // Mock user state
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "example@email.com",
  });
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaBalanceScale className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-primary-900">
                SushiLaw
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.href
                    ? "text-primary-600 bg-primary-50"
                    : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-primary-700 hover:text-primary-900 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <FaUser className="h-4 w-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium">{user?.name}</span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        >
                          <FaUser className="mr-2 h-4 w-4" />
                          Tài khoản của tôi
                        </Link>
                        <Link
                          to="/cart"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        >
                          <FaShoppingCart className="mr-2 h-4 w-4" />
                          Giỏ hàng
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        >
                          <FaClipboardList className="mr-2 h-4 w-4" />
                          Đơn hàng của tôi
                        </Link>
                        <Link
                          to="/my-consultations"
                          className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        >
                          <FaBalanceScale className="mr-2 h-4 w-4" />
                          Lịch sử tư vấn
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-primary-50"
                        >
                          <FaSignOutAlt className="mr-2 h-4 w-4" />
                          Đăng xuất
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
