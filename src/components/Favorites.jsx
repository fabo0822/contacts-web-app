// Componente para la sección Favorites con tarjetas desde datos reales.
import { useMemo, useState } from 'react';
import FavoriteCard from './FavoriteCard';
import Pagination from './Pagination';

function Favorites({ favorites, onUnfavorite }) {
  const pageSize = 16;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(favorites.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return favorites.slice(start, start + pageSize);
  }, [favorites, page]);
  return (
    <div className="section">
      <div className="favorites-header">
        <h2>Favorites</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        {pageItems.map((c) => (
          <FavoriteCard
            key={c.id}
            fullName={`${c.firstName} ${c.lastName}`}
            email={c.email}
            imageUrl={c.imageUrl}
            onRemove={() => onUnfavorite(c.id)}
            showRemoveText
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

export default Favorites;