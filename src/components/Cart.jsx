import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { BiLoaderAlt } from "react-icons/bi";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotal, loading } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setUpdatingItemId(itemId);
    try {
      await updateQuantity(itemId, newQuantity);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    setRemovingItemId(itemId);
    try {
      await removeFromCart(itemId);
    } finally {
      setRemovingItemId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <BiLoaderAlt className="animate-spin text-4xl text-primary-600" />
        <span className="ml-2 text-lg text-primary-600">Đang tải giỏ hàng...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-primary-800 mb-8">Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <FaShoppingCart className="mx-auto text-6xl text-gray-300 mb-4" />
          <p className="text-xl text-gray-600 mb-4">
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
                  className="flex items-center bg-white p-4 rounded-lg shadow relative"
                >
                  {(updatingItemId === item.id || removingItemId === item.id) && (
                    <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
                      <BiLoaderAlt className="animate-spin text-2xl text-primary-600" />
                    </div>
                  )}
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
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updatingItemId === item.id}
                        className="px-3 py-1 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updatingItemId === item.id}
                        className="px-3 py-1 text-primary-600 hover:bg-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      disabled={removingItemId === item.id}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaTrash />
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
                {getTotal().toLocaleString("vi-VN")}đ
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
              {isCheckout ? "Đang xử lý..." : "Tiến hành thanh toán"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
