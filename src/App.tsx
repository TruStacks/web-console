import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";

// pages
import Home from "./pages/Home";

// contexts
import { AppStatusProvider } from "./hooks/appStatus";

// CSS files
import "./App.css";
import Applications from "./pages/Applications";

function App() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  // if (!isAuthenticated) { loginWithRedirect() }

  return (
    <AppStatusProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Router>
    </AppStatusProvider>
  );
}

export default App;
