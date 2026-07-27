import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

const foodModel = mongoose.model("food", foodSchema);

const seedFoods = async () => {
  try {
    // Try multiple connection strings
    const connectionStrings = [
      "mongodb://localhost:27017/food_delivery",
      "mongodb+srv://cluster0.mongodb.net/food_delivery",
    ];

    let connected = false;
    for (const connStr of connectionStrings) {
      try {
        await mongoose.connect(connStr);
        connected = true;
        console.log("✅ Connected to MongoDB");
        break;
      } catch (e) {
        continue;
      }
    }

    if (!connected && process.env.MONGO_URL) {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("✅ Connected via MONGO_URL");
    } else if (!connected) {
      throw new Error("Could not connect to MongoDB");
    }

    // Clear existing foods
    await foodModel.deleteMany({});
    console.log("🗑️  Cleared existing foods");

    // Sample food items
    const foods = [
      { name: "Greek salad", description: "Fresh and crisp Mediterranean salad with feta cheese", price: 12, category: "Salad", image: "food_1.png" },
      { name: "Veg salad", description: "Healthy mixed vegetable salad with light dressing", price: 18, category: "Salad", image: "food_2.png" },
      { name: "Clover Salad", description: "Fresh clover salad with seasonal vegetables", price: 16, category: "Salad", image: "food_3.png" },
      { name: "Chicken Salad", description: "Grilled chicken with fresh greens and vinaigrette", price: 24, category: "Salad", image: "food_4.png" },
      { name: "Lasagna Rolls", description: "Delicious pasta rolls with cheese and sauce", price: 14, category: "Rolls", image: "food_5.png" },
      { name: "Peri Peri Rolls", description: "Spicy peri peri flavored crispy rolls", price: 12, category: "Rolls", image: "food_6.png" },
      { name: "Chicken Rolls", description: "Tender chicken wrapped in crispy rolls", price: 20, category: "Rolls", image: "food_7.png" },
      { name: "Veg Rolls", description: "Vegetarian rolls stuffed with fresh vegetables", price: 15, category: "Rolls", image: "food_8.png" },
      { name: "Ripple Ice Cream", description: "Creamy ice cream with ripple chocolate swirls", price: 14, category: "Deserts", image: "food_9.png" },
      { name: "Fruit Ice Cream", description: "Refreshing ice cream with fresh fruit", price: 22, category: "Deserts", image: "food_10.png" },
      { name: "Jar Ice Cream", description: "Layered ice cream served in a jar", price: 10, category: "Deserts", image: "food_11.png" },
      { name: "Vanilla Ice Cream", description: "Classic vanilla ice cream", price: 12, category: "Deserts", image: "food_12.png" },
      { name: "Chicken Sandwich", description: "Grilled chicken sandwich with fresh vegetables", price: 12, category: "Sandwich", image: "food_13.png" },
      { name: "Vegan Sandwich", description: "Plant-based sandwich with avocado and greens", price: 18, category: "Sandwich", image: "food_14.png" },
      { name: "Grilled Sandwich", description: "Perfectly grilled sandwich with melted cheese", price: 16, category: "Sandwich", image: "food_15.png" },
      { name: "Bread Sandwich", description: "Classic bread sandwich with premium fillings", price: 24, category: "Sandwich", image: "food_16.png" },
      { name: "Cup Cake", description: "Delicious cup cake with frosting", price: 14, category: "Cake", image: "food_17.png" },
      { name: "Vegan Cake", description: "Plant-based cake made with love", price: 12, category: "Cake", image: "food_18.png" },
      { name: "Butterscotch Cake", description: "Rich butterscotch flavored cake", price: 20, category: "Cake", image: "food_19.png" },
      { name: "Sliced Cake", description: "Fresh sliced cake with premium toppings", price: 15, category: "Cake", image: "food_20.png" },
      { name: "Garlic Mushroom", description: "Sautéed garlic mushrooms with herbs", price: 14, category: "Pure Veg", image: "food_21.png" },
      { name: "Fried Cauliflower", description: "Crispy fried cauliflower with spices", price: 22, category: "Pure Veg", image: "food_22.png" },
      { name: "Mix Veg Pulao", description: "Fragrant rice with mixed vegetables", price: 10, category: "Pure Veg", image: "food_23.png" },
      { name: "Rice Zucchini", description: "Rice with fresh zucchini and seasonings", price: 12, category: "Pure Veg", image: "food_24.png" },
      { name: "Cheese Pasta", description: "Creamy pasta with melted cheese", price: 12, category: "Pasta", image: "food_25.png" },
      { name: "Tomato Pasta", description: "Fresh tomato pasta with basil", price: 18, category: "Pasta", image: "food_26.png" },
      { name: "Creamy Pasta", description: "Smooth and creamy pasta sauce", price: 16, category: "Pasta", image: "food_27.png" },
      { name: "Chicken Pasta", description: "Tender chicken with pasta", price: 24, category: "Pasta", image: "food_28.png" },
      { name: "Butter Noodles", description: "Noodles coated with rich butter", price: 14, category: "Noodles", image: "food_29.png" },
      { name: "Veg Noodles", description: "Vegetable noodles with fresh toppings", price: 12, category: "Noodles", image: "food_30.png" },
      { name: "Somen Noodles", description: "Traditional Japanese somen noodles", price: 20, category: "Noodles", image: "food_31.png" },
      { name: "Cooked Noodles", description: "Perfectly cooked noodles with sauce", price: 15, category: "Noodles", image: "food_32.png" }
    ];

    const result = await foodModel.insertMany(foods);
    console.log(`✅ Successfully added ${result.length} food items!`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedFoods();
