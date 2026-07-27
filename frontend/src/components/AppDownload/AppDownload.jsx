import React from 'react'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <div className='app-download-content'>
        <h2>Ready to satisfy your cravings?</h2>
        <p>Join thousands of happy customers enjoying fast, delicious delivery with <span>CraveCart</span></p>
        <div className="app-download-features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <p>Super Fast</p>
          </div>
          <div className="feature">
            <span className="feature-icon">🍕</span>
            <p>Fresh Meals</p>
          </div>
          <div className="feature">
            <span className="feature-icon">✨</span>
            <p>Great Taste</p>
          </div>
        </div>
        <button className="cta-button">Order Now</button>
      </div>
    </div>
  )
}

export default AppDownload
