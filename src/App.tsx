import React, {useEffect, useState} from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";

// pages
import Home from "./pages/Home";

// contexts
import { ToolchainStateProvider } from "./hooks/toolchainState";

// CSS files
import "./App.css";
import Applications from "./pages/Applications";

function App() {
   return (
    <ToolchainStateProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Router>
    </ToolchainStateProvider>
  );
}

export default App;
