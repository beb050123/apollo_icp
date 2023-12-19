import { AuthClient } from '@dfinity/auth-client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { canisterId, createActor } from '../declarations/whoami';

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  authClient: null,
  identity: null,
  principal: null,
  whoamiActor: null,
});

const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },
  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        : `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943`,
    // Maximum authorization expiration is 8 days
    maxTimeToLive: days * hours * nanoseconds,
    kind: 'authorize-client',
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      console.log(client);
      updateClient(client);
    });
  }, []);

  const login = () => {
    if (authClient !== null) {
      (authClient as AuthClient).login({
        ...options.loginOptions,
        onSuccess: () => {
          updateClient(authClient);
          console.log(authClient);
        },
      });
    }
  };

  async function updateClient(client: any) {
    const isAuthenticated = await client.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    console.log('identity', identity);
    setIdentity(identity);

    const principal = identity.getPrincipal();
    console.log('principal', principal);
    setPrincipal(principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setWhoamiActor(actor as any);
  }

  async function logout() {
    if (authClient) {
      await (authClient as AuthClient).logout();
      await updateClient(authClient);
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
