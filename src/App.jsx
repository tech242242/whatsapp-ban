import { useState, useEffect } from 'react';
import './App.css';

const LandingAnimation = () => {
  // ... existing landing animation code ...
};

function App() {
  // ... existing states ...

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // ... existing useEffects ...

  // PWA Install Prompt Handler
  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
      setShowInstallButton(false);
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setShowInstallButton(false);
      console.log('PWA installed successfully');
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
      window.removeEventListener('appinstalled', () => {});
    };
  }, []);

  // Handle Install Button Click
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    setDeferredPrompt(null);
    setShowInstallButton(false);
    
    if (outcome === 'accepted') {
      setIsAppInstalled(true);
      showInstallSuccessMessage();
    }
  };

  // Show Install Success Message
  const showInstallSuccessMessage = () => {
    const el = document.createElement('div');
    el.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl shadow-lg z-50 max-w-sm';
    el.innerHTML = `
      <div class="flex items-center">
        <svg class="w-6 h-6 text-green-600 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div>
          <p class="font-bold">App Installed Successfully!</p>
          <p class="text-sm mt-1">WhatsApp Support Tool is now installed on your device.</p>
        </div>
      </div>
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5000);
  };

  // Handle Share Button
  const handleShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WhatsApp Support Tool',
          text: 'Install WhatsApp Support Tool for account recovery',
          url: window.location.href,
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with others.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {showLanding && <LandingAnimation />}
      
      {/* PWA Install Button */}
      {showInstallButton && !isAppInstalled && (
        <div className="install-btn">
          <div className="bg-white rounded-xl shadow-2xl p-4 border border-green-200 max-w-xs">
            <div className="flex items-start mb-3">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-sm">Install WhatsApp Support</h3>
                <p className="text-xs text-gray-600 mt-1">Add to home screen for quick access</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all active:scale-95"
              >
                Install App
              </button>
              <button
                onClick={handleShareClick}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg text-sm transition-all active:scale-95"
              >
                Share
              </button>
            </div>
            <button
              onClick={() => setShowInstallButton(false)}
              className="text-xs text-gray-500 hover:text-gray-700 mt-3 w-full text-center"
            >
              Not now
            </button>
          </div>
        </div>
      )}

      {/* Main App Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md glass-card overflow-hidden">
          {/* WhatsApp Header with Install Indicator */}
          <div className="whatsapp-dark-green p-8 text-white text-center relative">
            {isAppInstalled && (
              <div className="absolute top-2 left-2 bg-white/20 px-2 py-1 rounded-full flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[8px]">Installed</span>
              </div>
            )}
            
            <div className="flex justify-center mb-3">
              <svg viewBox="0 0 24 24" width="50" height="50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">WhatsApp Support</h1>
            <p className="text-green-100 text-sm opacity-90">Account Management Tool</p>
            
            {/* Install Hint for First Time Users */}
            {!isAppInstalled && !showInstallButton && (
              <div className="mt-4">
                <button
                  onClick={() => setShowInstallButton(true)}
                  className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
                >
                  ⬇️ Install App
                </button>
              </div>
            )}
            
            <div className="absolute top-4 right-4 bg-white/10 px-3 py-1 rounded-full">
              <p className="text-[10px] font-mono" id="refId">{refId}</p>
            </div>
          </div>

          {/* ... باقی App کا content (بالکل ویسا ہی جیسا پہلے تھا) ... */}

        </div>
      </div>
    </div>
  );
}

export default App;
