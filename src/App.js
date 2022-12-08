import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Hotel from './pages/hotel/hotel';
import NewHotel from './pages/newHotel/newHotel';
import Transaction from './pages/transaction/transaction';
import Room from './pages/room/room';
import NewRoom from './pages/newRoom/newRoom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/admin' element={<Home />} />
          <Route path='/hotel' element={<Hotel />} />
          <Route path='/room' element={<Room />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path="/newhotel" element={<NewHotel />} />
          <Route path="/newroom" element={<NewRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
