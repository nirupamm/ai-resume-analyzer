import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AnalyzeResume from "./pages/AnalyzeResume";
import RewriteResume from "./pages/RewriteResume";
import CoverLetter from "./pages/CoverLetter";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyze" element={<AnalyzeResume />} />
        <Route path="/rewrite" element={<RewriteResume />} />
        <Route path="/cover-letter" element={<CoverLetter />} />
        <Route path="/history" element={<History />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;