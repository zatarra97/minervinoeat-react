import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto w-full container p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="self-center text-2xl font-bold text-orange-600">
                {import.meta.env.VITE_APP_NAME}
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Risorse</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/ristoranti" className="hover:underline">Ristoranti</Link>
                </li>
                <li>
                  <Link to="/categorie" className="hover:underline">Categorie</Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Seguici</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">Facebook</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Instagram</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Legale</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/termini" className="hover:underline">Termini e Condizioni</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {new Date().getFullYear()} <Link to="/" className="hover:underline">{import.meta.env.VITE_APP_NAME}</Link>. Tutti i diritti riservati.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900">
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
