import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  ISignUpResult
} from 'amazon-cognito-identity-js';
import { resetUserCache } from '../hooks/useUser';
import { logger } from '../utils/logger';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID
};

const userPool = new CognitoUserPool(poolData);

export interface SignUpParams {
  email: string;
  password: string;
  nome: string;
  cognome: string;
  telefono: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

class CognitoService {
  async signUp({ email, password, nome, cognome, telefono }: SignUpParams): Promise<ISignUpResult> {
    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: nome }),
      new CognitoUserAttribute({ Name: 'family_name', Value: cognome }),
      new CognitoUserAttribute({ Name: 'phone_number', Value: telefono })
    ];

    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result!);
      });
    });
  }

  async signIn({ email, password }: SignInParams): Promise<CognitoUser> {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userData = {
      Username: email,
      Pool: userPool
    };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          localStorage.setItem('idToken', idToken);
          logger.info('Login effettuato con successo', { email });
          resolve(cognitoUser);
        },
        onFailure: (err) => {
          logger.error('Errore durante il login', { error: err, email });
          reject(err);
        }
      });
    });
  }

  async signOut(): Promise<void> {
    logger.info('Avvio processo di logout');
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      localStorage.removeItem('idToken');
      resetUserCache();
      logger.info('Logout completato con successo');
    }
  }

  getCurrentUser(): CognitoUser | null {
    return userPool.getCurrentUser();
  }

  async getSession(): Promise<any> {
    const cognitoUser = userPool.getCurrentUser();
    
    return new Promise((resolve, reject) => {
      if (!cognitoUser) {
        reject(new Error('No user found'));
        return;
      }

      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session);
      });
    });
  }

  async refreshSession(): Promise<void> {
    const cognitoUser = userPool.getCurrentUser();
    if (!cognitoUser) {
      throw new Error('No user found');
    }

    const session = cognitoUser.getSignInUserSession();
    const refreshToken = session?.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    return new Promise((resolve, reject) => {
      cognitoUser.refreshSession(refreshToken, (err, session) => {
        if (err) {
          reject(err);
          return;
        }
        const idToken = session.getIdToken().getJwtToken();
        localStorage.setItem('idToken', idToken);
        resolve();
      });
    });
  }
}

export const cognitoService = new CognitoService(); 