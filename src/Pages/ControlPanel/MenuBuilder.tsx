import React, { useState } from 'react';
import { MenuCategory, MenuItem } from '../../types/restaurant';
import DataTable from '../../Components/Table/DataTable';

// Menu di esempio per sviluppo
const initialMenu: MenuCategory[] = [
  {
    category: "Antipasti",
    items: [
      {
        name: "Bruschette al Pomodoro",
        description: "Pane tostato con pomodorini freschi e basilico",
        price: 5.00,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
      },
      {
        name: "Tagliere di Salumi",
        description: "Selezione di salumi italiani con focaccia",
        price: 12.00,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
      }
    ]
  },
  {
    category: "Primi Piatti",
    items: [
      {
        name: "Spaghetti alla Carbonara",
        description: "Pasta con uova, guanciale, pecorino e pepe nero",
        price: 11.00,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591"
      }
    ]
  }
];

const MenuBuilder: React.FC = () => {
  const [menu, setMenu] = useState<MenuCategory[]>(initialMenu);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newCategory, setNewCategory] = useState({ category: '' });
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    image: ''
  });

  // Colonne per la tabella dei piatti
  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
    },
    {
      header: 'Descrizione',
      accessor: 'description',
    },
    {
      header: 'Prezzo',
      accessor: 'price',
      cell: (row: MenuItem) => (
        <span>€{row.price.toFixed(2)}</span>
      )
    },
    {
      header: 'Immagine',
      accessor: 'image',
      cell: (row: MenuItem) => (
        <div className="w-16 h-16 relative">
          <img 
            src={row.image} 
            alt={row.name}
            className="object-cover rounded-md w-full h-full"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/images/placeholder-food.jpg';
            }}
          />
        </div>
      )
    }
  ];

  // Azioni per la tabella dei piatti
  const actions = [
    {
      name: 'Modifica',
      onClick: (item: MenuItem) => {
        console.log('Modifica piatto:', item);
        // TODO: Implementare modifica piatto
      }
    },
    {
      name: 'Elimina',
      onClick: (item: MenuItem) => {
        if (selectedCategory) {
          const updatedMenu = menu.map(cat => {
            if (cat.category === selectedCategory) {
              return {
                ...cat,
                items: cat.items.filter(i => i.name !== item.name)
              };
            }
            return cat;
          });
          setMenu(updatedMenu);
        }
      }
    }
  ];

  const handleAddCategory = () => {
    if (newCategory.category.trim()) {
      setMenu([...menu, { category: newCategory.category, items: [] }]);
      setNewCategory({ category: '' });
      setIsAddingCategory(false);
    }
  };

  const handleAddItem = () => {
    if (selectedCategory && newItem.name && newItem.price) {
      const updatedMenu = menu.map(cat => {
        if (cat.category === selectedCategory) {
          return {
            ...cat,
            items: [...cat.items, newItem as MenuItem]
          };
        }
        return cat;
      });
      setMenu(updatedMenu);
      setNewItem({ name: '', description: '', price: 0, image: '' });
      setIsAddingItem(false);
    }
  };

  const handleDeleteCategory = (categoryName: string) => {
    setMenu(menu.filter(cat => cat.category !== categoryName));
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestione Menu</h1>
        <button
          onClick={() => setIsAddingCategory(true)}
          className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Aggiungi Categoria
        </button>
      </div>

      {/* Gestione Categorie */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Categorie */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-4">Categorie</h2>
          <ul className="space-y-2">
            {menu.map((category) => (
              <li 
                key={category.category}
                className="flex items-center justify-between group"
              >
                <button
                  onClick={() => setSelectedCategory(category.category)}
                  className={`flex-1 text-left py-2 px-3 rounded-md transition-colors ${
                    selectedCategory === category.category
                      ? 'bg-orange-100 text-orange-700'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.category}
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.category)}
                  className="p-1 text-gray-400 hover:text-red-500 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Area Contenuto Principale */}
        <div className="lg:col-span-9">
          {selectedCategory ? (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-xl font-semibold">{selectedCategory}</h2>
                <button
                  onClick={() => setIsAddingItem(true)}
                  className="w-full sm:w-auto bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Aggiungi Piatto
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <DataTable
                  columns={columns}
                  data={menu.find(cat => cat.category === selectedCategory)?.items || []}
                  actions={actions}
                />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
              Seleziona una categoria per visualizzare e gestire i piatti
            </div>
          )}
        </div>
      </div>

      {/* Modal Aggiungi Categoria */}
      {isAddingCategory && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200 m-4">
            <h3 className="text-lg font-semibold mb-4">Aggiungi Categoria</h3>
            <input
              type="text"
              value={newCategory.category}
              onChange={(e) => setNewCategory({ category: e.target.value })}
              placeholder="Nome categoria"
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => setIsAddingCategory(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1"
              >
                Annulla
              </button>
              <button
                onClick={handleAddCategory}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 order-1 sm:order-2"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Aggiungi Piatto */}
      {isAddingItem && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl border border-gray-200 m-4">
            <h3 className="text-lg font-semibold mb-4">Aggiungi Piatto</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Nome piatto"
                className="w-full p-2 border rounded-lg"
              />
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Descrizione"
                className="w-full p-2 border rounded-lg"
                rows={3}
              />
              <input
                type="number"
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                placeholder="Prezzo"
                step="0.01"
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="text"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                placeholder="URL immagine"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddingItem(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 order-2 sm:order-1"
              >
                Annulla
              </button>
              <button
                onClick={handleAddItem}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 order-1 sm:order-2"
              >
                Aggiungi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBuilder;
