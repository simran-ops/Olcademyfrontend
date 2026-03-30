import React, { useState, useEffect, useContext, useCallback } from 'react';
import { FiMenu, FiSearch, FiX, FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SignupModal from './SignupModal';
import Login from './Login';
import VerifyEmail from './VerifyEmail';
import ProductCartSection from '../../pages/ProductCartSection';
import { AuthContext } from '../../context/AuthContext';

const navItems = [
  { label: 'Home',           path: '/' },
  { label: "Men's Scents",   path: '/mens-collection' },
  { label: "Women's Scents", path: '/womens-collection' },
  { label: 'Unisex Scents',  path: '/unisex-collection' },
  { label: 'Gifts',          path: '/gift-collection' },
];

const Header = React.memo(() => {
  const [isMenuOpen,       setIsMenuOpen]       = useState(false);
  const [isSearchOpen,     setIsSearchOpen]     = useState(false);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [isSignupOpen,     setIsSignupOpen]     = useState(false);
  const [isLoginOpen,      setIsLoginOpen]      = useState(false);
  const [isVerifyOpen,     setIsVerifyOpen]     = useState(false);
  const [isUserOpen,       setIsUserOpen]       = useState(false);
  const [isCartOpen,       setIsCartOpen]       = useState(false);
  const [isLogoutOpen,     setIsLogoutOpen]     = useState(false);
  const [showLogoutNotify, setShowLogoutNotify] = useState(false);

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu   = useCallback(() => setIsMenuOpen(v => !v), []);
  const toggleSearch = useCallback(() => setIsSearchOpen(v => !v), []);
  const toggleUser   = useCallback(() => setIsUserOpen(v => !v), []);

  useEffect(() => {
    document.body.style.overflow = (isMenuOpen || isSearchOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen, isSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search?q=' + encodeURIComponent(searchQuery.trim()));
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = useCallback(() => {
    setIsLogoutOpen(false);
    setIsUserOpen(false);
    logout();
    setShowLogoutNotify(true);
    setTimeout(() => setShowLogoutNotify(false), 3000);
  }, [logout]);

  const isActive = (path) => location.pathname === path;

  // Original sizes restored — black text, gold on active/hover
  const navBase = "font-['Playfair_Display'] font-semibold text-lg tracking-[0.25em] uppercase transition-colors duration-300 whitespace-nowrap pb-1 text-black hover:text-[#D4AF37]";
  const navActiveClass = navBase + ' text-[#D4AF37] border-b-2 border-[#D4AF37]';
  const navInactiveClass = navBase;

  const iconCls = 'text-black hover:text-[#D4AF37] transition-colors duration-200 flex items-center justify-center';

  return (
    <>
      <style>
        {"@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap');"}
      </style>

      {/* Header: always visible, always white, no scroll/opacity logic */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: '0 1px 12px rgba(0,0,0,0.08)',
        }}
      >
        <div className="flex items-center justify-between w-full px-12 py-4">

          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0 z-10">
            <button
              onClick={toggleMenu}
              className={iconCls + ' mr-4 md:hidden'}
              aria-label="Menu"
            >
              <FiMenu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <img
                src="/images/MA Vesarii 3.png"
                alt="Vesarii"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Nav absolutely centered */}
          <nav className="hidden md:flex items-center gap-14 absolute left-1/2 -translate-x-1/2">
            {navItems.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={isActive(path) ? navActiveClass : navInactiveClass}
              >
                {label}
              </Link>
            ))}
            {!user && (
              <button
                onClick={() => setIsLoginOpen(true)}
                className={navInactiveClass + ' bg-transparent cursor-pointer'}
              >
                Login
              </button>
            )}
          </nav>

          {/* Right: Icons — original sizes */}
          <div className="flex items-center gap-8 z-10">
            <Link to="/wishlist-collection" className={iconCls} aria-label="Wishlist">
              <FiHeart size={22} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className={iconCls} aria-label="Cart">
              <FiShoppingCart size={22} />
            </button>
            {user ? (
              <div className="relative">
                <button onClick={toggleUser} className="focus:outline-none" aria-label="Account">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white text-sm font-bold hover:opacity-90 transition-opacity">
                    {(user.username || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                </button>
                <AnimatePresence>
                  {isUserOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-44 bg-white border border-black/10 rounded-xl shadow-2xl py-2 z-50"
                    >
                      <Link
                        to="/userProfile"
                        onClick={() => setIsUserOpen(false)}
                        className="block px-4 py-2.5 text-xs uppercase tracking-[0.15em] font-['Playfair_Display'] text-black hover:text-[#D4AF37] hover:bg-black/5 rounded-lg mx-1 transition-all"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => setIsLogoutOpen(true)}
                        style={{ width: 'calc(100% - 8px)', marginLeft: '4px' }}
                        className="block text-left px-4 py-2.5 text-xs uppercase tracking-[0.15em] font-['Playfair_Display'] text-black hover:text-[#D4AF37] hover:bg-black/5 rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={() => setIsSignupOpen(true)} className={iconCls} aria-label="Sign up">
                <FiUser size={22} />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Spacer — pushes all page content below the fixed header */}
      <div style={{ height: '88px' }} />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={toggleMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-64 bg-white border-r border-black/10 z-50 p-8 shadow-2xl"
            >
              <button
                onClick={toggleMenu}
                className="text-black mb-10 hover:text-[#D4AF37] transition-colors"
              >
                <FiX size={26} />
              </button>
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={toggleMenu}
                  className={`block py-4 font-['Playfair_Display'] font-semibold tracking-[0.2em] uppercase border-b border-black/10 last:border-b-0 transition-colors ${isActive(path) ? 'text-[#D4AF37]' : 'text-black hover:text-[#D4AF37]'}`}
                >
                  {label}
                </Link>
              ))}
              {!user && (
                <button
                  onClick={() => { toggleMenu(); setIsLoginOpen(true); }}
                  className="block w-full text-left py-4 font-['Playfair_Display'] font-semibold tracking-[0.2em] uppercase text-black hover:text-[#D4AF37] border-b border-black/10 transition-colors bg-transparent border-x-0 border-t-0"
                >
                  Login
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={toggleSearch}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="bg-white border border-black/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex gap-3">
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for your perfect scent..."
                  className="flex-1 px-5 py-3.5 bg-black/5 border border-black/20 focus:border-[#D4AF37] rounded-xl text-black outline-none text-base italic transition-colors"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-7 py-3.5 bg-black hover:bg-[#D4AF37] text-white hover:text-black font-bold rounded-xl text-xs tracking-widest uppercase transition-colors flex-shrink-0"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modals */}
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        openVerify={() => { setIsSignupOpen(false); setIsVerifyOpen(true); }}
        openLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
      />
      <VerifyEmail
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
        openLogin={() => { setIsVerifyOpen(false); setIsLoginOpen(true); }}
      />
      <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <ProductCartSection isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Logout Confirm */}
      <AnimatePresence>
        {isLogoutOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setIsLogoutOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              transition={{ duration: 0.18 }}
              className="bg-white border border-black/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-['Playfair_Display'] font-medium text-black mb-3">
                Confirm Logout
              </h3>
              <p className="text-black/50 italic mb-8">
                Are you sure you want to logout?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLogoutOpen(false)}
                  className="flex-1 py-3 border border-black/30 hover:border-[#D4AF37] text-black hover:text-[#D4AF37] font-medium rounded-xl text-xs tracking-widest uppercase transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-3 bg-black hover:bg-[#D4AF37] text-white hover:text-black font-bold rounded-xl text-xs tracking-widest uppercase transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Toast */}
      <AnimatePresence>
        {showLogoutNotify && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 right-6 bg-emerald-700 text-emerald-100 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 text-xs tracking-widest uppercase font-medium z-[100]"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Logged out successfully
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = 'Header';
export default Header;