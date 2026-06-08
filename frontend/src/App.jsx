import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import AnalyzeResume from "./pages/AnalyzeResume";
import RewriteResume from "./pages/RewriteResume";
import CoverLetter from "./pages/CoverLetter";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<AnalyzeResume />} />
          <Route path="/rewrite" element={<RewriteResume />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;