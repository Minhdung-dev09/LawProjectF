import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaSignOutAlt,
  FaBalanceScale,
  FaShoppingCart,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../slices/authSlice";

const navigation = [
  { name: "Trang chủ", href: "/" },
  { name: "Tin tức", href: "/news" },
  { name: "Cửa hàng", href: "/shop" },
  { name: "Tư vấn", href: "/consultation" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserOptionsOpen, setIsUserOptionsOpen] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // load auth info khi mount
    const token = localStorage.getItem("authToken");
    if (token) {
      const userString = localStorage.getItem("user");
      if (userString) {
        try {
          dispatch(login(JSON.parse(userString)));
        } catch {
          dispatch(logout());
        }
      }
    } else {
      dispatch(logout());
    }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    dispatch(logout());
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    setIsUserOptionsOpen(false);
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
                  {/* Hiển thị username */}
                  <span className="text-sm font-medium">
                    {user?.username || user?.name}
                  </span>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsUserMenuOpen(false)}
                      ></div>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                      >
                        <div className="py-1">
                          <Link
                            to="/profile"
                            className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FaUser className="mr-2 h-4 w-4" />
                            Tài khoản của tôi
                          </Link>
                          <Link
                            to="/cart"
                            className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FaShoppingCart className="mr-2 h-4 w-4" />
                            Giỏ hàng
                          </Link>
                          <Link
                            to="/orders"
                            className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FaClipboardList className="mr-2 h-4 w-4" />
                            Đơn hàng của tôi
                          </Link>
                          <Link
                            to="/my-consultations"
                            className="flex items-center px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                            onClick={() => setIsUserMenuOpen(false)}
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
                    </>
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

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-700 hover:text-primary-900 hover:bg-primary-50 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === item.href
                      ? "text-primary-600 bg-primary-50"
                      : "text-primary-700 hover:text-primary-900 hover:bg-primary-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {isLoggedIn ? (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button
                    onClick={() => setIsUserOptionsOpen(!isUserOptionsOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50 rounded-md"
                  >
                    <div className="flex items-center space-x-2">
                      <FaUser className="h-5 w-5" />
                      <span>Tài khoản</span>
                    </div>
                    {isUserOptionsOpen ? (
                      <FaChevronUp className="h-4 w-4" />
                    ) : (
                      <FaChevronDown className="h-4 w-4" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isUserOptionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-10 space-y-1">
                          <Link
                            to="/profile"
                            className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Tài khoản của tôi
                          </Link>
                          <Link
                            to="/cart"
                            className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Giỏ hàng
                          </Link>
                          <Link
                            to="/orders"
                            className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Đơn hàng của tôi
                          </Link>
                          <Link
                            to="/my-consultations"
                            className="block px-3 py-2 text-base font-medium text-primary-700 hover:text-primary-900 hover:bg-primary-50 rounded-md"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Lịch sử tư vấn
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-primary-50 rounded-md"
                          >
                            Đăng xuất
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
