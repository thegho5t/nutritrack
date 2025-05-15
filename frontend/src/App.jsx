import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import  Landingpage  from './components/Landingpage.jsx';
import LoginPage from './components/Signin.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
