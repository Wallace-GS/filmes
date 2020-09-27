import React from 'react';
import { NavDropdown } from 'react-bootstrap';

export const Menu = ({
  user,
  loginVisible,
  formVisible,
  handleSort,
  handleLoginVisible,
  handleFormVisible,
  handleLogout,
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
      <div>
        <span className="brand">filmes</span>
      </div>
      <ul>
        {!formVisible && (
          <>
            <li onClick={handleFormVisible} className="nav-links">
              Add Movie
            </li>
            <li>
              <NavDropdown title="Sort By" id="dropdown">
                <NavDropdown.Item onSelect={() => handleSort('likes')}>
                  Likes
                </NavDropdown.Item>
                <NavDropdown.Item onSelect={() => handleSort('recent')}>
                  Recent
                </NavDropdown.Item>
              </NavDropdown>
            </li>
            <li
              className="nav-links"
              onClick={handleLogout}
              style={{ color: 'red' }}
            >
              Logout
            </li>
          </>
        )}
        {formVisible && (
          <>
            <li
              className="nav-links"
              onClick={handleFormVisible}
              style={{ color: 'red', fontWeight: 'normal' }}
            >
              Cancel
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
