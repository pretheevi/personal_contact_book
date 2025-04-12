import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../axios';
import { toast } from 'react-toastify';

function ForgotPassword() {
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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: ''
    };

    // Email validation
    if (!inputs.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    // Password validation
    if (!inputs.password) {
      newErrors.password = 'New password is required';
      valid = false;
    } else if (inputs.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await api.post('/forgot-password', inputs);
  
      if (response.status === 200) {
        toast.success('Password reset successful! You can now log in.');
        setIsSubmitted(true);
      } else {
        toast.error(response.data.message || 'Password reset failed. Please try again.');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
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
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" 
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#584c61] mb-2">Reset Password</h1>
          <p className="text-[#584c61]/80 text-sm">
            {isSubmitted 
              ? "Your password has been updated successfully!"
              : "Enter your email and new password"}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                  errors.email ? 'border border-red-500' : 'border-none'
                }`}
                type="email"
                id="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                New Password <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                  errors.password ? 'border border-red-500' : 'border-none'
                }`}
                type="password"
                id="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              <p className="mt-1 text-xs text-[#584c61]/60">Password must be at least 6 characters</p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
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
                  'Reset Password'
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-green-500 mx-auto mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <button
              onClick={handleBackToLogin}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
            >
              Back to Login
            </button>
          </div>
        )}

        {!isSubmitted && (
          <div className="mt-6 text-center">
            <p className="text-sm text-[#584c61]/80 flex justify-center">
              Remember your password?{' '}
              <span 
                className="font-medium text-purple-700 hover:text-purple-600 cursor-pointer pl-1"
                onClick={handleBackToLogin}
              >
                Login here
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;