import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = window.location.hostname === "localhost" ? "http://localhost:4000" : "https://food-delivery-app-uquc.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const response=await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Added to Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      const response= await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if(response.data.success){
        toast.success("item Removed from Cart")
      }else{
        toast.error("Something went wrong")
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = useCallback(async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      let foods = response.data.data;
      
      // If no foods from backend, use mock data
      if (!foods || foods.length === 0) {
        foods = [
          {_id: "1", name: "Greek salad", description: "Fresh and crisp Mediterranean salad with feta cheese", price: 12, category: "Salad", image: "food_1.png"},
          {_id: "2", name: "Veg salad", description: "Healthy mixed vegetable salad with light dressing", price: 18, category: "Salad", image: "food_2.png"},
          {_id: "3", name: "Clover Salad", description: "Fresh clover salad with seasonal vegetables", price: 16, category: "Salad", image: "food_3.png"},
          {_id: "4", name: "Chicken Salad", description: "Grilled chicken with fresh greens and vinaigrette", price: 24, category: "Salad", image: "food_4.png"},
          {_id: "5", name: "Lasagna Rolls", description: "Delicious pasta rolls with cheese and sauce", price: 14, category: "Rolls", image: "food_5.png"},
          {_id: "6", name: "Peri Peri Rolls", description: "Spicy peri peri flavored crispy rolls", price: 12, category: "Rolls", image: "food_6.png"},
          {_id: "7", name: "Chicken Rolls", description: "Tender chicken wrapped in crispy rolls", price: 20, category: "Rolls", image: "food_7.png"},
          {_id: "8", name: "Veg Rolls", description: "Vegetarian rolls stuffed with fresh vegetables", price: 15, category: "Rolls", image: "food_8.png"},
          {_id: "9", name: "Ripple Ice Cream", description: "Creamy ice cream with ripple chocolate swirls", price: 14, category: "Deserts", image: "food_9.png"},
          {_id: "10", name: "Fruit Ice Cream", description: "Refreshing ice cream with fresh fruit", price: 22, category: "Deserts", image: "food_10.png"},
          {_id: "11", name: "Jar Ice Cream", description: "Layered ice cream served in a jar", price: 10, category: "Deserts", image: "food_11.png"},
          {_id: "12", name: "Vanilla Ice Cream", description: "Classic vanilla ice cream", price: 12, category: "Deserts", image: "food_12.png"},
          {_id: "13", name: "Chicken Sandwich", description: "Grilled chicken sandwich with fresh vegetables", price: 12, category: "Sandwich", image: "food_13.png"},
          {_id: "14", name: "Vegan Sandwich", description: "Plant-based sandwich with avocado and greens", price: 18, category: "Sandwich", image: "food_14.png"},
          {_id: "15", name: "Grilled Sandwich", description: "Perfectly grilled sandwich with melted cheese", price: 16, category: "Sandwich", image: "food_15.png"},
          {_id: "16", name: "Bread Sandwich", description: "Classic bread sandwich with premium fillings", price: 24, category: "Sandwich", image: "food_16.png"},
          {_id: "17", name: "Cup Cake", description: "Delicious cup cake with frosting", price: 14, category: "Cake", image: "food_17.png"},
          {_id: "18", name: "Vegan Cake", description: "Plant-based cake made with love", price: 12, category: "Cake", image: "food_18.png"},
          {_id: "19", name: "Butterscotch Cake", description: "Rich butterscotch flavored cake", price: 20, category: "Cake", image: "food_19.png"},
          {_id: "20", name: "Sliced Cake", description: "Fresh sliced cake with premium toppings", price: 15, category: "Cake", image: "food_20.png"},
          {_id: "21", name: "Garlic Mushroom", description: "Sautéed garlic mushrooms with herbs", price: 14, category: "Pure Veg", image: "food_21.png"},
          {_id: "22", name: "Fried Cauliflower", description: "Crispy fried cauliflower with spices", price: 22, category: "Pure Veg", image: "food_22.png"},
          {_id: "23", name: "Mix Veg Pulao", description: "Fragrant rice with mixed vegetables", price: 10, category: "Pure Veg", image: "food_23.png"},
          {_id: "24", name: "Rice Zucchini", description: "Rice with fresh zucchini and seasonings", price: 12, category: "Pure Veg", image: "food_24.png"},
          {_id: "25", name: "Cheese Pasta", description: "Creamy pasta with melted cheese", price: 12, category: "Pasta", image: "food_25.png"},
          {_id: "26", name: "Tomato Pasta", description: "Fresh tomato pasta with basil", price: 18, category: "Pasta", image: "food_26.png"},
          {_id: "27", name: "Creamy Pasta", description: "Smooth and creamy pasta sauce", price: 16, category: "Pasta", image: "food_27.png"},
          {_id: "28", name: "Chicken Pasta", description: "Tender chicken with pasta", price: 24, category: "Pasta", image: "food_28.png"},
          {_id: "29", name: "Butter Noodles", description: "Noodles coated with rich butter", price: 14, category: "Noodles", image: "food_29.png"},
          {_id: "30", name: "Veg Noodles", description: "Vegetable noodles with fresh toppings", price: 12, category: "Noodles", image: "food_30.png"},
          {_id: "31", name: "Somen Noodles", description: "Traditional Japanese somen noodles", price: 20, category: "Noodles", image: "food_31.png"},
          {_id: "32", name: "Cooked Noodles", description: "Perfectly cooked noodles with sauce", price: 15, category: "Noodles", image: "food_32.png"}
        ];
      }
      
      setFoodList(foods);
    } else {
      alert("Error! Products are not fetching..");
    }
  }, [url]);

  const loadCardData = useCallback(async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  }, [url]);

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList, loadCardData]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    searchQuery,
    setSearchQuery,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
