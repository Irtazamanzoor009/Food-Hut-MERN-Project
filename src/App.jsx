import { useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Orders from "./Components/Cart/Orders";
import Cart from "./Components/Cart/Cart";
import HomePage from "./Components/HomePage/HomePage";
import SignIn from "./Components/Login/SignIn";
import SignUp from "./Components/Login/SignUp";
import Contact from "./Components/ContactUs/Contact";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/contactus" element={<Contact/>}></Route>
          <Route path="/myorders" element={<Orders />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
