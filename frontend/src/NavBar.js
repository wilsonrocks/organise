import React from 'react';
import Logo from './Logo';

function NavBar ({name, logout}) {
  return (
    <nav class="navbar is-fixed-top">
      
      <div class="navbar-brand">
        <Logo/>
        <span className="navbar-item">{name}</span>
        <span className = "navbar-item" onClick={logout}>Log Out</span>
      </div>
    </nav>
  );
}

export default NavBar;