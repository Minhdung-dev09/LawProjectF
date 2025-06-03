import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

export default function LatestNews() {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/news/top-viewed");
        setTopNews(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTopNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold text-primary-900 mb-3">
          Tin tức hot nhất
        </h3>
        <div className="space-y-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse flex gap-2">
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
          Tin tức hot nhất
        </h3>
        <p className="text-red-500">Có lỗi xảy ra: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-primary-900 mb-3">
        Tin tức hot nhất
      </h3>
      <div className="space-y-3">
        {topNews.map((article) => (
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
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-primary-900 group-hover:text-primary-600 line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs text-primary-500">
                    {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
