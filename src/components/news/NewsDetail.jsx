import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Comment from "../Comment";
import { newsCategories } from "../../data";

export default function NewsDetail({ article }) {
  const [isSaved, setIsSaved] = useState(false);
  const category = newsCategories.find((cat) => cat.slug === article.category);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // TODO: Implement save functionality
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Link
        to="/news"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Quay lại danh sách tin tức
      </Link>

      <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                {category?.name || article.category}
              </span>
              <span>{article.date}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                {article.author}
              </span>
              <span className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
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
                {article.views} lượt xem
              </span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-primary-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-primary-200">
            <h3 className="text-xl font-bold text-primary-800 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-200">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-primary-800">Bình luận</h3>
              <button
                onClick={handleSave}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isSaved
                    ? "bg-primary-100 text-primary-700"
                    : "bg-primary-600 text-white hover:bg-primary-700"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>{isSaved ? "Đã lưu" : "Lưu bài viết"}</span>
              </button>
            </div>
            <Comment articleId={article.id} />
          </div>
        </div>
      </article>
    </motion.div>
  );
}
