import { useState } from 'react';
import './SupportTools.css';

const SupportTools = () => {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    {
      id: 1,
      title: "Account Recovery",
      icon: "🔄",
      description: "Recover lost or inaccessible WhatsApp account",
      steps: ["Verify phone number", "Enter backup code", "Restore chats"]
    },
    {
      id: 2,
      title: "Verification Help",
      icon: "✅",
      description: "Get help with verification code issues",
      steps: ["Check SMS delivery", "Use call verification", "Troubleshoot"]
    },
    {
      id: 3,
      title: "Chat Backup",
      icon: "💾",
      description: "Backup and restore your conversations",
      steps: ["Google Drive backup", "Local backup", "Restore process"]
    },
    {
      id: 4,
      title: "Security Check",
      icon: "🛡️",
      description: "Enhance your account security",
      steps: ["Two-step verification", "Privacy settings", "Device management"]
    }
  ];

  return (
    <div className="support-tools-container">
      <h2 className="tools-title">Available Support Tools</h2>
      <p className="tools-subtitle">Select a tool to begin recovery process</p>
      
      <div className="tools-grid">
        {tools.map(tool => (
          <div 
            key={tool.id}
            className={`tool-card ${activeTool === tool.id ? 'active' : ''}`}
            onClick={() => setActiveTool(tool.id)}
          >
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
            
            {activeTool === tool.id && (
              <div className="tool-steps">
                <h4>Steps:</h4>
                <ul>
                  {tool.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
                <button className="start-button">
                  Start Process as Saqib →
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportTools;
