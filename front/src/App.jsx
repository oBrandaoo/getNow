import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/header/navbar';

import Home from './pages/Home/home';
import Login from './pages/Login/login';
import Product from './pages/Products/products';
import Services from './pages/Services/services';
import Reports from './pages/Reports/reports';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;