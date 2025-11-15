import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import LoginSignup from "@/pages/loginSignup";
import DashboardPage from "@/pages/dashboard";
import ProtectedRoute from "@/components/login/ProtectedRoute";
import UnProtectedRoute from "@/components/login/UnProtectedRoute";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route element={<UnProtectedRoute />}>
          <Route path="/login" element={<LoginSignup type="login" />} />
          <Route path="/sign-up" element={<LoginSignup type="sign-up" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Router>
  );
}

export default App;
