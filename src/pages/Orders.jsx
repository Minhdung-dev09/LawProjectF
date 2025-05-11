import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { FaEye, FaFilter } from "react-icons/fa";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusText = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipping: "Đang giao hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchOrders = async () => {
      try {
        // Simulated API response
        const response = [
          {
            id: "ORD-2024-001",
            name: "Đơn hàng tư vấn luật doanh nghiệp",
            price: "2,500,000",
            createdAt: "2024-03-20T10:00:00",
            deliveryAddress: "123 Đường ABC, Quận XYZ, TP. HCM",
            status: "pending",
          },
          {
            id: "ORD-2024-002",
            name: "Đơn hàng tư vấn luật dân sự",
            price: "1,800,000",
            createdAt: "2024-03-19T15:30:00",
            deliveryAddress: "456 Đường DEF, Quận UVW, TP. HCM",
            status: "processing",
          },
        ];
        setOrders(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) => statusFilter === "all" || order.status === statusFilter
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Đang tải...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Đơn hàng của tôi | SushiLaw</title>
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
              className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipping">Đang giao hàng</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <li key={order.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {order.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ID: {order.id}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-gray-900">
                          {order.price} VNĐ
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
                          Địa điểm giao hàng: {order.deliveryAddress}
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
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {selectedOrder.name}
                  </h2>
                  <p className="text-gray-500 mt-1">ID: {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaEye className="text-xl" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Giá đơn hàng
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.price} VNĐ
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
                        Địa điểm giao hàng
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.deliveryAddress}
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
