import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import NewHotel from './pages/newProduct/newProduct';
import Products from './pages/products/products';
import { useState } from 'react';
import Chat from './pages/chat/chat';

function App() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const role = JSON.parse(localStorage.getItem('role'));
  if (!userId) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else {
    if (role === 'admin') {
      return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path='/products' element={<Products />} />
              <Route path='/chat' element={<Chat />} />
              <Route path="/newproduct" element={<NewHotel />} />
            </Routes>
          </BrowserRouter>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route index element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )
    }
  }
}

export default App;
