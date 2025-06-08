import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBriefcase,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { consultationAPI } from "../services/apisAll";

export default function Consultation() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Vui lòng đăng nhập để gửi yêu cầu tư vấn.");
      }

      await consultationAPI.createConsultation(formData);
      toast.success("Gửi yêu cầu tư vấn thành công!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting consultation:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi gửi yêu cầu tư vấn"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Tư vấn pháp luật - SushiLaw</title>
        <meta
          name="description"
          content="Nhận tư vấn pháp luật trực tiếp từ đội ngũ luật sư chuyên nghiệp của SushiLaw. Giải đáp mọi thắc mắc pháp lý của bạn."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Tư vấn pháp luật trực tiếp
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Thông tin luật sư */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col items-center mb-6">
                <img
                  src="https://phuoc-associates.com/wp-content/uploads/2019/10/Nh%C6%B0-th%E1%BA%BF-n%C3%A0o-l%C3%A0-m%E1%BB%99t-lu%E1%BA%ADt-s%C6%B0-tranh-t%E1%BB%A5ng-gi%E1%BB%8Fi.jpg"
                  alt=" Lê Thị Thủy Ngân"
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary-100"
                />
                <h2 className="text-xl font-semibold text-primary-900">
                  Luật sư AA
                </h2>
                <p className="text-primary-600">
                Luật sư chuyên về pháp luật dân sự
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FaUser className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-primary-900">
                      Thông tin cá nhân
                    </h3>
                    <p className="text-primary-600">Sinh ngày: 13/09/2005</p>
                    <p className="text-primary-600">
                      Quê quán: Hà Nội, Việt Nam
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaGraduationCap className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-primary-900">Học vấn</h3>
                    <p className="text-primary-600">
                      Công ty luật sushilaw
                    </p>
                    <p className="text-primary-600">
                      Chuyên ngành: Luật Dân sự
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaBriefcase className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-primary-900">
                      Kinh nghiệm
                    </h3>
                    <ul className="list-disc list-inside text-primary-600 space-y-1">
                      <li>
                        Tham gia các hoạt động tư vấn pháp luật miễn phí tại
                        trường
                      </li>
                      <li>Hỗ trợ nghiên cứu các vụ án dân sự</li>
                      <li>Tham gia các khóa học về kỹ năng tư vấn pháp luật</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <FaPhone className="w-5 h-5 text-primary-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-primary-900">Liên hệ</h3>
                    <p className="text-primary-600">Hotline: 0123 456 789</p>
                    <p className="text-primary-600">
                      Email: thuyngan@sushilaw.vn
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form tư vấn */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Gửi yêu cầu tư vấn</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Chủ đề tư vấn
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Nội dung cần tư vấn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400"
                >
                  {loading ? "Đang gửi..." : "Gửi yêu cầu tư vấn"}
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
