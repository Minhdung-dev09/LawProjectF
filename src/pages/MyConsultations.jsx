import { useState, useEffect } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { consultationAPI } from "../services/apisAll";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
};

const statusText = {
  pending: "Chờ xử lý",
  approved: "Đã duyệt",
  rejected: "Từ chối",
  completed: "Hoàn thành",
};

const MyConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Vui lòng đăng nhập để xem danh sách tư vấn.");
        }

        const data = await consultationAPI.getMyConsultations();
        setConsultations(data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
        toast.error(
          error.response?.data?.message || "Có lỗi xảy ra khi tải dữ liệu"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

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
        <title>Lịch tư vấn của tôi | SushiLaw</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Lịch tư vấn của tôi
          </h1>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {consultations.map((consultation) => (
              <li key={consultation._id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {consultation.fullName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {consultation.email}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {consultation.phone}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Chủ đề tư vấn
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {consultation.subject}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Nội dung cần tư vấn
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {consultation.message}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Trạng thái
                      </h4>
                      <span
                        className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[consultation.status]
                        }`}
                      >
                        {statusText[consultation.status]}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">
                        Thời gian cập nhật
                      </h4>
                      <p className="mt-1 text-sm text-gray-500">
                        {format(
                          new Date(consultation.updatedAt),
                          "HH:mm - dd/MM/yyyy",
                          {
                            locale: vi,
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyConsultations;
