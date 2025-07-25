import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./contexts/CartContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Consultation from "./pages/Consultation";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import WelcomePopup from "./components/WelcomePopup";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import MyConsultations from "./pages/MyConsultations";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Loading from "./components/Loading";
import { useState, useEffect } from "react";
import { newsAPI } from "./services/apisAll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await newsAPI.getAllNews();
        const transformedData = data.map(item => ({
          id: item._id,
          title: item.title || 'Untitled',
          excerpt: item.excerpt || '',
          content: item.content || '',
          image: item.image || '/default-news-image.jpg',
          category: item.category || 'uncategorized',
          date: new Date(item.createdAt).toLocaleDateString('vi-VN'),
          author: item.author?.username || 'Anonymous',
          views: item.views || 0,
          tags: item.tags || []
        }));
        setNews(transformedData);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Có lỗi xảy ra khi tải tin tức");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg mb-4">Có lỗi xảy ra: {error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <WelcomePopup />
              <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
              <Routes>
                <Route path="/" element={<Home news={news} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:id" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/my-consultations" element={<MyConsultations />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
              </Routes>
              {location.pathname === "/" && <Footer />}
            </div>
        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
