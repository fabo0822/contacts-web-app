// Formulario simple para crear un contacto.
import { useState } from 'react';

function Popup({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [imageData, setImageData] = useState('');

  const handleSave = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
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
      <input type="text" placeholder="Last name" className="popup-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <input type="email" placeholder="Email" className="popup-input" value={email} onChange={(e) => setEmail(e.target.value)} />
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