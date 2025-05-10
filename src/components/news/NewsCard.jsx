import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsCard({ news }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute top-2 left-2">
            <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs">
              {news.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center text-xs text-primary-600 mb-2">
            <span className="mr-3">{news.date}</span>
            <span className="flex items-center">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              {news.views}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-primary-800 mb-2 line-clamp-2">
            {news.title}
          </h3>
          <p className="text-xs text-primary-600 mb-3 line-clamp-2">
            {news.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-primary-600">{news.author}</span>
            <span className="text-xs text-primary-600 hover:text-primary-700 transition-colors">
              Đọc thêm →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
