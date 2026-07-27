import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./Verify.css";

const Verify = () => {
  const { url, token, clearCart, setToken } = useContext(StoreContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const authToken = token || localStorage.getItem("token");

      if (hasVerified.current || !authToken) {
        return;
      }

      hasVerified.current = true;
      const success = searchParams.get("success");
      const orderId = searchParams.get("orderId");
      const sessionId = searchParams.get("session_id");

      if (!orderId) {
        toast.error("Missing order details");
        navigate("/cart");
        return;
      }

      try {
        const response = await axios.post(
          url + "/api/order/verify",
          { success, orderId, session_id: sessionId },
          { headers: { token: authToken } }
        );

        if (response.data.success) {
          clearCart();
          toast.success(response.data.message || "Payment successful");
          navigate("/myorders");
        } else {
          setMessage(response.data.message || "Payment was not completed");
          toast.error(response.data.message || "Payment was not completed");
          navigate("/cart");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Unable to verify payment";
        setMessage(errorMessage);
        toast.error(errorMessage);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          setToken("");
        }
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [clearCart, navigate, searchParams, setToken, token, url]);

  return (
    <div className="verify">
      <div className="verify-spinner" />
      <p>{message}</p>
    </div>
  );
};

export default Verify;
