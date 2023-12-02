import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeamSelectPage from './Pages/TeamSelect';
import BattlePage from './Pages/Battle';
import TeamPickPage from './Pages/TeamPick';


const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" exact element={<TeamPickPage />} />
          <Route path="/team-select" element={<TeamSelectPage />} />
          <Route path="/battle-page" element={<BattlePage />} />
        </Routes>
    </Router>
  );
};

export default App;

