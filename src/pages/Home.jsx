import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import AdSidebar from "../components/AdSidebar";
import WelcomePopup from "../components/WelcomePopup";
import { newsAPI } from "../services/apisAll";

const features = [
  {
    title: "Tư vấn pháp lý",
    description: "Đội ngũ luật sư giàu kinh nghiệm tư vấn mọi vấn đề pháp lý",
    icon: "⚖️",
  },
  {
    title: "Đại diện pháp lý",
    description: "Đại diện khách hàng trong các vụ án và tranh chấp",
    icon: "👨‍⚖️",
  },
  {
    title: "Soạn thảo hợp đồng",
    description: "Tư vấn và soạn thảo các loại hợp đồng chuyên nghiệp",
    icon: "📝",
  },
];

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsAPI.getAllNews();
        // Transform the data to match the frontend structure
        const transformedData = data.map(item => ({
          id: item._id,
          title: item.title || 'Untitled',
          excerpt: item.excerpt || '',
          content: item.content || '',
          image: item.image || '/default-news-image.jpg',
          category: item.category || 'uncategorized',
          date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
          author: item.author?.username || 'Anonymous',
          views: item.views || 0,
          tags: item.tags || []
        }));
        setNews(transformedData);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Có lỗi xảy ra khi tải tin tức");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Trang chủ - Tìm hiểu và Tư vấn các vấn đề về Pháp luật - Pháp lý</title>
        <meta
          name="description"
          content="Công ty Luật Sushilaw - Đơn vị tư vấn pháp lý hàng đầu, cung cấp các dịch vụ tư vấn pháp luật, đại diện pháp lý và soạn thảo hợp đồng."
        />
      </Helmet>

      <WelcomePopup />
      <Banner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Dịch vụ của chúng tôi
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6"
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-primary-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Tin tức mới nhất
              </h2>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-4 text-primary-600">Đang tải tin tức...</p>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-600">Có lỗi xảy ra: {error}</p>
                  <button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Thử lại
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {news.slice(0, 6).map((item) => (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-lg overflow-hidden shadow-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center text-primary-600 mb-2">
                          <span className="mr-4 text-sm">{item.date}</span>
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-primary-800 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-primary-600 mb-4 text-sm line-clamp-3">
                          {item.excerpt}
                        </p>
                        <Link
                          to={`/news/${item.id}`}
                          className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                        >
                          Đọc thêm →
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
              <div className="text-center mt-8">
                <Link
                  to="/news"
                  className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Xem thêm tin tức
                </Link>
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Câu hỏi pháp lý thường gặp
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-primary-800 mb-2">
                        Thời hiệu khởi kiện là gì?
                      </h3>
                      <p className="text-primary-600 text-sm">
                        Thời hiệu khởi kiện là thời hạn mà chủ thể được quyền
                        khởi kiện để yêu cầu Tòa án giải quyết vụ án dân sự bảo
                        vệ quyền và lợi ích hợp pháp bị xâm phạm.
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="font-semibold text-primary-800 mb-2">
                        Hợp đồng miệng có giá trị pháp lý không?
                      </h3>
                      <p className="text-primary-600 text-sm">
                        Hợp đồng miệng vẫn có giá trị pháp lý nếu đáp ứng đủ các
                        điều kiện về năng lực hành vi dân sự và sự tự nguyện của
                        các bên.
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/faq"
                    className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Xem thêm câu hỏi →
                  </Link>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-primary-800 mb-6">
                    Thống kê thú vị
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        98%
                      </div>
                      <p className="text-primary-600 text-sm">
                        Tỷ lệ vụ án thành công
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        15+
                      </div>
                      <p className="text-primary-600 text-sm">
                        Năm kinh nghiệm
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        5000+
                      </div>
                      <p className="text-primary-600 text-sm">
                        Khách hàng hài lòng
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                      <div className="text-3xl font-bold text-primary-600 mb-2">
                        24/7
                      </div>
                      <p className="text-primary-600 text-sm">Hỗ trợ pháp lý</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar - Only visible on desktop (lg and above) */}
          <div className="hidden lg:block">
            <AdSidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
