import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { ArrowPathIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import logo from '../assets/logo.svg';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCreatingPassword, setIsCreatingPassword] = useState(false);
  const [isValidatingUsername, setIsValidatingUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, createPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    if (isCreatingPassword) {
      // Password creation logic
      if (credentials.password !== credentials.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      if (credentials.password.length < 8) {
        setError('Password must be at least 8 characters long');
        setIsLoading(false);
        return;
      }
      
      try {
        const result = await createPassword(credentials.username, credentials.password);
        if (!result) {
          setError('Failed to create password. Please try again.');
        } else {
          setSuccess('Password created successfully! Redirecting...');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Normal login
      try {
        const result = await login(credentials.username, credentials.password);
        if (!result) {
          setError('Invalid credentials');
        } else {
          setSuccess('Login successful! Redirecting...');
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleValidateUsername = async () => {
    if (!credentials.username.trim()) {
      setError('Please enter a username');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call to validate username
    setTimeout(() => {
      // This would be replaced with actual API validation
      const isValid = credentials.username.includes('@'); // Simple validation for demo
      
      if (isValid) {
        setIsValidatingUsername(false);
        setIsCreatingPassword(true);
        setError('');
      } else {
        setError('Username not registered in the system');
      }
      setIsLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setCredentials({ username: '', password: '', confirmPassword: '' });
    setIsCreatingPassword(false);
    setIsValidatingUsername(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background-lighter flex items-center justify-center p-4 perspective-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, rotateX: -5 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ 
          duration: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        className="w-full max-w-md"
      >
        <motion.div
          whileHover={{ 
            scale: 1.02,
            rotateX: 2,
            rotateY: -1,
            boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-gradient-to-br from-background-lighter to-background rounded-2xl shadow-neumorph overflow-hidden transform-gpu"
        >
          <div className="p-8">
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex flex-col items-center mb-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotateZ: 180 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
                className="w-20 h-20 flex items-center justify-center mb-4 transform-gpu hover:rotate-6 transition-transform duration-300"
              >
                <motion.img 
                  src={logo} 
                  alt="BVC Logo" 
                  className="w-14 h-14"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                BVC Dashboard
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 mt-2"
              >
                {isCreatingPassword ? 'Create your password' : (isValidatingUsername ? 'Validate your organization username' : 'Sign in to your organization')}
              </motion.p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field - Always visible */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Username
                </label>
                <div className="group relative">
                  <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    className="w-full px-4 py-3 bg-background rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-white placeholder-gray-500 outline-none hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent group-hover:border-primary/30"
                    placeholder="Enter your organization username"
                    required
                    disabled={isCreatingPassword}
                  />
                </div>
              </motion.div>

              {/* Password Fields - Shown conditionally */}
              {(!isValidatingUsername || isCreatingPassword) && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Password
                  </label>
                  <div className="group relative">
                    <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="w-full px-4 py-3 bg-background rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-white placeholder-gray-500 outline-none hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent group-hover:border-primary/30"
                      placeholder={isCreatingPassword ? "Create your password" : "Enter your password"}
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Confirm Password Field - Only shown when creating password */}
              {isCreatingPassword && (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Confirm Password
                  </label>
                  <div className="group relative">
                    <div className="absolute left-0 top-[7.5%] w-0.5 h-[85%] rounded-full bg-gradient-to-b from-primary/0 via-primary to-primary/0 opacity-0 transform scale-y-0 origin-center transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100" />
                    <input
                      type="password"
                      value={credentials.confirmPassword}
                      onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-background rounded-xl border-2 border-primary/20 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all duration-300 text-white placeholder-gray-500 outline-none hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent group-hover:border-primary/30"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-red-400 text-sm mt-2"
                >
                  <XCircleIcon className="h-5 w-5 mr-1.5" />
                  <p>{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center text-green-400 text-sm mt-2"
                >
                  <CheckCircleIcon className="h-5 w-5 mr-1.5" />
                  <p>{success}</p>
                </motion.div>
              )}

              {/* Action Buttons */}
              {isValidatingUsername ? (
                <motion.button
                  type="button"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleValidateUsername}
                  disabled={isLoading}
                  className="relative w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium transform-gpu transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 font-semibold tracking-wide">
                    {isLoading ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        Validating...
                      </>
                    ) : (
                      'Validate Username'
                    )}
                  </span>
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="relative w-full py-3 px-4 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl font-medium transform-gpu transition-all duration-300 overflow-hidden group focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 font-semibold tracking-wide">
                    {isLoading ? (
                      <>
                        <ArrowPathIcon className="h-5 w-5 animate-spin" />
                        {isCreatingPassword ? 'Creating...' : 'Signing in...'}
                      </>
                    ) : (
                      <>
                        {isCreatingPassword ? 'Create Password' : 'Sign In'}
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5"
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          initial={false}
                          animate={{ x: [-2, 2, -2], opacity: [0.7, 1, 0.7] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </motion.svg>
                      </>
                    )}
                  </span>
                </motion.button>
              )}
            </form>

            {/* Toggle between login and create password */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  if (isCreatingPassword || isValidatingUsername) {
                    resetForm();
                  } else {
                    setIsValidatingUsername(true);
                    setError('');
                  }
                }}
                className="text-primary hover:text-primary/80 text-sm transition-colors"
              >
                {isCreatingPassword || isValidatingUsername ? 'Back to Sign In' : 'First time? Create password'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
