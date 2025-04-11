import { useState, useEffect } from 'react';
import { getItem } from '../services/api-utility'
import { cognitoService } from '../services/cognito';
import { logger } from '../utils/logger';

interface User {
  name: string;
  surname: string;
  email: string;
  number: string;
  roleKey: string;
  phone_number?: string;
}

// Cache per i dati dell'utente
let userCache: User | null = null;
let isLoading = false;
let listeners: ((user: User | null) => void)[] = [];

const notifyListeners = (user: User | null) => {
  listeners.forEach(listener => listener(user));
};

// Funzione per resettare la cache
export const resetUserCache = () => {
  userCache = null;
  isLoading = false;
  notifyListeners(null);
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(userCache);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    const fetchUser = async () => {
      if (userCache) {
        return;
      }

      if (isLoading) {
        return;
      }

      isLoading = true;
      setLoading(true);

      try {
        const cognitoUser = cognitoService.getCurrentUser();
        logger.info('cognitoUser', cognitoUser);
        if (cognitoUser) {
          try {
            // Prima prova a ottenere la sessione
            const session = await cognitoService.getSession();
            logger.info('session', session);
            if (!session.isValid()) {
              // Se la sessione non è valida, prova a refresharla
              await cognitoService.refreshSession();
              logger.info('nada', session);
            }
          } catch (error) {
            logger.error('Errore nella gestione della sessione:', error);
            setLoading(false);
            isLoading = false;
            return;
          }

          const email = cognitoUser.getUsername();
          logger.info('email', email);
          if (email) {
            const userData = await getItem('users', `email/${email}`);
            userCache = userData;
            notifyListeners(userData);
            setUser(userData);
          }
        }
      } catch (error) {
        logger.error('Errore nel recupero delle informazioni utente:', error);
      } finally {
        setLoading(false);
        isLoading = false;
      }
    };

    // Aggiungi il listener
    const listener = (newUser: User | null) => {
      setUser(newUser);
    };
    listeners.push(listener);

    fetchUser();

    // Rimuovi il listener quando il componente viene smontato
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  }, []);

  return { user, loading };
}; 