import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import Evaluator from "./pages/evaluator/Evaluator/Evaluator";
import LoginPage from "./pages/login/LoginPage";
import Dashboard from "./pages/dashboard/DashBoard";
import AgentsPage from "./pages/dashboard/pages/agents/AgentsPage";
import UsersPage from "./pages/dashboard/pages/users/UsersPage";
import PropertiesPage from "./pages/dashboard/pages/properties/PropertiesPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/evaluation" element={<Evaluator />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/agenti" element={<ProtectedRoute><AgentsPage /></ProtectedRoute>} />
        <Route path="/dashboard/utenti" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
        <Route path="/dashboard/immobili" element={<ProtectedRoute><PropertiesPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
