import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaCheckCircle, FaDownload, FaEnvelope } from "react-icons/fa";

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/shop");
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Thanh toán thành công - Law Firm</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-8 text-center"
        >
          <div className="flex justify-center mb-6">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thanh toán thành công!
          </h1>
          <p className="text-gray-600 mb-8">
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn ngay lập
            tức.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-sm text-gray-500">Mã đơn hàng</p>
                <p className="font-medium text-gray-900">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                <p className="font-medium text-gray-900">
                  {new Date(order.date).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng tiền</p>
                <p className="font-medium text-gray-900">
                  {order.total.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Trạng thái</p>
                <p className="font-medium text-green-600">
                  {order.status === 'pending' ? 'Chờ xử lý' :
                   order.status === 'processing' ? 'Đang xử lý' :
                   order.status === 'completed' ? 'Hoàn thành' :
                   order.status === 'cancelled' ? 'Đã hủy' : 'Đang xử lý'}
                </p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h3>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin giao hàng</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Họ và tên</p>
                  <p className="font-medium">{order.customerInfo.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{order.customerInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Số điện thoại</p>
                  <p className="font-medium">{order.customerInfo.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Địa chỉ</p>
                  <p className="font-medium">
                    {order.customerInfo.address}, {order.customerInfo.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaDownload className="mr-2" />
              Tải hóa đơn
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Xem đơn hàng
            </button>
          </div>

          <div className="mt-8 pt-8 border-t">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Thông tin đơn hàng đã được gửi đến email của bạn
            </h2>
            <p className="text-gray-600 mb-4">
              Chúng tôi đã gửi thông tin chi tiết về đơn hàng đến địa chỉ email:{" "}
              <span className="font-medium text-gray-900">
                {order.customerInfo.email}
              </span>
            </p>
            <div className="flex items-center justify-center text-primary-600">
              <FaEnvelope className="mr-2" />
              Kiểm tra email của bạn
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
