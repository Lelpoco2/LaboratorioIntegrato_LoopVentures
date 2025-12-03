import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Homepage from "./pages/homepage/HomePage";

// Lazy load routes that aren't immediately needed
const Evaluator = lazy(() => import("./pages/evaluator/Evaluator/Evaluator"));
const LoginPage = lazy(() => import("./pages/login/LoginPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Caricamento...</div>}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/evaluation" element={<Evaluator />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
