import React from 'react';
import ChatBot from '../components/ChatBot';
import { FaRobot, FaInfoCircle } from 'react-icons/fa';

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative">

      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <FaRobot className="w-96 h-96" />
      </div>

      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 relative">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-400 to-gray-500 mb-4 sm:mb-6 transform hover:rotate-6 transition-transform">
              <FaRobot className="text-white text-2xl sm:text-3xl" />
            </div>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Hệ thống trí tuệ nhân tạo hỗ trợ tra cứu và giải đáp thông tin pháp luật
            </p>
          </div>

          {/* Disclaimer */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 mx-2 sm:mx-0">
            <div className="flex items-start gap-2 sm:gap-3">
              <FaInfoCircle className="text-red-500 text-lg sm:text-xl flex-shrink-0 mt-0.5" />
              <div className="text-red-700 text-xs sm:text-sm">
                <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
                <p>
                  Trợ lý AI chỉ mang tính chất tham khảo. Để có thông tin chính xác và cập nhật nhất, 
                  vui lòng truy cập các nguồn chính thống như{' '}
                  <a 
                    href="https://thuvienphapluat.vn/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 underline"
                  >
                    Thư viện Pháp luật
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden border border-gray-100 mx-2 sm:mx-0">
            <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                  <FaRobot className="text-white text-lg sm:text-xl" />
                </div>
                <div>
                  <h2 className="text-white text-base sm:text-lg font-semibold">
                    Chat với AI
                  </h2>
                  <p className="text-gray-100 text-xs sm:text-sm">
                    Đặt câu hỏi về các vấn đề pháp luật
                  </p>
                </div>
              </div>
            </div>
            <ChatBot />
          </div>

          {/* Tips */}
          <div className="mt-4 sm:mt-6 bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200 mx-2 sm:mx-0">
            <h3 className="text-gray-700 font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
              Mẹo sử dụng hiệu quả:
            </h3>
            <ul className="space-y-2 text-gray-600 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Đặt câu hỏi rõ ràng, cụ thể về vấn đề pháp lý bạn quan tâm
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Cung cấp thông tin liên quan như số hiệu văn bản, thời gian ban hành (nếu có)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                Kiểm tra và đối chiếu thông tin với các nguồn chính thống
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;