import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { getCookie, setCookie } from './cookie';
import API from './API/api';

const TokenContext = createContext();

const setTokenCookie = (token) => {
  const date = new Date(Date.now() + 7 * 86400e3);
  setCookie('token', token, { expires: date });
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
            API.fetchToken()
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
