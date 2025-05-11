import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../contexts/CartContext";
import { motion } from "framer-motion";
import { FaLock, FaCreditCard, FaUser, FaMapMarkerAlt } from "react-icons/fa";

const paymentMethods = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng",
    icon: FaCreditCard,
    description: "Kiểm tra hàng và thanh toán trực tiếp khi nhận hàng",
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order object
      const order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        total: getTotal(),
        customerInfo: formData,
        status: "completed",
        date: new Date().toISOString(),
      };

      // Here you would typically save the order to your backend
      console.log("Order created:", order);

      // Clear cart and redirect to success page
      clearCart();
      navigate("/checkout/success", { state: { order } });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Thanh toán thất bại. Vui lòng thử lại.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-primary-800 mb-4">
          Giỏ hàng trống
        </h2>
        <p className="text-gray-600 mb-4">
          Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Thanh toán - Law Firm</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Thông tin đơn hàng
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h3 className="text-gray-900 font-medium">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-900 font-medium">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="text-gray-900">
                    {getTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="text-gray-900">Miễn phí</span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-gray-900">Tổng cộng:</span>
                  <span className="text-primary-600">
                    {getTotal().toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Thông tin thanh toán
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thành phố
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Phương thức thanh toán
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaCreditCard className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-medium text-gray-900">
                        Thanh toán khi nhận hàng
                      </h4>
                      <p className="text-sm text-gray-500">
                        Kiểm tra hàng và thanh toán trực tiếp khi nhận hàng
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg text-white font-medium transition-colors flex items-center justify-center ${
                  isProcessing
                    ? "bg-primary-400 cursor-not-allowed"
                    : "bg-primary-600 hover:bg-primary-700"
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Thanh toán
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Security Notice */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <FaLock className="text-primary-600 text-xl mr-2" />
                <h3 className="text-lg font-medium text-gray-900">
                  Thanh toán an toàn
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                Thông tin thanh toán của bạn được bảo vệ an toàn. Chúng tôi sử
                dụng mã hóa SSL để đảm bảo thông tin của bạn luôn được bảo mật.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Thanh toán an toàn với SSL
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Bảo mật thông tin cá nhân
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Hỗ trợ 24/7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
