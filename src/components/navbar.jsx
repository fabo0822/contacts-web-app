// Este es un componente separado para el navbar. En React, dividimos la UI en piezas pequeñas para reutilizarlas.

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo: Usamos un div simple con fondo gris para simular el logo triangular. */}
      <div className="logo">Logo</div>

      {/* Pestañas: Usamos una lista <ul> para las opciones. */}
      <ul className="tabs">
        <li>Overview</li>
        <li>Contacts</li>
        <li>Favorites</li>
      </ul>

      {/* Botón + NEW: Un botón simple con clase para estilo verde. */}
      <button className="new-button">+ NEW</button>
    </nav>
  );
}

export default Navbar;