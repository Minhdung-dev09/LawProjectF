import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import NewsSidebar from "../components/news/NewsSidebar";
import NewsCard from "../components/news/NewsCard";
import NewsDetail from "../components/news/NewsDetail";
import { news, newsCategories } from "../data";

export default function News() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // 4 items per row * 4 rows

  // Tìm bài viết theo ID từ URL
  const selectedArticle = news.find((article) => article.id === parseInt(id));

  const filteredNews = news.filter((article) => {
    const matchesCategory =
      !selectedCategory || article.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Nếu có ID và tìm thấy bài viết, hiển thị trang chi tiết
  if (id && selectedArticle) {
    return (
      <>
        <Helmet>
          <title>{selectedArticle.title} - Tin tức pháp luật</title>
          <meta name="description" content={selectedArticle.excerpt} />
        </Helmet>
        <NewsDetail article={selectedArticle} />
      </>
    );
  }

  // Nếu không có ID hoặc không tìm thấy bài viết, hiển thị danh sách tin tức
  return (
    <>
      <Helmet>
        <title>Tin tức pháp luật - Công ty Luật ABC</title>
        <meta
          name="description"
          content="Cập nhật tin tức pháp luật mới nhất, các vấn đề pháp lý nổi bật và tư vấn pháp luật chuyên sâu từ đội ngũ luật sư giàu kinh nghiệm."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/5">
            <NewsSidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-4/5">
            <div className="mb-8">
              {/* Search Input */}
              <div className="flex justify-end mb-6">
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tin tức..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 pl-10 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <svg
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* News Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentNews.map((article) => (
                  <NewsCard key={article.id} news={article} />
                ))}
              </div>

              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-primary-600 text-lg">
                    Không tìm thấy bài viết nào phù hợp với tiêu chí tìm kiếm.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Trước
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded-lg ${
                          currentPage === index + 1
                            ? "bg-primary-600 text-white"
                            : "border border-primary-200 text-primary-600 hover:bg-primary-50"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Sau
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
