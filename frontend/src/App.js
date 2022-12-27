import './App.css';
import Header from './component/layout/Header/Header.js';
import { Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';

function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  });

  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
