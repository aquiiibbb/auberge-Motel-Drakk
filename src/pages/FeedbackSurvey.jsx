import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';
import imf from "../assest/lg.jpeg"

const FeedbackSurvey = () => {
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  // ✅ Cleaned Google Review link (removed leading space)
  const googleReviewLink =
    'https://g.page/r/CWzqXbudzzA0EBM/review';

  const tripAdvisorLink =
    'https://www.tripadvisor.in/Hotel_Review-g155034-d12295142-Reviews-Auberge_motel_drakkar-Shawinigan_Quebec.html';

  const handleRating = (value) => {
    setRating(value);

    setTimeout(() => {
      if (value === 'happy') {
        navigate('/ReviewRedirect', {
          state: {
            googleLink: googleReviewLink,
            tripAdvisorLink: tripAdvisorLink,
          },
        });
      } else {
        navigate('/PrivateFeedback');
      }
    }, 800);
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <div className="logo-section">
          <img
            src={imf}
            alt="Logo Xpress Inn"
          style={{height:"200px", width:"205px",paddingTop:"5px"}}

          />
        </div>

        <h2 className="hotel-name">Auberge Motel Drakkar</h2>
        <h3 className="question">Comment s'est passé votre séjour ?</h3>

        <div className="rating-section">
          <button
            type="button"
            aria-label="Great experience"
            className={`emoji-btn ${rating === 'happy' ? 'selected' : ''}`}
            onClick={() => handleRating('happy')}
          >
            <div className="emoji-circle happy-circle">
              <span className="emoji">😊</span>
            </div>
            <span className="emoji-label">Super !</span>
          </button>

          <button
            type="button"
            aria-label="Not good experience"
            className={`emoji-btn ${rating === 'sad' ? 'selected' : ''}`}
            onClick={() => handleRating('sad')}
          >
            <div className="emoji-circle sad-circle">
              <span className="emoji">😞</span>
            </div>
            <span className="emoji-label">Pas bon</span>
          </button>
        </div>

        {rating && (
          <div className="loading-message">
            <div className="spinner" />
            <p>Merci pour votre retour...</p>
          </div>
        )}

        <p className="appreciation-text">
          Nous apprécions votre visite. Nous aimerions savoir ce que vous pensez de votre séjour récent.
        </p>

        <div className="contact-info">
          <div>4500 Boulevard de Shawinigan-Sud, Shawinigan-Sud, Québec G9N 6T5, Canada</div>
          <div>+1 819-536-2664 </div>
          <div>https://www.aubergemoteldrakkar.ca/</div>
        </div>

        <div className="powered-by">
          Propulsé par <span className="guesttouch">Auberge Motel Drakkar</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSurvey;
