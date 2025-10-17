// Tarjeta reutilizable para mostrar un contacto sencillo.
// Props mínimas: fullName, email, onRemove (opcional), onToggleFavorite (opcional)

function FavoriteCard({ fullName, email, onRemove, onToggleFavorite }) {
  return (
    <div className="favorite-card">
      <div className="card-logo">Logo</div>

      <p>{fullName}</p>
      <p>{email}</p>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {onToggleFavorite && (
          <button className="save-button" aria-label="toggle favorite" title="Favorite" onClick={onToggleFavorite}>❤</button>
        )}
        {onRemove && (
          <button className="remove-button" aria-label="remove" title="Remove" onClick={onRemove}>🗑</button>
        )}
      </div>
    </div>
  );
}

export default FavoriteCard;