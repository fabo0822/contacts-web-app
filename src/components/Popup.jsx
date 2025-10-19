// Formulario simple para crear un contacto.
import { useState } from 'react';

function Popup({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageData, setImageData] = useState('');

  const handleSave = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({ firstName, lastName, email, favorite, imageUrl: imageData });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageData(String(reader.result));
    };
    reader.readAsDataURL(file); // Guardamos en base64 para uso temporal
  };

  return (
    <div className="popup">
      <h2>Add New Contact</h2>
      <input type="text" placeholder="First name" className="popup-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      {errors.firstName && <div className="error-text">{errors.firstName}</div>}
      <input type="text" placeholder="Last name" className="popup-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      {errors.lastName && <div className="error-text">{errors.lastName}</div>}
      <input type="email" placeholder="Email" className="popup-input" value={email} onChange={(e) => setEmail(e.target.value)} />
      {errors.email && <div className="error-text">{errors.email}</div>}
      <label>
        <input type="checkbox" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} /> Enable like favorite
      </label>
      <input type="file" accept="image/*" className="popup-input" onChange={handleFileChange} />
      {imageData && (
        <img src={imageData} alt="preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', display: 'block', margin: '0 auto' }} />
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button className="save-button" onClick={handleSave}>SAVE</button>
        <button className="remove-button" onClick={onClose}>CANCEL</button>
      </div>
    </div>
  );
}

export default Popup;