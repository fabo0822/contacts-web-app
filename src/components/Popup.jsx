// Formulario simple para crear un contacto.
import { useState } from 'react';

function Popup({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [favorite, setFavorite] = useState(false);

  const handleSave = () => {
    if (!firstName || !lastName || !email) return onClose();
    onSave({ firstName, lastName, email, favorite });
  };

  return (
    <div className="popup">
      <h2>Add New Contact</h2>
      <input type="text" placeholder="First name" className="popup-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last name" className="popup-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" className="popup-input" value={email} onChange={(e) => setEmail(e.target.value)} />
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