import { useState } from "react";
import { motion } from "framer-motion";

const comments = [
  {
    id: 1,
    author: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Bài viết rất hữu ích, cảm ơn tác giả đã chia sẻ.",
    date: "2024-02-20",
    rating: 5,
  },
  {
    id: 2,
    author: "Trần Thị B",
    avatar: "https://i.pravatar.cc/150?img=2",
    content: "Tôi đã áp dụng những thông tin này và thấy rất hiệu quả.",
    date: "2024-02-19",
    rating: 4,
  },
];

export default function Comment({ articleId }) {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState(comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "Người dùng",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: newComment,
      date: new Date().toISOString().split("T")[0],
      rating,
    };

    setComments([comment, ...comments]);
    setNewComment("");
    setRating(5);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-primary-800 mb-6">Bình luận</h3>

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
            placeholder="Viết bình luận của bạn..."
          />
        </div>
        <button
          type="submit"
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Gửi bình luận
        </button>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-lg shadow"
          >
            <div className="flex items-center mb-4">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold text-primary-800">
                  {comment.author}
                </h4>
                <p className="text-sm text-primary-500">{comment.date}</p>
              </div>
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
        ))}
      </div>
    </div>
  );
}
