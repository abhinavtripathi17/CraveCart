import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { filterFoodItems } from "../../utils/menuUtils";

const FoodDisplay = ({ category }) => {
  const { food_list, searchQuery } = useContext(StoreContext);

  const filteredList = filterFoodItems(food_list, category, searchQuery);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {filteredList.length > 0 ? (
          filteredList.map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <div className="no-results">
            {searchQuery ? (
              <p>No dishes found matching &quot;{searchQuery}&quot;</p>
            ) : food_list.length === 0 ? (
              <p>No dishes available at the moment.</p>
            ) : (
              <p>No dishes available in this category.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
