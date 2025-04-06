import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { UserMenu } from '../UserMenu';
import { useAuth } from '../../hooks/useAuth';

interface NavbarProps {
  isSticky?: boolean;
  showSearch?: boolean;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const Navbar = ({
  isSticky = false,
  showSearch = false,
  searchQuery = '',
  onSearchChange = () => {}
}: NavbarProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <header className={`${isSticky ? 'sticky top-0 z-40' : ''} bg-white border-b border-orange-500 shadow-sm`}>
      <div className="container mx-auto md:px-4 px-2">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600 flex-shrink-0">
            {import.meta.env.VITE_APP_NAME}
          </Link>

          {/* Barra di ricerca */}
          {showSearch && (
            <div className="flex-1 max-w-sm mx-4">
              <SearchBar value={searchQuery} onChange={onSearchChange} />
            </div>
          )}

          {/* Pulsanti Accesso/Menu Utente */}
          <div className="flex gap-4">
            {!isLoading && (
              isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <Link to="/accesso/login" className="btn btn-orange">
                    Accedi
                  </Link>
                  <Link to="/accesso/registrati" className="btn btn-orange-wire">
                    Registrati
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 