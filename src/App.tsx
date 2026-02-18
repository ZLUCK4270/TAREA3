import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more nested routes here later */}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
