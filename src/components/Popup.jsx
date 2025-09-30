// Este componente muestra un popup con un formulario para agregar un nuevo contacto.
// Recibe props para controlar si se muestra y cerrar el popup.

function Popup({ isOpen, onClose }) {
  if (!isOpen) return null; // Si no está abierto, no renderizamos nada.

  return (
    <div className="popup">
      <h2>Add New Contact</h2>
      <input type="text" placeholder="First name" className="popup-input" />
      <input type="text" placeholder="Last name" className="popup-input" />
      <input type="email" placeholder="Email" className="popup-input" />
      <label>
        <input type="checkbox" /> Enable like favorite
      </label>
      <button className="save-button" onClick={onClose}>SAVE</button>
    </div>
  );
}

export default Popup;