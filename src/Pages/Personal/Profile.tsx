import { Navbar } from '../../Components/Navbar/Navbar';

export default function ProfilePage() {
  return (
    <div className="bg-gray-50  min-h-[80vh]">
      <Navbar searchQuery="" onSearchChange={() => {}} />
      <div className="container mx-auto px-4 py-5 lg:py-15">
        <h2 className="text-xl font-semibold mb-4">Informazioni personali</h2>
        <div className="mx-auto">
          <div className="bg-white special-rounded p-6 border border-gray-200">

            <div className="md:flex items-center gap-2 mb-6">
              <div className="w-full md:w-1/2">
                {/* Nome */}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  value="Emmanuele"
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
              <div className="w-full md:w-1/2 md:mt-0 mt-6">
                {/* Cognome */}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Cognome
                </label>
                <input
                  type="text"
                  id="name"
                  value="Carlone"
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                />
              </div>
            </div>
            <div className="space-y-6">
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
