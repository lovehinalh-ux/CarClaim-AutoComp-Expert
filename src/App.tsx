import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ToolPage from './pages/ToolPage';

import { ClaimProvider } from './context/ClaimContext';
import PreviewPage from './pages/PreviewPage';

const App: React.FC = () => {
  return (
    <Router>
      <ClaimProvider>
        <Routes>
          <Route path="/" element={<ToolPage />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </ClaimProvider>
    </Router>
  );
};

export default App;
