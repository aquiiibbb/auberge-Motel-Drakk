import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateFeedback = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    feedback: '',
    rating: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRating = (star) => {
    setFormData(prev => ({
      ...prev,
      rating: star
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      alert('Veuillez entrer votre nom');
      return;
    }
    if (!formData.email.trim()) {
      alert('Veuillez entrer votre email');
      return;
    }
    if (!formData.contact.trim()) {
      alert('Veuillez entrer votre numéro de contact');
      return;
    }
    if (!formData.message.trim() && !formData.feedback.trim()) {
      alert('Veuillez entrer votre message ou vos commentaires');
      return;
    }

    // Here you can save to database
    console.log('Form Data:', formData);
    
    alert('Merci pour votre retour ! Nous travaillerons à l’amélioration.');
    navigate('/');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        
        {/* Sad Icon */}
        <div style={{
          textAlign: 'center',
          fontSize: '60px',
          marginBottom: '20px'
        }}>
          😔
        </div>

        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '10px' }}>
          Nous sommes désolés de l’apprendre !
        </h2>
        
        <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '30px' }}>
          Vos commentaires nous aident à nous améliorer. Veuillez nous dire ce qui n’a pas fonctionné.
        </p>

        {/* Name Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Nom *
          </label>
          <input 
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Entrez votre nom"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Entrez votre email"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Contact No Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Numéro de contact *
          </label>
          <input 
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Entrez votre numéro de contact"
            style={{
              width: '100%',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Message Textarea */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
            Message *
          </label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Veuillez décrire votre expérience..."
            style={{
              width: '100%',
              height: '100px',
              padding: '10px',
              border: '2px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '15px',
            background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            color: 'white',
            border: 'none',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            transition: 'transform 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
        >
          Envoyer
        </button>

        <div style={{ 
          textAlign: 'center', 
          fontSize: '12px', 
          color: '#27ae60',
          background: '#d5f4e6',
          padding: '10px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          🔒 Vos commentaires sont privés et ne seront visibles que par notre équipe de gestion.
        </div>

        <div style={{ textAlign: 'center', fontSize: '12px' }}>
          Propulsé par <span style={{ color: '#e74c3c' }}>Auberge Motel Drakkar</span>
        </div>
      </div>
    </div>
  );
};

export default PrivateFeedback;
