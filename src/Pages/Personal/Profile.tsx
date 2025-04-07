import { Navbar } from '../../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="container mx-auto md:px-4 px-2 py-5 lg:py-15">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white special-rounded p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
              </Link>
              <h1 className="text-2xl font-bold">Informazioni personali</h1>
            </div>

            <div className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value="Emmanuele Carlone"
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Indirizzo email
                </label>
                <input
                  type="email"
                  id="email"
                  value="emmanuele.carlone@gmail.com"
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              {/* Telefono */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Numero di telefono (facoltativo)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value="+393389243782"
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>

              {/* Elimina account */}
              <div className="pt-6 border-t">
                <button className="text-red-600 hover:text-red-700 font-medium cursor-pointer">
                  Elimina l'account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
