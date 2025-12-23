import { motion } from 'framer-motion';
import './WelcomeSaqib.css';

const WelcomeSaqib = () => {
  return (
    <motion.div 
      className="welcome-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="profile-section">
        <div className="profile-avatar">
          <span className="avatar-text">S</span>
        </div>
        <div className="profile-info">
          <h1 className="welcome-title">
            Welcome back, <span className="highlight">Saqib</span>!
          </h1>
          <p className="welcome-subtitle">
            Your WhatsApp account recovery session is ready
          </p>
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Last Login</h3>
            <p>Today, 2:30 PM</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🛡️</div>
          <div className="stat-content">
            <h3>Account Status</h3>
            <p className="status-active">Active & Secure</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeSaqib;
