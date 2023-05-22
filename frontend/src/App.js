import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Container from 'react-bootstrap/Container';
import CartPage from './pages/CartPage';
import Navbar from './components/Navbar';
import SignInPage from './pages/SignInPage';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <header>
          <Navbar />
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
