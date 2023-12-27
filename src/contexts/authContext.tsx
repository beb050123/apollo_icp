import { AuthClient } from '@dfinity/auth-client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { canisterId, createActor } from '../declarations/whoami';

const AuthContext = createContext({
  isAuthenticated: false,
  login: (type: string) => {},
  logout: () => {},
  authClient: null,
  identity: null,
  principal: null,
  whoamiActor: null,
  setIsAuthenticated: (isAuthenticated: boolean) => {},
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
  const [selectedAuthType, setselectedAuthType] = useState(null);

  useEffect(() => {
    const initializeClient = async () => {
      const storedIdentityProvider = localStorage.getItem('identityProvider');

      if (storedIdentityProvider) {
        if (storedIdentityProvider === 'if') {
          let client = window.ic.infinityWallet;
          updateClient(client, 'if');
        } else if (storedIdentityProvider === 'plug') {
          let client = window.ic.plug;
          updateClient(client, 'plug');
        }
      }
    };

    initializeClient();
  }, []);

  const login = async (type: string) => {
    if (type == 'ii') {
      if (authClient) {
        (authClient as AuthClient).login({
          ...options.loginOptions,
          onSuccess: () => {
            updateClient(authClient, 'ii');
            console.log(authClient);
          },
        });
      }
    } else if (type == 'if') {
      let client = window.ic.infinityWallet;
      console.log('login hit');
      await updateClient(client, 'if');
    } else if (type == 'plug') {
      let client = window.ic.plug;
      await updateClient(client, 'plug');
    }
  };

  async function updateClient(client: any, type: string) {
    try {
      let identity;
      let principal;
      let actor;

      if (type === 'ii') {
        let connectionStatus = await client.isAuthenticated();
        identity = client.getIdentity();
        setIdentity(identity);
        setPrincipal(identity.getPrincipal());
        setAuthClient(client);

        actor = createActor(canisterId, {
          agentOptions: {
            identity,
          },
        });

        setWhoamiActor(actor as any);
      } else if (type === 'if') {
        const connectionStatus = await client.isConnected();

        if (!connectionStatus) {
          const connection = await window.ic.infinityWallet.requestConnect();
        } else {
          setIsAuthenticated(true);
          // Perform additional actions after successful login for 'if'

          // Optionally, create an actor here and assign it to the auth client
          // actor = createActor(canisterId, {
          //   agentOptions: {
          //     identity: client.getIdentity(),
          //   },
          // });
          // setWhoamiActor(actor as any);
        }
      } else if (type === 'plug') {
        const connectionStatus = await client.isConnected();

        if (!connectionStatus) {
          const connection = await window.ic.plug.requestConnect();
        } else {
          setIsAuthenticated(true);
          // Perform additional actions after successful login for 'plug'

          // Optionally, create an actor here and assign it to the auth client
          // actor = createActor(canisterId, {
          //   agentOptions: {
          //     identity: client.getIdentity(),
          //   },
          // });
          // setWhoamiActor(actor as any);
        }
      }
    } catch (error) {
      console.error('Error updating client:', error);
      // Handle errors if needed
    }
  }

  async function logout() {
    if (authClient) {
      await (authClient as AuthClient).logout();
      await updateClient(authClient, 'ii');
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
    setIsAuthenticated,
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
