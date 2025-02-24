import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AllTools from "./pages/AllTools";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        {/* Use Layout to wrap pages with Navbar & Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/alltools" element={<AllTools />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
