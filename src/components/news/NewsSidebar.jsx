import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { newsCategories } from "../../data";
import { newsAPI } from "../../services/apisAll";

export default function NewsSidebar({ selectedCategory, onCategorySelect }) {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const [featuredData, latestData] = await Promise.all([
          newsAPI.getFeaturedNews(3),
          newsAPI.getLatestNews(3)
        ]);

        setFeaturedNews(featuredData);
        setLatestNews(latestData);
        setError(null);
      } catch (err) {
        console.error("Error fetching sidebar news:", err);
        setError("Không thể tải tin tức. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

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

      {error && (
        <div className="mt-4 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="mt-6 space-y-4">
          <div className="animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 rounded-md p-2">
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-primary-800 mb-3">
              Tin tức nổi bật
            </h3>
            <div className="space-y-2">
              {featuredNews.map((news) => (
                <Link key={news._id} to={`/news/${news._id}`} className="block group">
                  <div className="bg-primary-50 rounded-md p-2 hover:bg-primary-100 transition-colors">
                    <h4 className="text-sm font-medium text-primary-800 group-hover:text-primary-600 line-clamp-2">
                      {news.title}
                    </h4>
                    <p className="text-xs text-primary-600 mt-1">{formatDate(news.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
