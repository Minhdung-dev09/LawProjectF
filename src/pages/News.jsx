import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import NewsSidebar from "../components/news/NewsSidebar";
import NewsCard from "../components/news/NewsCard";
import NewsDetail from "../components/news/NewsDetail";
import { news, newsCategories } from "../data";

export default function News() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

      <Banner
        title="Tin tức pháp luật"
        description="Cập nhật tin tức pháp luật mới nhất và các vấn đề pháp lý nổi bật"
        image="/images/news-banner.jpg"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <NewsSidebar
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Xử lý tìm kiếm ở đây nếu cần
                }}
                className="flex flex-col md:flex-row gap-4 mb-6"
              >
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Tìm kiếm tin tức..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {newsCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.slug)}
                      className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                        selectedCategory === category.slug
                          ? "bg-primary-600 text-white"
                          : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredNews.map((article) => (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
