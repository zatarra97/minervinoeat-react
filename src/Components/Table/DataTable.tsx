import React, { useState } from 'react';

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  actions?: {
    name: string;
    onClick: (row: any) => void;
  }[];
  filterOptions?: {
    name: string;
    options: {
      id: string;
      label: string;
      count: number;
    }[];
    onFilter: (selected: string[]) => void;
  }[];
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title = 'Dati',
  searchPlaceholder = 'Cerca...',
  onSearch,
  actions,
  filterOptions
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Gestione ricerca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  // Gestione filtri
  const handleFilterChange = (filterName: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[filterName] || [];
      const updated = checked
        ? [...current, optionId]
        : current.filter(id => id !== optionId);
      
      const newFilters = {
        ...prev,
        [filterName]: updated
      };
      
      if (filterOptions) {
        const filter = filterOptions.find(f => f.name === filterName);
        if (filter && filter.onFilter) {
          filter.onFilter(updated);
        }
      }
      
      return newFilters;
    });
  };

  // Paginazione
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="">
      <div className="mx-auto max-w-full">
        <div className="bg-white relative shadow-md sm:rounded-lg overflow-hidden">
          {/* Header della tabella con ricerca e filtri */}
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">Cerca</label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </form>
            </div>
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              {/* Pulsante filtri */}
              {filterOptions && filterOptions.length > 0 && (
                <div className="flex items-center space-x-3 w-full md:w-auto">
                  {filterOptions.map((filterOption, idx) => (
                    <div key={idx} className="relative">
                      <button
                        id={`filterDropdownButton-${idx}`}
                        data-dropdown-toggle={`filterDropdown-${idx}`}
                        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                        type="button"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                        </svg>
                        {filterOption.name}
                        <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </button>
                      {/* Dropdown del filtro */}
                      <div id={`filterDropdown-${idx}`} className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow">
                        <h6 className="mb-3 text-sm font-medium text-gray-900">{filterOption.name}</h6>
                        <ul className="space-y-2 text-sm" aria-labelledby={`filterDropdownButton-${idx}`}>
                          {filterOption.options.map((option) => (
                            <li key={option.id} className="flex items-center">
                              <input
                                id={`filter-${idx}-${option.id}`}
                                type="checkbox"
                                className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-orange-600 focus:ring-orange-500 focus:ring-2"
                                checked={(selectedFilters[filterOption.name] || []).includes(option.id)}
                                onChange={(e) => handleFilterChange(filterOption.name, option.id, e.target.checked)}
                              />
                              <label htmlFor={`filter-${idx}-${option.id}`} className="ml-2 text-sm font-medium text-gray-900">
                                {option.label} ({option.count})
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Tabella */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  {columns.map((column, idx) => (
                    <th key={idx} scope="col" className="px-4 py-3">
                      {column.header}
                    </th>
                  ))}
                  {actions && <th scope="col" className="px-4 py-3"><span className="sr-only">Azioni</span></th>}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((row, rowIdx) => (
                  <tr key={rowIdx} className="border-b">
                    {columns.map((column, colIdx) => (
                      <td key={colIdx} className="px-4 py-3">
                        {column.cell ? column.cell(row) : row[column.accessor]}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`dropdown-button-${rowIdx}`}
                          data-dropdown-toggle={`dropdown-${rowIdx}`}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                          type="button"
                        >
                          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id={`dropdown-${rowIdx}`}
                          className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow"
                        >
                          <ul className="py-1 text-sm text-gray-700" aria-labelledby={`dropdown-button-${rowIdx}`}>
                            {actions.map((action, actionIdx) => (
                              <li key={actionIdx}>
                                <button
                                  onClick={() => action.onClick(row)}
                                  className="block w-full text-left py-2 px-4 hover:bg-gray-100"
                                >
                                  {action.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Paginazione */}
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500">
              Mostrando 
              <span className="font-semibold text-gray-900 mx-1">
                {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)}
              </span>
              di
              <span className="font-semibold text-gray-900 ml-1">{data.length}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  <span className="sr-only">Precedente</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, i) => {
                // Mostra sempre la prima pagina, l'ultima e le pagine attorno a quella corrente
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  (i >= currentPage - 2 && i <= currentPage + 2)
                ) {
                  return (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        aria-current={currentPage === i + 1 ? 'page' : undefined}
                        className={`flex items-center justify-center text-sm py-2 px-3 leading-tight ${
                          currentPage === i + 1
                            ? 'text-orange-600 bg-orange-50 border border-orange-300 hover:bg-orange-100 hover:text-orange-700'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                }

                // Aggiunge i puntini di sospensione se necessario
                if (
                  (i === 1 && currentPage > 3) ||
                  (i === totalPages - 2 && currentPage < totalPages - 3)
                ) {
                  return (
                    <li key={i}>
                      <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300">
                        ...
                      </span>
                    </li>
                  );
                }

                return null;
              })}
              
              <li>
                <button
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                >
                  <span className="sr-only">Successivo</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DataTable; 