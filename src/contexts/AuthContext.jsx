import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('isAuthenticated'));
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'John Doe');
  const navigate = useNavigate();

  // Mock database of registered organization usernames
  // In a real application, this would be validated against a server API
  const registeredUsers = [
    { username: 'test@example.com', hasPassword: true },
    { username: 'admin@example.com', hasPassword: false },
    { username: 'user@example.com', hasPassword: false }
  ];

  const login = (username, password) => {
    // Return the Promise from fetch
    return fetch('http://localhost:8000/api/login/', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.key) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userName', username);
        localStorage.setItem('token', data.key);
        console.log('Login successful '+data.key);
        setUserName(username);
        setIsAuthenticated(true);
        navigate('/');
        return true;
      } else {
        return false;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      return false;
    });
  };

  const createPassword = (username, password) => {
    // Check if the username is registered in the organization
    const userExists = registeredUsers.some(u => u.username === username && !u.hasPassword);
    
    if (userExists) {
      // In a real application, this would make an API call to set the password
      // For demo purposes, we'll simulate an async operation with a Promise
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userName', username);
          setUserName(username);
          setIsAuthenticated(true);
          navigate('/');
          resolve(true);
        }, 1000); // Simulate network delay
      });
    }
    
    return Promise.resolve(false);
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const updateUserName = (name) => {
    localStorage.setItem('userName', name);
    setUserName(name);
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      userName, 
      updateUserName,
      createPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
