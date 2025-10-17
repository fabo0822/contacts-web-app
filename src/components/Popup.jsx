// Formulario simple para crear un contacto.
import { useState } from 'react';

function Popup({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({ firstName, lastName, email, favorite });
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
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button className="save-button" onClick={handleSave}>SAVE</button>
        <button className="remove-button" onClick={onClose}>CANCEL</button>
      </div>
    </div>
  );
}

export default Popup;