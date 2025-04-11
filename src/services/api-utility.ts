import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface FilterObject {
  where: Record<string, any>;
  order?: string;
}

interface Pagination {
  limit: number | null;
  offset: number | null;
}

interface Config {
  headers: {
    Authorization: string;
  };
}

interface ErrorResponse {
  error?: {
    message?: string;
  };
  status?: string;
}

// Funzione helper per ottenere la configurazione dell'header
const getConfig = (): Config | {} => {
  const token = localStorage.getItem('idToken');
  if (!token) {
    console.warn('No JWT token found in localStorage');
    return {};
  }
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

const sessionExpired = (): void => {
  console.error('Authentication failed. Redirecting to login...');
  toast.error("Sessione scaduta, esegui nuovamente il login");
  localStorage.clear();
  window.location.href = '/accesso/login';
};

// ping di controllo connessione al backend
export const ping = async (): Promise<any> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/ping`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Lista dell'entità
export const getList = async (
  entity: string,
  filters: Record<string, any> = {},
  pagination: Pagination = { limit: null, offset: null },
  sortField: string | null = null
): Promise<any> => {
  const url = new URL(`${import.meta.env.VITE_APP_BACKEND_URL}/${entity}`);
  const params = new URLSearchParams();

  // Gestione dei filtri
  if (Object.keys(filters).length > 0 || sortField) {
    const filterObj: FilterObject = { where: {} };
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (key.includes('Inequality')) {
          const fieldName = key.replace('Inequality', '');
          if (value.includes('neq')) {
            filterObj.where[fieldName] = { neq: null };
          } else if (value.includes('eq')) {
            filterObj.where[fieldName] = { eq: null };
          }
        } else if (key.includes('Id') && key !== 'paramId') {
          filterObj.where[key] = value;
        } else {
          filterObj.where[key] = { like: `%${value}%`, options: 'i' };
        }
      }
    });

    if (sortField) {
      filterObj.order = sortField;
    }

    params.append("filter", JSON.stringify(filterObj));
  }

  if (pagination.limit != null && pagination.offset != null) {
    params.append("limit", pagination.limit.toString());
    params.append("offset", pagination.offset.toString());
  }

  url.search = params.toString();

  try {
    const response = await axios.get(url.toString(), getConfig());
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error fetching data:', axiosError.response?.data);
      if (axiosError.response?.status === 401) {
        sessionExpired();
      }
    }
    throw error;
  }
};

// Dettaglio dell'entità
export const getItem = async (entity: string, id: string): Promise<any> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/${entity}/${id}`, getConfig());
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', axiosError.response?.data);
      if (axiosError.response?.status === 401) {
        sessionExpired();
      }
    }
    throw error;
  }
};

// Creazione dell'entità
export const createItem = async (entity: string, data: any): Promise<any> => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/${entity}`, data, getConfig());
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', axiosError.response?.data?.error?.message || axiosError.message);
      if (axiosError.response?.status === 401) {
        sessionExpired();
      }
    }
    throw error;
  }
};

// Aggiornamento dell'entità
export const updateItem = async (entity: string, id: string, data: any = {}): Promise<any> => {
  try {
    const response = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/${entity}/${id}`, data, getConfig());
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', axiosError.response?.data?.error?.message || axiosError.message);
      if (axiosError.response?.status === 401) {
        sessionExpired();
      }
    }
    throw error;
  }
};

// Eliminazione dell'entità
export const deleteItem = async (entity: string, id: string): Promise<void> => {
  try {
    await axios.delete(`${import.meta.env.VITE_APP_BACKEND_URL}/${entity}/${id}`, getConfig());
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.error('Error:', axiosError.response?.data?.error?.message || axiosError.message);
      if (axiosError.response?.status === 401) {
        sessionExpired();
      }
    }
    throw error;
  }
};

