import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { newsAPI } from "../../services/apisAll";

export default function LatestNews() {
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        const data = await newsAPI.getLatestNews(5);
        setLatestNews(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching latest news:", err);
        setError("Không thể tải tin tức. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">
          Tin tức mới nhất
        </h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-2 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-md"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">
          Tin tức mới nhất
        </h3>
        <div className="text-red-600 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-primary-900 mb-3">
        Tin tức mới nhất
      </h3>
      <div className="space-y-3">
        {latestNews.map((article) => (
          <motion.div
            key={article._id}
            whileHover={{ x: 5 }}
            className="flex gap-2 group"
          >
            <Link
              to={`/news/${article._id}`}
              className="flex gap-2 w-full hover:bg-primary-50 p-2 rounded-lg transition-colors"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={article.image || '/default-news-image.jpg'}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-primary-900 group-hover:text-primary-600 line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-xs text-primary-500 mt-1">
                  {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
