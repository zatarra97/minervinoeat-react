import { Navbar } from '../../Components/Navbar/Navbar';
import { useUser } from '../../hooks/useUser';
import { TextField } from '../../Components/Form/Fields/TextField';

export default function ProfilePage() {
  const { user, loading } = useUser();


  if (!user) {
    return null; // Il reindirizzamento viene gestito dall'useEffect
  }

  return (
    <div className="bg-gray-50 min-h-[80vh]">
      <Navbar />
      <div className="container mx-auto px-4 py-5 lg:py-15">
        <h2 className="text-xl font-semibold mb-4">Informazioni personali</h2>
        <div className="mx-auto">
          <div className="bg-white special-rounded p-6 border border-gray-200">
            <div className="grid md:grid-cols-2 items-center gap-4 md:gap-6 mb-6">
              <div className="w-full">
                <TextField
                  label="Nome"
                  name="name"
                  value={user.name}
                  disabled
                  isLoading={loading}
                />
              </div>
              <div className="w-full">
                <TextField
                  label="Cognome"
                  name="surname"
                  value={user.surname}
                  disabled
                  isLoading={loading}
                />
              </div>
              <div className="w-full">
                <TextField
                  label="Indirizzo email"
                  name="email"
                  type="email"
                  value={user.email}
                  disabled
                  isLoading={loading}
                />
              </div>
              <div className="w-full">
                <TextField
                  label="Numero di telefono (facoltativo)"
                  name="phone"
                  type="tel"
                  value={user.number}
                  disabled
                  isLoading={loading}
                />
              </div>
            </div>
            <div className="space-y-6">
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
