import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faChevronDown, faReceipt, faLocationDot, faCog } from '@fortawesome/free-solid-svg-icons';
import { cognitoService } from '../services/cognito';
import { useNavigate } from 'react-router-dom';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // Dati dell'utente (in un'app reale verrebbero da un contesto o da un hook)
  const userData = {
    name: "Emmanuele Carlone",
    email: "emmanuele.carlone@gmail.com",
    role: "Cliente"
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-sm font-medium text-gray-900 rounded-full hover:bg-gray-100 transition-colors p-2 focus:ring-2 focus:ring-orange-500 cursor-pointer"
      >
        <span className="sr-only">Apri menu utente</span>
        <div className="w-8 h-8 me-2 rounded-full bg-orange-500 text-white flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <span>{userData.name}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`ms-2 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          size="xs"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg divide-y divide-gray-100 z-50 border border-gray-200">
          <div className="px-4 py-3">
            <div className="font-medium text-gray-900">{userData.role}</div>
            <div className="text-sm text-gray-500 truncate">{userData.email}</div>
          </div>
          
          <ul className="py-2">
            <li>
              <a 
                href="/profilo" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faUser} className="text-gray-400 w-4 h-4" />
                <span>Il mio profilo</span>
              </a>
            </li>
            <li>
              <a 
                href="/ordini" 
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <FontAwesomeIcon icon={faReceipt} className="text-gray-400 w-4 h-4" />
                <span>I miei ordini</span>
              </a>
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
}; 