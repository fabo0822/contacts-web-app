// Componente para una sola tarjeta de favorito. Recibe "props" (datos) como nombre y email.

function FavoriteCard(props) {
  return (
    <div className="favorite-card">
      {/* Círculo con logo: Simulamos con un div gris. */}
      <div className="card-logo">Logo</div>

      {/* Nombre y email. */}
      <p>{props.name}</p> {/* {props.name} inserta el valor dinámico. */}
      <p>{props.email}</p>

      {/* Botón X REMOVE: Rojo. */}
      <button className="remove-button">X REMOVE</button>
    </div>
  );
}

export default FavoriteCard;