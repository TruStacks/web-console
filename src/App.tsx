import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import Home from "./pages/Home";

// contexts
import { WebSocketEventsProvider } from "./hooks/webSocketEvents";
import { ToolchainStateProvider } from "./hooks/toolchainState";

// CSS files
import "./App.css";
import Applications from "./pages/Applications";
import NewApplication from "./pages/NewApplication";
import Stacks from "./pages/Stacks";

function App() {
  return (
    <WebSocketEventsProvider>
      <ToolchainStateProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<NewApplication />} />
              <Route path="/stacks" element={<Stacks />} />
            </Routes>
          </main>
        </Router>
      </ToolchainStateProvider>
    </WebSocketEventsProvider>
  );
}

export default App;
