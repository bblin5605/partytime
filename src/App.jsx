import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CompareGame from './pages/CompareGame';
import BombGame from './pages/BombGame';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<CompareGame />} />
        <Route path="/bomb" element={<BombGame />} />
      </Routes>
    </Router>
  );
}

export default App;
