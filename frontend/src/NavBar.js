import React from 'react';
import Logo from './Logo';

function NavBar ({name, logout}) {
  return (
    <nav className="navbar is-fixed-top">
      
      <div className="navbar-brand">
        <Logo/>
        <span className="navbar-item">{name}</span>
        <a className = "navbar-item" onClick={logout}>Log Out</a>
      </div>
    </nav>
  );
}

export default NavBar;