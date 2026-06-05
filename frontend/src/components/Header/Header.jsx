import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <span className="promo-badge">🔥 Free delivery on your first 3 orders!</span>
        <h2>Elevate Your Dining Experience</h2>
        <p>
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and master-class culinary expertise.
          Our mission is to satisfy your cravings and elevate your dining
          experience, one delicious meal at a time.
        </p>
        <button onClick={() => document.getElementById('explore-menu')?.scrollIntoView({ behavior: 'smooth' })}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
