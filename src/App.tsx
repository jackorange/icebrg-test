import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Search from './pages/Search';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
