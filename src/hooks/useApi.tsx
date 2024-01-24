import { ReactNode, createContext, useContext, useMemo } from 'react';
import { API_LOGIN, API_LOGIN_REFRESH, API_SEARCH } from '../constants';
import { useNavigate } from 'react-router-dom';
import { ApiError, RefreshTokenResult, SearchResult, User } from '../types';
import { httpSettings } from '../utils';

interface ApiContextType {
  login: (email: string, password: string) => Promise<void>;
  search: (query: string) => Promise<SearchResult | ApiError>;
  updateToken: () => Promise<void>;
}

export const ApiContext = createContext<ApiContextType>({} as ApiContextType);

export const ApiProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const body = JSON.stringify({ email, password });
    await fetch(API_LOGIN, {
      ...httpSettings,
      body,
    })
      .then((response) => response.json())
      .then((data: User) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        data.access_token && navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const body = JSON.stringify({ refresh_token: refreshToken });
    await fetch(API_LOGIN_REFRESH, {
      ...httpSettings,
      body,
    })
      .then((response) => response.json())
      .then((data: RefreshTokenResult) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const search = async (query: string) => {
    const body = JSON.stringify({ query });
    return await fetch(API_SEARCH, {
      ...httpSettings,
      body,
    })
      .then((response) => response.json())
      .then(async (data: SearchResult | ApiError) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  };

  const memoedValue = useMemo(
    () => ({
      login,
      search,
      updateToken,
    }),
    []
  );
  return <ApiContext.Provider value={memoedValue}>{children}</ApiContext.Provider>;
};

export const useApi = () => {
  return useContext(ApiContext);
};
