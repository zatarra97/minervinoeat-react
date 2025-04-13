import { Link } from 'react-router-dom';
import { UserMenu } from '../UserMenu';

interface NavbarProps {
  isSticky?: boolean;
}

export const Navbar = ({
  isSticky = false,
}: NavbarProps) => {
  return (
    <header className={`${isSticky ? 'sticky top-0 z-40' : ''} bg-white border-b border-orange-500 shadow-sm`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600 flex-shrink-0">
            {import.meta.env.VITE_APP_NAME}
          </Link>

          {/* Menu utente */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}; 