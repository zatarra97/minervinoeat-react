import { Navbar } from '../../Components/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-96 bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-32 xl:py-64">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <FontAwesomeIcon 
              icon={faSearch} 
              className="text-orange-500 text-7xl mb-4"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Pagina non trovata
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              La pagina che stai cercando non esiste o è stata spostata.
            </p>
          </div>

          <Link 
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 btn btn-orange transition-colors"
          >
            <FontAwesomeIcon icon={faHome} />
            <span>Torna alla home</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 