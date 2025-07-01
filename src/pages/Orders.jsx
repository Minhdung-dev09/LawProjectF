import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { FaEye, FaFilter, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL, API_ENDPOINTS } from "../services/apiConfig";

const API_URL = `${API_BASE_URL}${API_ENDPOINTS.ORDERS}`;

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusText = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  completed: "Đã hoàn thành",
  cancelled: "Đã hủy",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để xem đơn hàng");
      }

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(
        error.response?.data?.message || "Không thể tải danh sách đơn hàng"
      );
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) => statusFilter === "all" || order.status === statusFilter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary-600 mr-2" />
        <span className="text-lg text-gray-600">Đang tải đơn hàng...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={fetchOrders}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Đơn hàng của tôi | Law Firm</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="completed">Đã hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {statusFilter === "all"
                ? "Bạn chưa có đơn hàng nào"
                : `Không có đơn hàng nào ở trạng thái ${statusText[statusFilter]}`}
            </p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <li key={order._id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            Mã đơn hàng: {order._id}
                          </p>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {order.fullName}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-medium text-primary-600">
                            {(
                              order.totalAmount ||
                              order.total ||
                              order.subtotal ||
                              0
                            ).toLocaleString("vi-VN")}
                            đ
                          </span>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <FaEye className="text-lg" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            Thời gian đặt hàng:{" "}
                            {format(
                              new Date(order.createdAt),
                              "HH:mm - dd/MM/yyyy",
                              {
                                locale: vi,
                              }
                            )}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Địa chỉ: {order.address}, {order.city}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[order.status]
                            }`}
                          >
                            {statusText[order.status]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Chi tiết đơn hàng
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Mã đơn hàng: {selectedOrder._id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Tổng tiền
                      </p>
                      <p className="mt-1 text-gray-900">
                        {(
                          selectedOrder.totalAmount ||
                          selectedOrder.total ||
                          selectedOrder.subtotal ||
                          0
                        ).toLocaleString("vi-VN")}
                        đ
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Trạng thái
                      </p>
                      <span
                        className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[selectedOrder.status]
                        }`}
                      >
                        {statusText[selectedOrder.status]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Thời gian đặt hàng
                      </p>
                      <p className="mt-1 text-gray-900">
                        {format(
                          new Date(selectedOrder.createdAt),
                          "HH:mm - dd/MM/yyyy",
                          {
                            locale: vi,
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Phương thức thanh toán
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.paymentMethod}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Sản phẩm
                  </h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity} x{" "}
                            {item.price.toLocaleString("vi-VN")}đ
                          </p>
                        </div>
                        <p className="font-medium">
                          {(item.quantity * item.price).toLocaleString("vi-VN")}
                          đ
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Thông tin giao hàng
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Người nhận
                      </p>
                      <p className="mt-1">{selectedOrder.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Số điện thoại
                      </p>
                      <p className="mt-1">{selectedOrder.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1">{selectedOrder.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Địa chỉ
                      </p>
                      <p className="mt-1">
                        {selectedOrder.address}, {selectedOrder.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
