import Keycloak, {
  KeycloakInitOptions,
  KeycloakInstance,
  KeycloakLoginOptions,
} from 'keycloak-js';

// =================================================================================================

let keycloak: KeycloakInstance | undefined;

// =================================================================================================

export function keycloakInit(
  options = {} as KeycloakInitOptions,
): Promise<KeycloakInstance> {
  return new Promise((resolve, reject) => {
    const keycloakAuth = (keycloak = Keycloak());
    function init() {
      keycloakAuth
        .init(options)
        .success(authenticated => {
          console.error(
            'Keycloak initialization successful. Login Status:',
            authenticated,
          );
          resolve(keycloakAuth);
        })
        .error((errorData: any) => {
          console.error('Error during Keycloak initialization:', errorData);
          reject(errorData);
        });
    }

    keycloakAuth.onAuthSuccess = () => console.log('onAuthSuccess', arguments);
    keycloakAuth.onAuthError = () => console.log('onAuthError', arguments);
    keycloakAuth.onAuthLogout = () => console.log('onAuthLogout', arguments);
    keycloakAuth.onAuthRefreshSuccess = () =>
      console.log('onAuthRefreshSuccess', arguments);
    keycloakAuth.onAuthRefreshError = () => {
      console.log('onAuthRefreshError', arguments);
      init();
    };
    init();
  });
}

export function keycloakLogin(
  options = {
    prompt: 'login',
  } as KeycloakLoginOptions,
): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (keycloak) {
      const keycloakAuth = keycloak;
      keycloakAuth
        .login(options)
        .success(() => {
          console.error('Login successful');
          resolve(true);
        })
        .error(() => {
          console.error('Login failed');
          reject(false);
        });
    } else {
      console.error('Login failed: Keycloak is probably not initialized');
      reject(false);
    }
  });
}

export function keycloakLogout(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    if (keycloak) {
      const keycloakAuth = keycloak;
      keycloakAuth
        .logout()
        .success(() => {
          console.error('Logout successful');
          resolve(true);
        })
        .error(() => {
          console.error('Logout failed');
          reject(false);
        });
    } else {
      console.error('Logout failed: Keycloak is probably not initialized');
      reject(false);
    }
  });
}

export function useBearer(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (keycloak && keycloak.token) {
      const keycloakAuth = keycloak;
      keycloakAuth
        .updateToken(5)
        .success(() => {
          resolve(keycloakAuth.token);
        })
        .error(() => {
          reject('Failed to refresh token');
        });
    } else {
      reject('Not logged in');
    }
  });
}

export function isAuthenticated(): boolean {
  if (keycloak) {
    const keycloakAuth = keycloak;
    if (keycloakAuth.authenticated !== undefined) {
      return keycloakAuth.authenticated;
    } else {
      console.error('Keycloak authentication status undefined');
      return false;
    }
  } else {
    console.error(
      'Not possible to determine authentication status: Keycloak is probably not initialized',
    );
    return false;
  }
}
