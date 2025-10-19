function Pagination({ page, totalPages, onPrev, onNext }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end', padding: '16px 24px' }}>
      <span style={{ color: '#555', fontSize: '14px' }}>{page} de {totalPages}</span>
      <button className="save-button" onClick={onPrev} disabled={page <= 1} title="Anterior">‹</button>
      <button className="save-button" onClick={onNext} disabled={page >= totalPages} title="Siguiente">›</button>
    </div>
  );
}

export default Pagination;


