import { useState } from 'react';

function Popup({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [imageData, setImageData] = useState('');

  const handleSave = () => {
    if (!firstName.trim()) {
      alert('First name is required');
      return;
    }
    if (!lastName.trim()) {
      alert('Last name is required');
      return;
    }
    if (!email.trim()) {
      alert('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email');
      return;
    }
    if (firstName.trim().length < 2) {
      alert('First name must be at least 2 characters');
      return;
    }
    if (lastName.trim().length < 2) {
      alert('Last name must be at least 2 characters');
      return;
    }
    
    const contactData = { 
      firstName: firstName.trim(), 
      lastName: lastName.trim(), 
      email: email.trim(), 
      favorite, 
      imageUrl: imageData || null
    };
    
    onSave(contactData);
    
    // Clear form after save
    setFirstName('');
    setLastName('');
    setEmail('');
    setFavorite(false);
    setImageData('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="popup">
      <h2>Add New Contact</h2>
      <input type="text" placeholder="First name" className="popup-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last name" className="popup-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" className="popup-input" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="file" accept="image/*" className="popup-input" onChange={handleFileChange} />
      {imageData && (
        <img src={imageData} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', display: 'block', margin: '0 auto' }} />
      )}
      <div className="popup-checkbox">
        <label>Enable like favorite</label>
        <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} />
      </div>
      <div className="popup-save-container">
        <button className="save-button" onClick={handleSave}>SAVE</button>
      </div>
    </div>
  );
}

export default Popup;