import { useState, useMemo } from 'react';
import FavoriteCard from './FavoriteCard';
import Pagination from './Pagination';

function Contacts({ contacts, onToggleFavorite, onRemove }) {
  const pageSize = 16;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(contacts.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return contacts.slice(start, start + pageSize);
  }, [contacts, page]);

  return (
    <div className="section">
      <div className="favorites-header">
        <h2>Contact List</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        {pageItems.map((c) => (
          <FavoriteCard
            key={c.id}
            fullName={`${c.firstName} ${c.lastName}`}
            email={c.email}
            imageUrl={c.imageUrl}
            onToggleFavorite={() => onToggleFavorite(c.id)}
            onRemove={() => onRemove(c.id)}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </div>
  );
}

export default Contacts;