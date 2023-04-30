import './App.css';
import axios from 'axios';
import Header from './component/layout/Header/Header.js';
import { Routes, Route, Navigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState, useEffect } from 'react';
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
import UpdatePassword from './component/User/UpdatePassword.js';
import ForgotPassword from './component/User/ForgotPassword.js';
import ResetPassword from './component/User/ResetPassword.js';
import Cart from './component/Cart/Cart.js';
import Shipping from './component/Cart/Shipping.js';
import ConfirmOrder from './component/Cart/ConfirmOrder.js';
import Payment from './component/Cart/Payment.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess.js';
import MyOrders from './component/Order/MyOrders.js';
import OrderDetails from './component/Order/OrderDetails.js';
import DashBoard from './component/admin/DashBoard.js';
import ProductList from './component/admin/ProductList.js';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from './component/admin/OrderList.js';
import ProcessOrder from './component/admin/ProcessOrder';
import UsersList from './component/admin/UsersList';
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from './component/admin/ProductReviews';
import NotFound from './component/layout/Not Found/NotFound';

function App() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  const WrapThePaymentComponent = () => {
    return (
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Payment />
      </Elements>
    );
  };

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
            loading === false && isAuthenticated === false ? (
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
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UpdateProfile />
            )
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UpdatePassword />
            )
          }
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/Cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <Shipping />
            )
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <ConfirmOrder />
            )
          }
        />

        <Route
          exact
          path="/process/payment"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              WrapThePaymentComponent()
            )
          }
        />

        <Route
          exact
          path="/success"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <OrderSuccess />
            )
          }
        />

        <Route
          exact
          path="/orders"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <MyOrders />
            )
          }
        />

        <Route
          exact
          path="/order/:id"
          element={
            loading === false && isAuthenticated === false ? (
              <Navigate replace to={'/login'} />
            ) : (
              <OrderDetails />
            )
          }
        />

        <Route
          exact
          path="/admin/dashboard"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <DashBoard />
            )
          }
        />

        <Route
          exact
          path="/admin/products"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <ProductList />
            )
          }
        />

        <Route
          exact
          path="/admin/product"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <NewProduct />
            )
          }
        />

        <Route
          exact
          path="/admin/product/:id"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UpdateProduct />
            )
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <OrderList />
            )
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <ProcessOrder />
            )
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UsersList />
            )
          }
        />

        <Route
          exact
          path="/admin/user/:id"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <UpdateUser />
            )
          }
        />

        <Route
          exact
          path="/admin/reviews"
          element={
            loading === false &&
            (isAuthenticated === false || (user && user.role !== 'admin')) ? (
              <Navigate replace to={'/login'} />
            ) : (
              <ProductReviews />
            )
          }
        />

        <Route exact path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
