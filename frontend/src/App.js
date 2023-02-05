import './App.css';
import Header from './component/layout/Header/Header.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Products.js';
import Search from './component/Product/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import { loadUser } from './actions/userAction';
import store from './store';
import UserOptions from './component/layout/Header/UserOptions.js';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile.js';
import UpdateProfile from './component/User/UpdateProfile.js';

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/products/:keyword" element={<Products />} />
        <Route exact path="/Search" element={<Search />} />
        <Route
          exact
          path="/account"
          element={
            !loading && !isAuthenticated ? (
              <Navigate replace to={'/login'} />
            ) : (
              <Profile />
            )
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            !loading && !isAuthenticated ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UpdateProfile />
            )
          }
        />
        <Route exact path="/login" element={<LoginSignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
