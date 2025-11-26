import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";

export default function App(){
  return(
    <BrowserRouter>
    <Routes>
      <Route path ="/" element={<Home/>} />
      <Route path ="/Weather/:city" element={<Weather/>}/>
    </Routes>
    </BrowserRouter>
  )
}