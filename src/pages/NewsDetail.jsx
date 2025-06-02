import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { newsCategories } from "../data";

export default function NewsDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5001/api/news/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch article');
        }
        const data = await response.json();
        // Transform the data to match the frontend structure
        const transformedArticle = {
          id: data._id,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          content: data.content || '',
          image: data.image || '/default-news-image.jpg',
          category: data.category || 'uncategorized',
          date: new Date(data.createdAt).toLocaleDateString('vi-VN'),
          author: data.author?.username || 'Anonymous',
          views: data.views || 0,
          tags: data.tags || []
        };
        setArticle(transformedArticle);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-primary-600">Đang tải bài viết...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Có lỗi xảy ra: {error}</p>
        <Link
          to="/news"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700"
        >
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  // Not found state
  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-primary-800">
          Không tìm thấy bài viết
        </h2>
        <Link
          to="/news"
          className="inline-block mt-4 text-primary-600 hover:text-primary-700"
        >
          Quay lại danh sách tin tức
        </Link>
      </div>
    );
  }

  const category = newsCategories.find((cat) => cat.slug === article.category);

  return (
    <>
      <Helmet>
        <title>{article.title} - Tin tức pháp luật</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

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
          </div>
        </article>
      </motion.div>
    </>
  );
}
