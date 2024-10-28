import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ฟังก์ชันสำหรับจัดการข้อผิดพลาดจาก API
  const handleApiError = (error) => {
    setError(error.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
  };

  // ฟังก์ชันดึงรายการอาหาร
  const fetchFoodList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // ฟังก์ชันเพิ่มรายการลงในตะกร้า
  const addToCart = useCallback(
    async (itemId) => {
      setCartItem((prev) => {
        const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
        if (token) {
          axios
            .post(`${url}/api/cart/add`, { itemId }, { headers: { token } })
            .catch(handleApiError);
        }
        return updatedCart;
      });
    },
    [url, token]
  );

  // ฟังก์ชันลบรายการออกจากตะกร้า
  const removeFromCart = useCallback(
    async (itemId) => {
      setCartItem((prev) => {
        const updatedCart = { ...prev, [itemId]: (prev[itemId] || 0) - 1 };
        if (token) {
          axios
            .post(`${url}/api/cart/remove`, { itemId }, { headers: { token } })
            .catch(handleApiError);
        }
        return updatedCart;
      });
    },
    [url, token]
  );

  // ฟังก์ชันคำนวณยอดรวมในตะกร้า
  const getTotalCartAmount = useCallback(() => {
    return Object.entries(cartItem).reduce((total, [item, quantity]) => {
      if (quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        total += itemInfo ? itemInfo.price * quantity : 0;
      }
      return total;
    }, 0);
  }, [cartItem, food_list]);

  // ฟังก์ชันโหลดข้อมูลตะกร้าจากเซิร์ฟเวอร์
  const loadCartData = useCallback(
    async (token) => {
      try {
        const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          { headers: { token } }
        );
        setCartItem(response.data.cartData);
      } catch (error) {
        handleApiError(error);
      }
    },
    [url]
  );

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    };
    loadData();
  }, [fetchFoodList, loadCartData]);

  // ค่าที่ส่งให้ context
  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loading,
    error,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
