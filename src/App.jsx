import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginSignup from "./pages/loginSignup";
import DashboardPage from "./pages/dashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginSignup type="login" />} />
        <Route path="/sign-up" element={<LoginSignup type="sign-up" />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
