import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Search from './pages/Search';
import Login from './pages/Login';
import { ApiProvider } from './hooks/useApi';
import './App.css';
import { LOGIN_ROUTE, SEARCH_ROUTE } from './constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

const App = () => {
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    if (!localStorage.getItem('access_token')) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <ApiProvider>
          <Routes>
            <Route
              path={SEARCH_ROUTE}
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
            <Route path={LOGIN_ROUTE} element={<Login />} />
          </Routes>
        </ApiProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
