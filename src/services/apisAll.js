import { axiosInstance, API_ENDPOINTS } from "./apiConfig";

// Auth APIs
export const authAPI = {
  login: async (formData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH, formData);
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USER_PROFILE,
      userData
    );
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await axiosInstance.put(
      API_ENDPOINTS.USER_PROFILE,
      passwordData
    );
    return response.data;
  },

  getCurrentUserProfile: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USER_PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};

// Order APIs

// Consultation APIs
export const consultationAPI = {
  createConsultation: async (consultationData) => {
    const response = await axiosInstance.post(
      API_ENDPOINTS.CONSULTATIONS,
      consultationData
    );
    return response.data;
  },

  getMyConsultations: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.MY_CONSULTATIONS);
    return response.data;
  },

  getAllConsultations: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.CONSULTATIONS);
    return response.data;
  },
};

// News APIs
export const newsAPI = {
  getAllNews: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NEWS);
    return response.data;
  },

  getFeaturedNews: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.TOP_VIEWED_NEWS);
    return response.data;
  },

  getLatestNews: async (limit = 5) => {
    const response = await axiosInstance.get(
      `${API_ENDPOINTS.LATEST_NEWS}?limit=${limit}`
    );
    return response.data;
  },
};

export const commentAPI = {
  // Lấy danh sách bình luận cho một bài viết
  getComments: async (articleId, page = 1, limit = 5) => {
    try {
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.COMMENTS}/${articleId}?page=${page}&limit=${limit}`
      );

      if (!response.data) {
        throw new Error("Có lỗi xảy ra khi tải bình luận");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Thêm bình luận mới
  createComment: async (articleId, content, rating) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Vui lòng đăng nhập để bình luận");
      }

      const response = await axiosInstance.post(
        `${API_ENDPOINTS.COMMENTS}/${articleId}`,
        { content, rating }
      );

      if (!response.data) {
        throw new Error("Có lỗi xảy ra khi thêm bình luận");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Cập nhật bình luận
  updateComment: async (commentId, content, rating) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Vui lòng đăng nhập để cập nhật bình luận");
      }

      const response = await axiosInstance.put(
        `${API_ENDPOINTS.COMMENTS}/${commentId}`,
        { content, rating }
      );

      if (!response.data) {
        throw new Error("Có lỗi xảy ra khi cập nhật bình luận");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },

  // Xóa bình luận
  deleteComment: async (commentId) => {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Vui lòng đăng nhập để xóa bình luận");
      }

      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.COMMENTS}/${commentId}`
      );

      if (!response.data) {
        throw new Error("Có lỗi xảy ra khi xóa bình luận");
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.message;
    }
  },
};
