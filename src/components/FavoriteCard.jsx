// Tarjeta reutilizable para mostrar un contacto sencillo.
// Props mínimas: fullName, email, onRemove (opcional), onToggleFavorite (opcional)

import logoImage from '../assets/logo.png';

function FavoriteCard({ fullName, email, onRemove, onToggleFavorite, imageUrl, isFavorite, showRemoveText }) {
  return (
    <div className="favorite-card">
      <div className="card-logo">
        <img src={imageUrl || logoImage} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
      </div>

      <p>{fullName}</p>
      <p>{email}</p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {onToggleFavorite && (
          <button
            className={isFavorite ? 'remove-button remove-button--plain' : 'heart-button'}
            onClick={onToggleFavorite}
          >
            {isFavorite ? '✕' : '❤'}
          </button>
        )}
        {onRemove && (
          <button 
            className={showRemoveText ? 'remove-button remove-button--plain' : 'remove-button'} 
            onClick={onRemove}
          >
            {showRemoveText ? 'X REMOVE' : '🗑'}
          </button>
        )}
      </div>
    </div>
  );
}

export default FavoriteCard;