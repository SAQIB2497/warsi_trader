import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllTools from "./pages/AllTools";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/AdminDashboard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./pages/CheckoutForm.jsx";
import Loader from "./components/Loader.jsx"; // ✅ Import Loader

const stripePromise = loadStripe(
  "pk_test_51R00RAAckituSiIC0VLHG3OU8H8JioiIUmscPu5xBwEZYnPoE2tc9S63eoSAc5txcRmuHd8VxpmwdT6nnlxpdEG500ahgabPbk"
);

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Router>
        <Loader /> {/* ✅ Moved inside <Router> */}
        <Elements stripe={stripePromise}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Routes inside Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutForm />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="alltools" element={<AllTools />} />
              </Route>
              <Route element={<ProtectedRoute />}>
                <Route path="/adminDashboard" element={<AdminDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Elements>
      </Router>
    </>
  );
};


export default App;
