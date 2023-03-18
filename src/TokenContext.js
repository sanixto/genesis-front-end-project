import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { getCookie, setCookie } from './cookie';
import handlerErrors from './handlerErrors';

const TokenContext = createContext();

const setTokenCookie = (token) => {
  const date = new Date(Date.now() + 7 * 86400e3);
  setCookie('token', token, { expires: date });
};

const fetchToken = () => {
  const url = 'https://api.wisey.app/api/v1/auth/anonymous';

  return fetch(`${url}?${new URLSearchParams({ platform: 'subscriptions' })}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(handlerErrors.get(response.status));
      }
      return response.json();
    })
    .then((data) => data.token);
};

export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token && !error) {
      new Promise((resolve) => {
        const tokCookie = getCookie('token');
        resolve(tokCookie);
      })
        .then((tokCookie) => {
          if (tokCookie) {
            setToken(tokCookie);
          } else {
            fetchToken()
              .then((tok) => {
                setToken(tok);
                setTokenCookie(tok);
              })
              .catch((err) => setError(err));
          }
        })
        .catch((err) => setError(err));
    }
  }, []);

  const value = useMemo(() => [token, error], [token, error]);
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}

export const useToken = () => useContext(TokenContext);
