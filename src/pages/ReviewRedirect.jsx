import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './happy.css';
import { FaHandPointDown } from "react-icons/fa";const ReviewRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [countdown, setCountdown] = useState(8);

  // Real links - replace with actual hotel IDs
  const googleLink = 'https://www.google.com/search?client=ms-android-samsung-ga-rev1&hs=r8dU&sca_esv=b74c49400e4de940&sxsrf=ANbL-n5h3Iu59qlj0amNWNvh_RkjkusLMQ:1770540817941&q=motel+munday+reviews&uds=ALYpb_mtyJ-7P3B8Ql2PDebQgmCif8_bzFd1GYvnRvsTC5YO4nmXk4j2qI7ALeBduvFTXXF-iMU9I9q4x3V14_gREEM25xmE2tmz_-VJiLreVZOLWK9PWEDrK7S7eUUXA1cTCu-nJ-IgoquKXY6bkw2djhWponyA9rMZ_gEix7OeVj3p02d4Vl9bhyIFR-Fup7UIkzi40RaFVU69csnyHub9xpvXq-2fMkkLCYqsGHGChFXRhjDPS4qIWsntt8JKzkGXxtkEZEz_QuycmIgLhYjo-Wx4vLMT8ekKSjdWGtmsYtiUgQJDwcODLHOrJEFBm5gLWAGIS2kBifVDcUrjHdJXjHfTlxpwuiW7LPf0GGVHs2wkjIsH5fR4wclV5SrfaimUfCI5c0Hg2859JA0AklHyXPIxlHAH8QEVfkdORT4IletdCd2DaGIy1BhyjfziQqeuMq3Q5HJyFlpe5lBJwSD-nVQWFoV0Sr8wK2myN2TF3m_A0QEH_1j2mtDCNQoRNaaaeEBob0MxLLD3rfxrwtBa-k9Pi8Drfg&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x8a_6uFdPJsrUmAYo69TYZivjsDvC15TA8eOW3eOWmvB41XqMN3iJuSjyylR08x3X8a7fvdoERaxhJaUa7896jnrapHU&sa=X&sqi=2&ved=2ahUKEwiSqo3EwsmSAxUnRCoJHVtGJ8IQk8gLegQIHRAB&ictx=1&biw=411&bih=775&dpr=2.63#ebo=1';
  const tripAdvisorLink = 'https://www.tripadvisor.in/Hotel_Review-g56332-d17693175-Reviews-American_Star_Inn-Munday_Texas.html';

  // Auto redirect countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 100000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoogleReview = () => {
    setSelectedPlatform('google');
    
    // Save feedback first
    saveFeedback('google');
    
    // Open Google review in new tab
    window.open(googleLink, '_blank');
    
    // Redirect to thank you page
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'review',
          message: 'Thank you for leaving a Google review! Your feedback helps other travelers.'
        }
      });
    }, 1500);
  };

  const handleTripAdvisorReview = () => {
    setSelectedPlatform('tripadvisor');
    
    // Save feedback first
    saveFeedback('tripadvisor');
    
    // Open TripAdvisor review in new tab
    window.open(tripAdvisorLink, '_blank');
    
    // Redirect to thank you page
    setTimeout(() => {
      navigate('/thank-you', { 
        state: { 
          type: 'review',
          message: 'Thank you for leaving a TripAdvisor review! Your feedback is valuable.'
        }
      });
    }, 1500);
  };

  const saveFeedback = async (platform) => {
    const feedbackData = {
      hotelName: 'Xpress Inn Marshall',
      overallRating: 'happy',
      platform: platform,
      timestamp: new Date().toISOString(),
      reviewType: 'external'
    };

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      });
      
      if (!response.ok) {
        console.error('Failed to save feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
      // Don't block the user flow if API fails
    }
  };

  const handleSkip = () => {
    navigate('/');
  };

  return (
    <div className="review-redirect-container">
      <div className="review-redirect-card">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-icon">
            <div className="checkmark">✓</div>
          </div>
          <div className="success-ripple"></div>
        </div>
        
        {/* Main Content */}
        <h2>Thank You!</h2>
        <p className="subtitle">We're thrilled you had a great stay! 🎉</p>
        
        <p className="description">
          Would you mind sharing your experience? Your review helps us improve and helps other travelers make informed decisions.
        </p>
        <p style={{fontSize:"50px",color:"#FFD700"}}><FaHandPointDown /></p>                     
        
        {/* Review Options */}
        <div className="review-options">
          <button 
            className={`review-btn google-btn ${selectedPlatform === 'google' ? 'clicked' : ''}`}
            onClick={handleGoogleReview}
            disabled={selectedPlatform !== null}
          >
            <div className="btn-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="btn-content">
              <div className="btn-title">Google Reviews</div>
              <div className="btn-subtitle">Share on Google Maps</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
          
          <button 
            className={`review-btn tripadvisor-btn ${selectedPlatform === 'tripadvisor' ? 'clicked' : ''}`}
            onClick={handleTripAdvisorReview}
            disabled={selectedPlatform !== null}
          >
            <div className="btn-icon tripadvisor-icon">
              <img 
                               style={{height:"40px", width:"40px"}}
                               src="https://cdn-icons-png.freepik.com/512/6124/6124989.png" 
                               alt="TripAdvisor" 
                           />
            </div>
            <div className="btn-content">
              <div className="btn-title">TripAdvisor</div>
              <div className="btn-subtitle">Share your experience</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
        </div>
        
        {/* Loading State */}
        {selectedPlatform && (
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Opening {selectedPlatform === 'google' ? 'Google Reviews' : 'TripAdvisor'}...</p>
          </div>
        )}
        
        {/* Action Buttons */}
       
        
        {/* Footer */}
        <div className="contact-info">
          <div>300 / 20 • +19234718277</div>
          <div>https://xpressinnmarshall.com/</div>
        </div>
        
        <div className="powered-b">
          Powered by <span className="guesttouch">American StarInn</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewRedirect;