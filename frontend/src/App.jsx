import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Container } from 'react-bootstrap';
import PageNotFound from './screens/PageNotFound';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Importing toast styles
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100"> {/* ✅ Flexbox applied */}
      <Header />
      <main className="flex-grow-1 py-3"> {/* ✅ Stretchable main area */}
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />

            <Route path="" element={<PrivateRoute />} >
            <Route path="/shipping" element={<ShippingScreen />} />
            </Route>
               <Route path="" element={<PrivateRoute />} >
            <Route path="/payment" element={<PaymentScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />} >
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            </Route>
            <Route path="" element={<PrivateRoute />} >
  <Route path="/order/:id" element={<OrderScreen />} />
          </Route>

          </Routes>
        </Container>
      </main>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
