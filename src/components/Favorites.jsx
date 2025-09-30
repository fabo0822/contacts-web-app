// Componente para la sección Favorites con tarjetas.
import FavoriteCard from './FavoriteCard';

function Favorites() {
  return (
    <div className="section">
      <div className="favorites-header">
        <h2>Favorites</h2>
        <div className="line"></div>
      </div>

      <div className="favorites-list">
        <FavoriteCard name="Full Name" email="email@com" />
        <FavoriteCard name="Full Name" email="email@com" />
        <FavoriteCard name="Full Name" email="email@com" />
        <FavoriteCard name="Full Name" email="email@com" />
      </div>
    </div>
  );
}


export default Favorites;