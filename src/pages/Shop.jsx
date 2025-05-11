import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useCart } from "../contexts/CartContext";

const categories = ["Tất cả", "Sách", "Tài liệu", "Khóa học"];

// Mock data - replace with actual API call
const products = [
  {
    id: 1,
    name: "Sách Luật Doanh Nghiệp 2024",
    price: 250000,
    description:
      "Cập nhật đầy đủ các quy định mới nhất về luật doanh nghiệp, bao gồm các thay đổi quan trọng và hướng dẫn chi tiết.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Sách",
    stock: 50,
  },
  {
    id: 2,
    name: "Tài liệu Hướng dẫn Thủ tục Hành chính",
    price: 180000,
    description:
      "Tài liệu hướng dẫn chi tiết về các thủ tục hành chính thường gặp, giúp người dân dễ dàng thực hiện các thủ tục.",
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Tài liệu",
    stock: 30,
  },
  {
    id: 3,
    name: "Khóa học Luật Dân sự Cơ bản",
    price: 1200000,
    description:
      "Khóa học trực tuyến về luật dân sự, phù hợp cho người mới bắt đầu tìm hiểu về pháp luật.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    category: "Khóa học",
    stock: 100,
  },
];

export default function Shop() {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { addToCart } = useCart();

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory =
        selectedCategory === "Tất cả" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  const selectedProduct = id
    ? products.find((item) => item.id === parseInt(id))
    : null;

  if (selectedProduct) {
    return (
      <div>
        <Helmet>
          <title>{selectedProduct.name} - Cửa hàng pháp lý</title>
          <meta name="description" content={selectedProduct.description} />
        </Helmet>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            to="/shop"
            className="inline-block text-primary-600 hover:text-primary-700 mb-6"
          >
            ← Quay lại cửa hàng
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary-800 mb-4">
                {selectedProduct.name}
              </h1>
              <p className="text-2xl font-semibold text-primary-600 mb-4">
                {selectedProduct.price.toLocaleString("vi-VN")}đ
              </p>
              <p className="text-primary-700 mb-6">
                {selectedProduct.description}
              </p>
              <div className="mb-6">
                <span className="text-primary-600">
                  Còn lại: {selectedProduct.stock} sản phẩm
                </span>
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  alert("Đã thêm vào giỏ hàng!");
                }}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Cửa hàng pháp lý - Sách và tài liệu pháp luật</title>
        <meta
          name="description"
          content="Cửa hàng cung cấp sách, tài liệu và khóa học pháp lý chất lượng cao."
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-primary-800 mb-4 md:mb-0">
            Cửa hàng pháp lý
          </h1>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-primary-100 text-primary-700 hover:bg-primary-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm mb-2 inline-block">
                  {product.category}
                </span>
                <h2 className="text-xl font-semibold mb-2 text-primary-800">
                  {product.name}
                </h2>
                <p className="text-primary-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-primary-800">
                    {product.price.toLocaleString("vi-VN")}đ
                  </span>
                  <Link
                    to={`/shop/${product.id}`}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Chi tiết →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
