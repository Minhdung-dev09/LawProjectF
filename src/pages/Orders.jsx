import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaTimes, FaFilter, FaCalendarAlt } from "react-icons/fa";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const orders = [
    {
      id: "ORD-2024-001",
      date: "2024-03-15",
      service: "Legal Consultation",
      status: "completed",
      amount: "2,500,000 VND",
      lawyer: "Sarah Johnson",
      description: "Initial consultation for property dispute case",
      details: {
        clientName: "John Smith",
        caseType: "Property Dispute",
        documents: ["Property Deed", "Previous Agreements"],
        notes:
          "Client seeking advice on property boundary dispute with neighbor",
        timeline: [
          { date: "2024-03-15", event: "Initial Consultation" },
          { date: "2024-03-16", event: "Document Review" },
          { date: "2024-03-17", event: "Case Strategy Meeting" },
        ],
      },
    },
    {
      id: "ORD-2024-002",
      date: "2024-03-10",
      service: "Document Review",
      status: "in_progress",
      amount: "1,800,000 VND",
      lawyer: "Michael Brown",
      description: "Contract review for business agreement",
      details: {
        clientName: "ABC Company",
        caseType: "Business Contract",
        documents: ["Business Agreement", "Financial Statements"],
        notes: "Review of partnership agreement terms and conditions",
        timeline: [
          { date: "2024-03-10", event: "Contract Received" },
          { date: "2024-03-11", event: "Initial Review" },
          { date: "2024-03-12", event: "Revision in Progress" },
        ],
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "in_progress":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "pending":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  const filteredOrders = orders.filter((order) => {
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    const timeMatch = timeFilter === "all" || true; // Add time filtering logic here
    return statusMatch && timeMatch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Orders | Law Firm</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">
              Manage and track your legal service orders
            </p>
          </div>

          {/* Filters */}
          <div className="px-8 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-gray-100">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {order.service}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Order ID: {order.id}
                      </p>
                    </div>
                    <p className="text-gray-600">{order.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Lawyer:</span>
                        {order.lawyer}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Date:</span>
                        {order.date}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <span className="font-medium mr-2">Amount:</span>
                        {order.amount}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <FaEye className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Details Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Order Details
                  </h2>
                  <p className="text-gray-500 mt-1">
                    Order ID: {selectedOrder.id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="text-xl" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {selectedOrder.service}
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Client Name
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.details.clientName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Case Type
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.details.caseType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Lawyer
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.lawyer}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Amount
                      </p>
                      <p className="mt-1 text-gray-900">
                        {selectedOrder.amount}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Documents
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <ul className="space-y-2">
                      {selectedOrder.details.documents.map((doc, index) => (
                        <li key={index} className="text-gray-900">
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Notes
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900">
                      {selectedOrder.details.notes}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">
                    Timeline
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-4">
                      {selectedOrder.details.timeline.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <span className="text-sm text-gray-500 min-w-[100px]">
                            {item.date}
                          </span>
                          <span className="text-gray-900">{item.event}</span>
                        </div>
                      ))}
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
