import React from 'react';
// import { NavDropdown } from 'react-bootstrap';

export const Menu = ({
  user,
  loginVisible,
  formVisible,
  submissionsVisible,
  registerVisible,
  // handleSort,
  handleLoginVisible,
  handleFormVisible,
  handleRegisterVisible,
  handleSubmissionsVisible,
  handleLogout,
}) => {
  if (!user) {
    return (
      <nav id="navbar">
        <span className="brand">filmes | (demo)</span>
        <ul>
          {!loginVisible && !registerVisible && (
            <>
              <li onClick={handleLoginVisible} className="nav-links">
                Login
              </li>
              <li onClick={handleRegisterVisible} className="nav-links">
                Register
              </li>
            </>
          )}
          {loginVisible && (
            <li
              className="nav-links"
              onClick={handleLoginVisible}
              style={{ color: 'red', fontWeight: 'normal' }}
            >
              Cancel
            </li>
          )}
          {registerVisible && (
            <li
              className="nav-links"
              onClick={handleRegisterVisible}
              style={{ color: 'red', fontWeight: 'normal' }}
            >
              Cancel
            </li>
          )}
        </ul>
      </nav>
    );
  }

  return (
    <nav id="navbar">
      <div>
        <span className="brand">filmes | (demo)</span>
      </div>
      <ul>
        {!formVisible && !submissionsVisible && (
          <>
            <li onClick={handleFormVisible} className="nav-links">
              Add Movie
            </li>
            <li onClick={handleSubmissionsVisible} className="nav-links">
              Submissions
            </li>
            {/* <li>
              <NavDropdown title="Sort By" id="dropdown">
                <NavDropdown.Item onSelect={() => handleSort('likes')}>
                  Likes
                </NavDropdown.Item>
                <NavDropdown.Item onSelect={() => handleSort('recent')}>
                  Recent
                </NavDropdown.Item>
              </NavDropdown>
            </li> */}
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
          <li
            className="nav-links"
            onClick={handleFormVisible}
            style={{ color: 'red', fontWeight: 'normal' }}
          >
            Cancel
          </li>
        )}
        {submissionsVisible && (
          <li
            className="nav-links"
            onClick={handleSubmissionsVisible}
            style={{ color: 'red', fontWeight: 'normal' }}
          >
            Cancel
          </li>
        )}
      </ul>
    </nav>
  );
};
