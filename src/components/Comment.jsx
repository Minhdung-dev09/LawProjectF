import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { commentAPI, authAPI } from "../services/apisAll";

export default function Comment({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const commentsPerPage = 5;

  const authToken = localStorage.getItem('authToken');
  const userId = authToken ? JSON.parse(atob(authToken.split('.')[1])).id : null;

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (authToken) {
          const userData = await authAPI.getCurrentUserProfile();
          setUserProfile(userData);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [authToken]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const data = await commentAPI.getComments(articleId, currentPage, commentsPerPage);
        setComments(data.comments);
        setTotalPages(data.pages);
      } catch (error) {
        toast.error(error.message || 'Có lỗi xảy ra khi tải bình luận');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [articleId, currentPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      toast.error('Vui lòng đăng nhập để bình luận');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Vui lòng nhập nội dung bình luận');
      return;
    }

    try {
      setLoading(true);
      const newCommentData = await commentAPI.createComment(articleId, newComment.trim(), rating);
      
      // Add user profile info to the new comment
      newCommentData.user = userProfile;
      
      setComments([newCommentData, ...comments]);
      setNewComment("");
      setRating(5);
      setCurrentPage(1);
      toast.success('Đã thêm bình luận');
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi thêm bình luận');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Bạn có chắc muốn xóa bình luận này?')) {
      return;
    }

    try {
      setLoading(true);
      await commentAPI.deleteComment(commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
      toast.success('Đã xóa bình luận');
    } catch (error) {
      toast.error(error.message || 'Có lỗi xảy ra khi xóa bình luận');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-primary-800 mb-6">
        Bình luận {comments.length > 0 && `(${comments.length})`}
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-primary-700 mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? "⭐" : "☆"}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-primary-700 mb-2">
            Bình luận của bạn
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows="4"
            placeholder={authToken ? "Viết bình luận của bạn..." : "Vui lòng đăng nhập để bình luận"}
            disabled={!authToken || loading}
          />
        </div>
        <button
          type="submit"
          disabled={!authToken || loading}
          className={`bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors ${
            !authToken || loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary-700"
          }`}
        >
          {loading ? "Đang gửi..." : "Gửi bình luận"}
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {loading && comments.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-primary-600">Đang tải bình luận...</p>
          </div>
        ) : comments.length === 0 ? (
          <p className="text-center text-primary-600 py-8">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
        ) : (
          comments.map((comment) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={comment.user?.image || "https://i.pravatar.cc/150"}
                    alt={comment.user?.username || "Người dùng"}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-primary-800">
                      {comment.user?.username || "Người dùng"}
                    </h4>
                    <p className="text-sm text-primary-500">
                      {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
                {authToken && comment.user?._id === userId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    {i < comment.rating ? "⭐" : "☆"}
                  </span>
                ))}
              </div>
              <p className="text-primary-700">{comment.content}</p>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            Trước
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-primary-600 text-white"
                  : "bg-white text-primary-600 hover:bg-primary-50"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            Sau
          </button>
        </div>
      )}
    </div>
  );
}
