import React from 'react';

export const Menu = () => {
  const listHandler = () => console.log('clicked');

  return (
    <nav id="navbar">
      <span className="brand">filmes</span>
      <ul>
        <li onClick={listHandler} className="nav-links">
          Login
        </li>
      </ul>
    </nav>
  );
};
