import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
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
          <div className="px-4 py-2 border-b border-gray-100 cursor-pointer">
            <p className="text-sm font-medium text-gray-900">Il mio profilo</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400" />
            <span>Esci</span>
          </button>
        </div>
      )}
    </div>
  );
}; 