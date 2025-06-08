import { useState } from "react";

export default function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(true);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-10" />
        <div className="p-8 relative z-10">
          <h2 className="text-3xl font-bold text-primary-800 mb-4">
            Chào mừng đến với Công ty Luật Sushilaw
          </h2>
          <div className="space-y-4 text-primary-600">
            <p>
              Chúng tôi tự hào là đơn vị tư vấn pháp lý hàng đầu, cung cấp các
              dịch vụ:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li> 🫡 Tư vấn pháp luật chuyên sâu</li>
              <li> 🫡 Đại diện pháp lý</li>
              <li> 🫡 Soạn thảo hợp đồng</li>
              <li> 🫡 Giải quyết tranh chấp</li>
            </ul>
            <p>
              Với đội ngũ luật sư giàu kinh nghiệm, chúng tôi cam kết mang đến
              cho bạn những giải pháp pháp lý tốt nhất.
            </p>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium cursor-pointer relative z-20"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
