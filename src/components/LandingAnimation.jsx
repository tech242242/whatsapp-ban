import { useEffect, useState } from 'react';
import './LandingAnimation.css';

const LandingAnimation = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="landing-overlay">
      <div className="whatsapp-loader">
        <div className="whatsapp-icon">
          <div className="phone"></div>
          <div className="speaker"></div>
          <div className="camera"></div>
        </div>
        <div className="loading-text">
          <h2>WhatsApp Support</h2>
          <p>Welcome, Saqib! Initializing recovery tool...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingAnimation;
