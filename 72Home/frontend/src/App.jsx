import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/HomePage";
import Evaluator from "./pages/evaluator/Evaluator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/evaluation" element={<Evaluator />} />
      </Routes>
    </Router>
  );
}

export default App;
