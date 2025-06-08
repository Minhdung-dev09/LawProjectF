import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import MessengerChat from './components/MessengerChat';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <CartProvider>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <WelcomePopup />
              <Routes>
                <Route path="/" element={<Home />} />
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
              <Footer />
              <MessengerChat pageId="100083272317932" />
            </div>

        </CartProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
