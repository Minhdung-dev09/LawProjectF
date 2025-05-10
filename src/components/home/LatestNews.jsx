import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { news } from "../../data";

export default function LatestNews() {
  // Lấy 5 tin tức mới nhất
  const latestNews = [...news]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-primary-900 mb-3">
        Tin tức mới nhất
      </h3>
      <div className="space-y-3">
        {latestNews.map((article) => (
          <motion.div
            key={article.id}
            whileHover={{ x: 5 }}
            className="flex gap-2 group"
          >
            <Link
              to={`/news/${article.id}`}
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
                <p className="text-xs text-primary-500 mt-1">
                  {new Date(article.date).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
