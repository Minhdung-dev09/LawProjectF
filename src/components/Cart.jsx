import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const initialCartItems = [
  {
    id: 1,
    name: "Sách Luật Doanh Nghiệp 2024",
    price: 250000,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Tài liệu Hướng dẫn Thủ tục Hành chính",
    price: 180000,
    quantity: 2,
    image:
      "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [isCheckout, setIsCheckout] = useState(false);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckout(true);
    // Here you would typically handle payment processing
    setTimeout(() => {
      setCartItems([]);
      setIsCheckout(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary-800 mb-8">Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-primary-600 mb-4">
            Giỏ hàng của bạn đang trống
          </p>
          <Link
            to="/shop"
            className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="flex items-center bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-primary-800">
                      {item.name}
                    </h3>
                    <p className="text-primary-600">
                      {item.price.toLocaleString("vi-VN")}đ
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 text-primary-600 hover:bg-primary-50"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 text-primary-600 hover:bg-primary-50"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-primary-800">
                Tổng cộng:
              </span>
              <span className="text-xl font-bold text-primary-800">
                {total.toLocaleString("vi-VN")}đ
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckout}
              className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                isCheckout
                  ? "bg-primary-400 cursor-not-allowed"
                  : "bg-primary-600 hover:bg-primary-700"
              }`}
            >
              {isCheckout ? "Đang xử lý..." : "Thanh toán"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
