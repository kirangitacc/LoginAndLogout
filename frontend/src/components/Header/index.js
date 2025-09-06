import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = Boolean(Cookies.get('token'));
  const hideNav = location.pathname === '/' || location.pathname === '/register';

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('user_id');
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="header">
      <div className="logo">Logo</div>

      {!hideNav && isLoggedIn && (
        <>
          <button className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? '✖' : '☰'}
          </button>

          <nav className={`nav-buttons ${menuOpen ? 'open' : ''}`}>
            <button onClick={() => { navigate('/home'); setMenuOpen(false); }}>Home</button>
            <button onClick={() => { navigate('/profile'); setMenuOpen(false); }}>Profile</button>
            <button onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
