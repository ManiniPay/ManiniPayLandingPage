import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ManiniPayLanding from "./components/ManiniPayLanding";
import HowItWorks from "./components/HowItWorks";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ManiniPayLanding />
              <HowItWorks />
            </>
          }
        />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
