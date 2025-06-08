import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CartContext = createContext();
const API_URL = "http://localhost:5000/api/cart";

// Helper function to transform cart items from API to frontend format
const transformCartItems = (apiResponse) => {
  if (!apiResponse || !apiResponse.items) return [];
  
  return apiResponse.items.map(item => ({
    id: item.product._id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.image,
    quantity: item.quantity
  }));
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart data khikhi component mounts
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URL, config);

      const transformedItems = transformCartItems(response.data);
      setCartItems(transformedItems);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
      setLoading(false);
      toast.error("Failed to fetch cart items");
    }
  };

  const addToCart = async (product) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      

      const productId = product._id || product.id;
      
      if (!productId) {
        console.error("No product ID found:", product);
        toast.error("Invalid product data");
        return;
      }

      const response = await axios.post(API_URL, {
        productId: productId,
        quantity: 1
      }, config);

      // Transform the API response to match frontend format
      const transformedItems = transformCartItems(response.data);
      setCartItems(transformedItems);
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add product to cart");
      }
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to remove items from cart");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(`${API_URL}/item/${productId}`, config);
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove product from cart");
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to update cart");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      const response = await axios.put(API_URL, {
        productId,
        quantity
      }, config);

      // Transform the API response to match frontend format
      const transformedItems = transformCartItems(response.data);
      setCartItems(transformedItems);
      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to clear cart");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      
      await axios.delete(API_URL, config);
      setCartItems([]);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotal,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
