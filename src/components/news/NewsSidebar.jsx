import { Link } from "react-router-dom";
import { newsCategories } from "../../data";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NewsSidebar({ selectedCategory, onCategorySelect }) {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-primary-800 mb-3">Danh mục</h3>
      <ul className="space-y-1">
        {newsCategories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onCategorySelect(category.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                selectedCategory === category.slug
                  ? "bg-primary-600 text-white"
                  : "text-primary-600 hover:bg-primary-50"
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary-800 mb-3">
          Tin tức nổi bật
        </h3>
        <div className="space-y-2">
          {loading ? (
            // Loading skeleton
            [...Array(5)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-primary-50 rounded-md p-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))
          ) : error ? (
            <p className="text-red-500 text-sm">Không thể tải tin tức: {error}</p>
          ) : (
            topNews.map((article) => (
              <Link key={article._id} to={`/news/${article._id}`} className="block group">
                <div className="bg-primary-50 rounded-md p-2 hover:bg-primary-100 transition-colors">
                  <h4 className="text-sm font-medium text-primary-800 group-hover:text-primary-600 line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-xs text-primary-600 mt-1">
                    {new Date(article.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
