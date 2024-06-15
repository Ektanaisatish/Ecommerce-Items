
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Product from "./views/Product.js";
import { AuthProvider } from './contexts/AuthContext';
import Login from "./Auth/Login.js";
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <AuthProvider>  
       <Router>
      <div className="App">
        <React.Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/products" element={<Product />} />
          </Routes>
        </React.Fragment>
      </div>
    </Router>
    <
      Toaster />
    </AuthProvider>

  );
}

export default App;
