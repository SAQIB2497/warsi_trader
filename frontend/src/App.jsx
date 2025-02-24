import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllTools from "./pages/AllTools";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Routes inside Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            {/* Protected Route for AllTools */}
            <Route element={<ProtectedRoute />}>
              <Route path="alltools" element={<AllTools />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
