import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faChevronDown, faReceipt, faLocationDot } from '@fortawesome/free-solid-svg-icons';
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <FontAwesomeIcon icon={faUser} className="text-orange-500" />
        <span className="text-sm font-medium text-gray-900">nome_profilo</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a 
            href="/profilo" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FontAwesomeIcon icon={faUser} className="text-gray-400 w-4 h-4" />
            <span>Il mio profilo</span>
          </a>
          
          <a 
            href="/ordini" 
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FontAwesomeIcon icon={faReceipt} className="text-gray-400 w-4 h-4" />
            <span>I miei ordini</span>
          </a>

          <div className="h-px bg-gray-200 my-1"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400 w-4 h-4" />
            <span>Esci</span>
          </button>
        </div>
      )}
    </div>
  );
}; 