import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    const orderItems = Array.isArray(req.body.items)
      ? req.body.items
          .filter((item) => item && item.name && Number(item.quantity) > 0)
          .map((item) => ({
            _id: item._id,
            name: item.name,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity),
            image: item.image,
            category: item.category,
          }))
      : [];

    if (!orderItems.length) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    const itemsTotal = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const deliveryFee = itemsTotal > 0 ? 2 : 0;

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: orderItems,
      amount: itemsTotal + deliveryFee,
      address: req.body.address,
      payment: false,
      paymentMethod: "Cash on Delivery",
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully. Pay with cash on delivery.",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.log("Place order error:", error);
    res.json({
      success: false,
      message: error.message || "Unable to place order",
    });
  }
};

// user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Listing orders for admin pannel
const listOrders = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const orders = await orderModel.find({});
      res.json({ success: true, data: orders });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// api for updating status
const updateStatus = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await orderModel.findByIdAndUpdate(req.body.orderId, {
        status: req.body.status,
      });
      res.json({ success: true, message: "Status Updated Successfully" });
    }else{
      res.json({ success: false, message: "You are not an admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrders, listOrders, updateStatus };
