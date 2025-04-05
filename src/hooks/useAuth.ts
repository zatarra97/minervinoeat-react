/* Gestione dello stato di autenticazione con Cognito */
import { useState, useEffect } from 'react';
import { cognitoService } from '../services/cognito';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const session = await cognitoService.getSession();
      setIsAuthenticated(!!session);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    checkAuthStatus
  };
}; 