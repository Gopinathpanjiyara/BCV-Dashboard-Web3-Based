import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { SessionProvider } from './contexts/SessionContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Layout from './components/Layout';
import Overview from './pages/Overview';
import ViewStatus from './pages/ViewStatus';
import AddCandidate from './pages/AddCandidate';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import Login from './pages/Login';
import SessionTimeoutWarning from './components/SessionTimeoutWarning';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="status" element={<ViewStatus />} />
        <Route path="add-candidate" element={<AddCandidate />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <SessionProvider>
            <NotificationProvider>
              <div className="min-h-screen bg-background text-gray-100">
                <AppContent />
                <SessionTimeoutWarning />
              </div>
            </NotificationProvider>
          </SessionProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
