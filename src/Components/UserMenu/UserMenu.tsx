import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/useUser';
import { cognitoService } from '../../services/cognito';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export const UserMenu = () => {
  const { user, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await cognitoService.signOut();
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return <div className="animate-pulse h-6 w-24 bg-gray-200 rounded"></div>;
  }

  if (!user) {
    return (
      <div className="relative">
        {/* Mobile */}
        <button onClick={toggleMenu} className="md:hidden text-gray-600 hover:text-gray-800">
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="text-xl" />
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/accesso/login" className="btn btn-orange-wire">
            Accedi
          </Link>
          <Link to="/accesso/registrazione" className="btn btn-orange">
            Registrati
          </Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 md:hidden">
            <Link
              to="/accesso/login"
              className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Accedi
            </Link>
            <Link
              to="/accesso/registrazione"
              className="block px-4 py-2 text-gray-800 hover:bg-orange-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Registrati
            </Link>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* User Info Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="hidden md:block text-right">
          <div className="text-sm font-medium text-gray-900">
            {user.name} {user.surname}
          </div>
          <div className="text-xs text-gray-500">
            {user.email}
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
          {user.name[0]}{user.surname[0]}
        </div>
        {/* Mobile Menu Icon */}
        <FontAwesomeIcon
          icon={isMenuOpen ? faTimes : faBars}
          className="md:hidden text-gray-600 ml-1"
        />
      </button>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
          <Link
            to="/profilo"
            className="flex items-center px-4 py-2 text-gray-800 hover:bg-orange-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Profilo
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-gray-800 hover:bg-orange-50"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Esci
          </button>
        </div>
      )}
    </div>
  );
}; 