import { Link } from 'react-router-dom';
import { SearchBar } from '../SearchBar';
import { UserMenu } from '../UserMenu';

interface NavbarProps {
  isSticky?: boolean;
  showSearch?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar = ({
  isSticky = false,
  showSearch = false,
  searchQuery,
  onSearchChange
}: NavbarProps) => {
  return (
    <header className={`${isSticky ? 'sticky top-0 z-40' : ''} bg-white border-b border-orange-500 shadow-sm`}>
      <div className="container mx-auto px-4">
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

          {/* Menu utente unificato */}
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}; 