import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { FaEnvelope, FaBalanceScale, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Handle password reset logic here
      console.log(email);
      toast.success("Yêu cầu đặt lại mật khẩu đã được gửi! Vui lòng kiểm tra email của bạn.");
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Gửi yêu cầu thất bại");
      toast.error(err.response?.data?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Quên mật khẩu - SushiLaw</title>
        <meta
          name="description"
          content="Khôi phục mật khẩu tài khoản SushiLaw"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <Link
              to="/login"
              className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-6"
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Quay lại đăng nhập
            </Link>

            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-block p-3 bg-primary-100 rounded-full mb-4"
              >
                <FaBalanceScale className="w-8 h-8 text-primary-600" />
              </motion.div>
              <h1 className="text-2xl font-bold text-primary-900">
                Quên mật khẩu
              </h1>
              <p className="text-primary-600 mt-2">
                Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-700 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-5 w-5 text-primary-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Gửi yêu cầu khôi phục
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-700">
                    Chúng tôi đã gửi hướng dẫn khôi phục mật khẩu đến email của
                    bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
                  </p>
                </div>
                <p className="text-sm text-primary-600">
                  Không nhận được email?{" "}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Gửi lại
                  </button>
                </p>
              </motion.div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-primary-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:text-primary-500"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
