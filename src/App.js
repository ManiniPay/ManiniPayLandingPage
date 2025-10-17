import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ManiniPayLanding from "./components/ManiniPayLanding";
import HowItWorks from "./components/HowItWorks";
import Contact from "./components/contactSection";
import Privacy from "./components/privacy"; // Import the Privacy component
import Terms from "./components/terms"; // Import the Terms component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManiniPayLanding />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </Router>
  );
}

export default App;
