import { axiosInstance } from "./apiConfig";

// Auth APIs
export const authAPI = {
  login: async (formData) => {
    const response = await axiosInstance.post("/users/auth", formData);
    return response.data;
  },
  
  updateProfile: async (userData) => {
    const response = await axiosInstance.put("/users/profile", userData);
    return response.data;
  },
  
  changePassword: async (passwordData) => {
    const response = await axiosInstance.put("/users/profile", passwordData);
    return response.data;
  },

  getCurrentUserProfile: async () => {
    try {
      const response = await axiosInstance.get("/users/profile");
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  }
};



// Order APIs

// Consultation APIs
export const consultationAPI = {
  createConsultation: async (consultationData) => {
    const response = await axiosInstance.post("/consultations", consultationData);
    return response.data;
  },

  getMyConsultations: async () => {
    const response = await axiosInstance.get("/consultations/my");
    return response.data;
  },

  getAllConsultations: async () => {
    const response = await axiosInstance.get("/consultations");
    return response.data;
  },
};

// News APIs
export const newsAPI = {
  getAllNews: async () => {
    const response = await axiosInstance.get("/news");
    return response.data;
  },

  getFeaturedNews: async () => {
    const response = await axiosInstance.get(`/news/top-viewed`);
    return response.data;
  },

  getLatestNews: async (limit = 5) => {
    const response = await axiosInstance.get(`/news/latest?limit=${limit}`);
    return response.data;
  }
};

export const commentAPI = {
  // Lấy danh sách bình luận cho một bài viết
  getComments: async (articleId, page = 1, limit = 5) => {
    try {
      const response = await axiosInstance.get(`/comments/${articleId}?page=${page}&limit=${limit}`);
      
      if (!response.data) {
        throw new Error('Có lỗi xảy ra khi tải bình luận');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Thêm bình luận mới
  createComment: async (articleId, content, rating) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Vui lòng đăng nhập để bình luận');
      }

      const response = await axiosInstance.post(`/comments/${articleId}`, { content, rating });
      
      if (!response.data) {
        throw new Error('Có lỗi xảy ra khi thêm bình luận');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Cập nhật bình luận
  updateComment: async (commentId, content, rating) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Vui lòng đăng nhập để cập nhật bình luận');
      }

      const response = await axiosInstance.put(`/comments/${commentId}`, { content, rating });
      
      if (!response.data) {
        throw new Error('Có lỗi xảy ra khi cập nhật bình luận');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Xóa bình luận
  deleteComment: async (commentId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Vui lòng đăng nhập để xóa bình luận');
      }

      const response = await axiosInstance.delete(`/comments/${commentId}`);
      
      if (!response.data) {
        throw new Error('Có lỗi xảy ra khi xóa bình luận');
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};
