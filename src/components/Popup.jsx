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
    // Validaciones
    if (!firstName.trim()) {
      alert('El nombre es requerido');
      return;
    }
    if (!lastName.trim()) {
      alert('El apellido es requerido');
      return;
    }
    if (!email.trim()) {
      alert('El email es requerido');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Por favor ingresa un email válido');
      return;
    }
    if (firstName.trim().length < 2) {
      alert('El nombre debe tener al menos 2 caracteres');
      return;
    }
    if (lastName.trim().length < 2) {
      alert('El apellido debe tener al menos 2 caracteres');
      return;
    }
    
    const contactData = { 
      firstName: firstName.trim(), 
      lastName: lastName.trim(), 
      email: email.trim(), 
      favorite, 
      imageUrl: imageData || null // Usar la imagen seleccionada o null si no hay imagen
    };
    
    console.log('Datos del contacto a guardar:', contactData); // Debug
    console.log('Estado de favorito:', favorite, 'Tipo:', typeof favorite); // Debug
    console.log('Imagen seleccionada:', imageData ? 'Sí' : 'No'); // Debug
    console.log('Longitud de imagen:', imageData ? imageData.length : 0); // Debug
    console.log('Es base64:', imageData ? imageData.startsWith('data:image/') : false); // Debug
    
    onSave(contactData);
    
    // Limpiar el formulario después de guardar
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
    reader.readAsDataURL(file); // Guardamos en base64 para uso temporal
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