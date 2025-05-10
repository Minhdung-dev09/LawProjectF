import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import AdSidebar from "../components/AdSidebar";
import WelcomePopup from "../components/WelcomePopup";
import { news } from "../data";

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
  return (
    <div>
      <Helmet>
        <title>Trang chủ - Công ty Luật ABC</title>
        <meta
          name="description"
          content="Công ty Luật ABC - Đơn vị tư vấn pháp lý hàng đầu, cung cấp các dịch vụ tư vấn pháp luật, đại diện pháp lý và soạn thảo hợp đồng."
        />
      </Helmet>

      <WelcomePopup />
      <Banner />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(0, 2).map((item) => (
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
                    <div className="p-6">
                      <div className="flex items-center text-primary-600 mb-2">
                        <span className="mr-4">{item.date}</span>
                        <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-primary-800">
                        {item.title}
                      </h3>
                      <p className="text-primary-600 mb-4">{item.excerpt}</p>
                      <Link
                        to={`/news/${item.id}`}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Đọc thêm →
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="bg-primary-50 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-primary-800 mb-4">
                Cần tư vấn pháp lý?
              </h2>
              <p className="text-primary-600 mb-6">
                Đội ngũ luật sư của chúng tôi luôn sẵn sàng hỗ trợ bạn
              </p>
              <Link
                to="/consultation"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Đặt lịch tư vấn
              </Link>
            </section>
          </div>

          <AdSidebar />
        </div>
      </div>
    </div>
  );
}
