// Tarjeta reutilizable para mostrar un contacto sencillo.
// Props mínimas: fullName, email, onRemove (opcional), onToggleFavorite (opcional)

import logoImage from '../assets/logo.png';

function FavoriteCard({ fullName, email, onRemove, onToggleFavorite, removeText, imageUrl }) {
  return (
    <div className="favorite-card">
      <div className="card-logo" style={{ overflow: 'hidden' }}>
        <img src={imageUrl || logoImage} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      </div>

      <p>{fullName}</p>
      <p>{email}</p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {onToggleFavorite && (
          <button className="save-button" aria-label="toggle favorite" title="Favorite" onClick={onToggleFavorite}>❤</button>
        )}
        {onRemove && (
          <button className="remove-button" aria-label="remove" title="Remove" onClick={onRemove}>
            {removeText ? 'X REMOVE' : '🗑'}
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoriteCard;