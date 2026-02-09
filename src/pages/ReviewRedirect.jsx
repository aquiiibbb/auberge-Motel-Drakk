import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './happy.css';
import { FaHandPointDown } from "react-icons/fa";

const ReviewRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [countdown, setCountdown] = useState(8);

  // Real links - replace with actual hotel IDs
  const googleLink = 'Auberg Google - google.com/travel/search?g2lb=4965990,72471280,72560029,72573224,72647020,72686036,72803964,72882230,72958624,73059275,73064764,73249147,121522132&hl=en-IN&gl=in&ssta=1&q=auberge+motel+drakkar&ts=CAEaRwopEicyJTB4NGNjNjRiMGViZGNiNDE5ZDoweDM0MzBjZjlkYmI1ZGVhNmMSGhIUCgcI6g8QAhgJEgcI6g8QAhgKGAEyAhAA&qs=CAEyE0Nnb0k3TlQzMnR2enM1ZzBFQUU4AkIJCWzqXbudzzA0QgkJbOpdu53PMDQ&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:247458';
  const tripAdvisorLink = 'Auberg Trip Advisor - https://www.tripadvisor.in/Hotel_Review-g155034-d12295142-Reviews-Auberge_motel_drakkar-Shawinigan_Quebec.html';

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
          message: 'Merci d’avoir laissé un avis Google ! Vos commentaires aident les autres voyageurs.'
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
          message: 'Merci d’avoir laissé un avis sur TripAdvisor ! Vos commentaires sont précieux.'
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
        <h2>Merci !</h2>
        <p className="subtitle">Nous sommes ravis que votre séjour se soit bien passé ! 🎉</p>
        
        <p className="description">
          Pourriez-vous partager votre expérience ? Votre avis nous aide à nous améliorer et aide les autres voyageurs à prendre des décisions éclairées.
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
              <div className="btn-title">Avis Google</div>
              <div className="btn-subtitle">Partager sur Google Maps</div>
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
              <div className="btn-subtitle">Partager votre expérience</div>
            </div>
            <div className="btn-arrow">→</div>
          </button>
        </div>
        
        {/* Loading State */}
        {selectedPlatform && (
          <div className="loading-message">
            <div className="spinner"></div>
            <p>Ouverture de {selectedPlatform === 'google' ? 'Avis Google' : 'TripAdvisor'}...</p>
          </div>
        )}
        
        {/* Footer */}
        <div className="contact-info">
          <div>Québec G9N 6T5, Canada • +18193172613</div>
          <div>https://www.aubergemoteldrakkar.ca/</div>
        </div>
        
        <div className="powered-b">
          Propulsé par <span className="guesttouch">Auberge Motel Drakkar</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewRedirect;
