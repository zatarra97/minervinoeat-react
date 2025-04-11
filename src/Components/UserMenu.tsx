import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faChevronDown, faReceipt, faUserCircle, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { cognitoService } from '../services/cognito';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { user, loading } = useUser();

  // Chiudi il dropdown quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await cognitoService.signOut();
      navigate('/accesso/login');
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-2">
        <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          to="/accesso/login"
          className="btn btn-orange btn-sm"
        >
          <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
          Login
        </Link>
        <Link
          to="/accesso/registrati"
          className="btn btn-outline-orange btn-sm"
        >
          <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
          Registrati
        </Link>
      </div>
    );
  }

  // Versione mobile per utenti non autenticati
  const MobileAuthButtons = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:bg-gray-100 transition-colors p-2 focus:ring-2 focus:ring-orange-500"
      >
        <span className="sr-only">Menu accesso</span>
        <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
      </button>

      {isOpen && !loading && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          <div className="py-2">
            <Link 
              to="/accesso/login" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Accedi
            </Link>
            <Link 
              to="/accesso/registrati" 
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Registrati
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // Versione desktop per utenti non autenticati
  const DesktopAuthButtons = () => (
    <div className="hidden md:flex gap-4">
      <Link to="/accesso/login" className="btn btn-orange">
        Accedi
      </Link>
      <Link to="/accesso/registrati" className="btn btn-orange-wire">
        Registrati
      </Link>
    </div>
  );

  // Menu per utenti autenticati
  const AuthenticatedMenu = () => (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:bg-gray-100 transition-colors p-2 focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <span className="sr-only">Apri menu utente</span>
        <div className="w-8 h-8 me-2 rounded-full bg-orange-500 text-white flex items-center justify-center">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
        <span className="hidden md:block">{user.name} {user.surname}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`ms-2 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          size="xs"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg divide-y divide-gray-100 z-50 border border-gray-200">
          <div className="px-4 py-3">
            <div className="font-medium text-gray-900">{user.name} {user.surname}</div>
            <div className="text-sm text-gray-500 truncate">{user.email}</div>
          </div>
          
          <ul className="py-2">
            <li>
              <Link 
                to="/profilo" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faUser} className="text-gray-400 w-4 h-4" />
                <span>Il mio profilo</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/ordini" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <FontAwesomeIcon icon={faReceipt} className="text-gray-400 w-4 h-4" />
                <span>I miei ordini</span>
              </Link>
            </li>
          </ul>
          
          <div className="py-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400 w-4 h-4" />
              <span>Esci</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Rendering condizionale basato sullo stato di autenticazione
  if (isAuthenticated) {
    return <AuthenticatedMenu />;
  }

  // Rendering condizionale basato sulla dimensione dello schermo
  return (
    <>
      <div className="md:hidden">
        <MobileAuthButtons />
      </div>
      <DesktopAuthButtons />
    </>
  );
}; 