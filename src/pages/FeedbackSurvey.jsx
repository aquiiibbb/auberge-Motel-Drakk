import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './about.css';
import imf from "../assest/lg.jpeg"

const FeedbackSurvey = () => {
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();

  // ✅ Cleaned Google Review link (removed leading space)
  const googleReviewLink =
    'Auberg Google - google.com/travel/search?g2lb=4965990,72471280,72560029,72573224,72647020,72686036,72803964,72882230,72958624,73059275,73064764,73249147,121522132&hl=en-IN&gl=in&ssta=1&q=auberge+motel+drakkar&ts=CAEaRwopEicyJTB4NGNjNjRiMGViZGNiNDE5ZDoweDM0MzBjZjlkYmI1ZGVhNmMSGhIUCgcI6g8QAhgJEgcI6g8QAhgKGAEyAhAA&qs=CAEyE0Nnb0k3TlQzMnR2enM1ZzBFQUU4AkIJCWzqXbudzzA0QgkJbOpdu53PMDQ&ap=ugEHcmV2aWV3cw&ictx=111&ved=1t:247458';

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
            style={{ height: "190px", width: "210px", paddingTop: "5px" }}
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
