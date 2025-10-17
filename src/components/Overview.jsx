import FavoriteCard from './FavoriteCard';

function Overview({ favorites, contactList, onToggleFavorite, onRemove }) {
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
            onToggleFavorite={() => onToggleFavorite(c.id)}
            onRemove={() => onRemove(c.id)}
          />
        ))}
      </div>

      <div className="favorites-header" style={{ marginTop: '32px' }}>
        <h2>Contact List</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        {contactList.map((c) => (
          <FavoriteCard
            key={c.id}
            fullName={`${c.firstName} ${c.lastName}`}
            email={c.email}
            onToggleFavorite={() => onToggleFavorite(c.id)}
            onRemove={() => onRemove(c.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Overview;