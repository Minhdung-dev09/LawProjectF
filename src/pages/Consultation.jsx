import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Mock data - replace with actual API call
const lawyers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    specialization: "Luật Dân sự",
    experience: "15 năm",
    image: "https://via.placeholder.com/200x200",
    description:
      "Chuyên gia tư vấn về các vấn đề dân sự, hôn nhân gia đình, thừa kế.",
  },
  {
    id: 2,
    name: "Trần Thị B",
    specialization: "Luật Hình sự",
    experience: "12 năm",
    image: "https://via.placeholder.com/200x200",
    description:
      "Chuyên gia tư vấn về các vấn đề hình sự, bảo vệ quyền lợi người bị hại.",
  },
  // Add more mock data as needed
];

export default function Consultation() {
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    issue: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", {
      ...formData,
      lawyerId: selectedLawyer?.id,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Đặt lịch tư vấn - LawPJ</title>
        <meta
          name="description"
          content="Đặt lịch tư vấn với đội ngũ luật sư chuyên nghiệp, giàu kinh nghiệm"
        />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Đặt lịch tư vấn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Tư vấn với đội ngũ luật sư chuyên nghiệp, giàu kinh nghiệm
          </motion.p>
        </div>

        {/* Lawyers Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Đội ngũ luật sư</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ${
                  selectedLawyer?.id === lawyer.id
                    ? "ring-2 ring-primary-600"
                    : ""
                }`}
                onClick={() => setSelectedLawyer(lawyer)}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={lawyer.image}
                      alt={lawyer.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {lawyer.name}
                      </h3>
                      <p className="text-primary-600 font-medium">
                        {lawyer.specialization}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Kinh nghiệm: {lawyer.experience}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">{lawyer.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Đặt lịch tư vấn</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày hẹn
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ hẹn
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vấn đề cần tư vấn
              </label>
              <textarea
                name="issue"
                value={formData.issue}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!selectedLawyer}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                  selectedLawyer
                    ? "bg-primary-600 hover:bg-primary-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Đặt lịch
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
