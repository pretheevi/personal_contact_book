import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../axios';
import { toast } from 'sonner';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    } else if (inputs.password.length < 6) {
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
  
    setIsLoading(true);
  
    try {
      const response = await api.post('/login', inputs);
      
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.success(response.data.message || 'Login successful!', {
          autoClose: 2000
        });
        
        navigate("/home");
      } else {
        toast.error('Unexpected response from server', {
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
      
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">Contact Manager</h1>
          <p className="text-gray-600 text-sm">Sign in to access your contacts</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <button 
                type="button"
                onClick={() => navigate('/forgot-password')} 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70"
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
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate('/register')} 
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;