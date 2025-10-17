// Componente para la sección Favorites con tarjetas desde datos reales.
import FavoriteCard from './FavoriteCard';

function Favorites({ favorites, onUnfavorite }) {
  return (
    <div className="section">
      <div className="favorites-header">
        <h2>Favorites</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        {favorites.map((c) => (
          <FavoriteCard
            key={c.id}
            fullName={`${c.firstName} ${c.lastName}`}
            email={c.email}
            onRemove={() => onUnfavorite(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;