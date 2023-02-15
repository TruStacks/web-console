import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";

// contexts
import { AppStatusProvider } from "./hooks/appStatus";

// CSS files
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppStatusProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AppStatusProvider>
    </div>
  );
}

export default App;
