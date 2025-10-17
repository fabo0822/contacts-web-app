import FavoriteCard from './FavoriteCard';

function Contacts({ contacts, onToggleFavorite, onRemove }) {
  return (
    <div className="section">
      <div className="favorites-header">
        <h2>Contact List</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        {contacts.map((c) => (
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

export default Contacts;