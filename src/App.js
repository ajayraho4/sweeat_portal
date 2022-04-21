import './App.css';
import Login from './pages/Login';
import Store from './pages/Store';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/register" exact={true} element={ <Signup /> } />
          <Route path="/store" exact={true} element={ <Store /> } />
          <Route path="/" element={ <Login /> } />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
