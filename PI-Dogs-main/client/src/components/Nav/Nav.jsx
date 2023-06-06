import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Nav.module.css";

const Nav = () => {
  const location = useLocation();

  // Verifica si la ruta actual es la de aterrizaje (Landing)
  const isLanding = location.pathname === "/";

  // Mostrar el componente Nav si no es la ruta de aterrizaje (Landing)
  if (isLanding) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <div>
        <Link to="/">
          <button className={styles.link}>Landing</button>
        </Link>
        <Link to="/home">
          <button className={styles.link}>Home</button>
        </Link>
        <Link to="/form">
          <button className={styles.link}>Create a new dog</button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;