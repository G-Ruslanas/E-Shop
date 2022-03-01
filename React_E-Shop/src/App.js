import Home from "./pages/Home";
import Product from "./pages/Product";
import ProductsList from "./pages/ProductsList";
import Cart from "./pages/Cart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/products/:brand" element={<ProductsList />} />
          <Route path="/products/sales/:sale" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
