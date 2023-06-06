import './App.css';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import Nav from './components/Nav/Nav';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    const routeName = location.pathname.split("/").pop();  // Obtiene el último segmento de la ruta
    const pageTitle = routeName ? `KodaBase - ${routeName}` : "KodaBase";  // Concatena el título con la ruta

    document.title = pageTitle;  // Actualiza el título de la página
  }, [location]);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/dogs/:id" element={<Detail />} />
        <Route exact path="/form" element={<Form />} />
        <Route exact path="/form/:id" element={<Form />} />
      </Routes>
    </div>
  );
};

const RootApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default RootApp;
