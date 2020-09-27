import React from 'react';

export const Menu = ({
  user,
  loginVisible,
  handleLoginVisible,
  handleFormVisible,
}) => {
  if (!user) {
    return (
      <nav id="navbar">
        <span className="brand">filmes</span>
        <ul>
          <li onClick={handleLoginVisible} className="nav-links">
            {!loginVisible && 'Login'}
            {loginVisible && (
              <span style={{ color: 'red', fontWeight: 'normal' }}>Cancel</span>
            )}
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav id="navbar">
      <span className="brand">filmes</span>
      <ul>
        <li onClick={handleFormVisible} className="nav-links">
          Logout
        </li>
      </ul>
    </nav>
  );
};
