import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const getFrontendUrl = (req) =>
  process.env.FRONTEND_URL || req.get("origin") || "http://localhost:5173";

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
    const paymentMethod =
      req.body.paymentMethod === "Stripe" ? "Stripe" : "Cash on Delivery";

    const newOrder = new orderModel({
      userId: req.body.userId,
      items: orderItems,
      amount: itemsTotal + deliveryFee,
      address: req.body.address,
      payment: false,
      paymentMethod,
    });
    await newOrder.save();

    if (paymentMethod === "Stripe") {
      if (!stripe) {
        await orderModel.findByIdAndDelete(newOrder._id);
        return res.json({
          success: false,
          message: "Stripe is not configured on the server",
        });
      }

      const frontendUrl = getFrontendUrl(req);
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          ...orderItems.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 100),
            },
            quantity: item.quantity,
          })),
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "Delivery Fee",
              },
              unit_amount: Math.round(deliveryFee * 100),
            },
            quantity: 1,
          },
        ],
        success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        metadata: {
          orderId: newOrder._id.toString(),
          userId: req.body.userId,
        },
      });

      newOrder.stripeSessionId = session.id;
      await newOrder.save();

      return res.json({
        success: true,
        session_url: session.url,
      });
    }

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

// verify Stripe payment after checkout redirect
const verifyOrder = async (req, res) => {
  try {
    const { orderId, success, session_id } = req.body;

    const order = await orderModel.findOne({
      _id: orderId,
      userId: req.body.userId,
    });

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    if (success !== "true") {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment cancelled" });
    }

    if (!stripe) {
      return res.json({
        success: false,
        message: "Stripe is not configured on the server",
      });
    }

    if (!session_id || session_id !== order.stripeSessionId) {
      return res.json({ success: false, message: "Invalid payment session" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false, message: "Payment not completed" });
    }

    order.payment = true;
    order.paymentMethod = "Stripe";
    await order.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.log("Verify order error:", error);
    res.json({
      success: false,
      message: error.message || "Unable to verify payment",
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

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
