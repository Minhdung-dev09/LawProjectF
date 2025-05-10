import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Shop from "./pages/Shop";
import Consultation from "./pages/Consultation";
import Cart from "./components/Cart";
import WelcomePopup from "./components/WelcomePopup";
import FAQ from "./pages/FAQ";

export default function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <WelcomePopup />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="news/:id" element={<NewsDetail />} />
            <Route path="shop" element={<Shop />} />
            <Route path="shop/:id" element={<Shop />} />
            <Route path="consultation" element={<Consultation />} />
            <Route path="cart" element={<Cart />} />
            <Route path="faq" element={<FAQ />} />
          </Route>
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}
