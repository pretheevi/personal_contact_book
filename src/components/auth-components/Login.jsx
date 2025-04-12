import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({...prev, [name]: value}));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!inputs.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!inputs.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (inputs.password.length < 3) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting', { autoClose: 3000 });
      return;
    }
  
    setIsLoading(true); // Start loading
  
    try {
      const response = await api.post('/login', inputs);
      
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.update({
          render: response.data.message || 'Login successful!',
          type: 'success',
          isLoading: false,
          autoClose: 2000
        });
        
        navigate("/home");
      } else {
        toast.update({
          render: 'Unexpected response from server',
          type: 'error',
          isLoading: false,
          autoClose: 3000
        });
      }
    } catch (err) {
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = err.response.data.message || 'Invalid request';
            break;
          case 401:
            errorMessage = err.response.data.message || 'Invalid credentials';
            break;
          case 404:
            errorMessage = err.response.data.message || 'User not found';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
        }
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      toast.error(errorMessage, { autoClose: 3000 });
      
      console.error('Login error:', {
        error: err,
        response: err.response,
        request: err.request
      });
    } finally {
      setIsLoading(false); // Stop loading regardless of success/error
    }
  };

  const handleSignUpLink = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#71618d] to-[#dcd4da] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-purple-700" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#584c61] mb-2">Your Personal Contact Book</h1>
          <p className="text-[#584c61]/80 text-sm">Sign in to access your contacts</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#584c61]/80 mb-1">
              Email
            </label>
            <input
              className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                errors.email ? 'border border-red-500' : 'border-none'
              }`}
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleOnChange}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#584c61]/80 mb-1">
              Password
            </label>
            <input
              className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                errors.password ? 'border border-red-500' : 'border-none'
              }`}
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleOnChange}
              placeholder="••••••••"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 accent-purple-500 focus:ring-purple-500 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#584c61]/80">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <p onClick={() => navigate('/forgot-password')} className="cursor-pointer font-medium text-purple-700 hover:text-purple-600">
                Forgot password?
              </p>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition disabled:opacity-80"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-[#584c61]/80 flex justify-center">
            Don't have an account?{' '}
            <span 
              className="font-medium text-purple-700 hover:text-purple-600 cursor-pointer pl-1"
              onClick={() => handleSignUpLink()}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;