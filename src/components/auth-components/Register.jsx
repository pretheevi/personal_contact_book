import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import api from '../../axios';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    gender: '',
    phone: '',
    email: '',
    password: ''
  });
  const [showTerms, setShowTerms] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev => ({...prev, [name]: value}));
    if (errors[name]) {
      setErrors(prev => ({...prev, [name]: ''}));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: '',
      gender: '',
      phone: '',
      email: '',
      password: ''
    };

    if (!inputs.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    if (!inputs.gender) {
      newErrors.gender = 'Please select a gender';
      valid = false;
    }

    if (!inputs.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,15}$/.test(inputs.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }

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
      const response = await api.post('/register', inputs);
      if (response.status === 201) {
        toast.success('Registration successful. Please login.');
        navigate('/login');
      } else {
        toast.error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {showTerms ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Terms & Conditions</h2>
              <button 
                onClick={toggleTerms}
                className="text-blue-600 hover:text-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-gray-600 space-y-3 max-h-[400px] overflow-y-auto pr-2">
              <h3 className="font-medium">1. Data Collection</h3>
              <p>This contact app collects and stores the personal information you provide, including names, phone numbers, and email addresses.</p>
              
              <h3 className="font-medium">2. Data Usage</h3>
              <p>Your contact information will only be used to provide the contact management services within this application.</p>
              
              <h3 className="font-medium">3. Data Storage</h3>
              <p>All data is stored locally on your device. We do not currently provide cloud backup services.</p>
              
              <h3 className="font-medium">4. Account Responsibility</h3>
              <p>You are responsible for maintaining the confidentiality of your account credentials.</p>
              
              <h3 className="font-medium">5. Limitation of Liability</h3>
              <p>This application is provided "as is" without warranty of any kind. We are not liable for any data loss.</p>
              
              <h3 className="font-medium">6. Changes to Terms</h3>
              <p>These terms may be updated periodically. Continued use of the app constitutes acceptance.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">Create Your Account</h1>
              <p className="text-gray-600 text-sm">Join us to manage your contacts</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  type="text"
                  id="name"
                  name="name"
                  value={inputs.name}
                  onChange={handleOnChange}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={inputs.phone}
                  onChange={handleOnChange}
                  placeholder="1234567890"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>

              {/* Gender Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Male', 'Female', 'Other'].map((gender) => (
                    <div key={gender} className="flex items-center">
                      <input
                        type="radio"
                        id={`gender-${gender.toLowerCase()}`}
                        name="gender"
                        value={gender.toLowerCase()}
                        checked={inputs.gender === gender.toLowerCase()}
                        onChange={handleOnChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <label htmlFor={`gender-${gender.toLowerCase()}`} className="ml-2 block text-sm text-gray-700">
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
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

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
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
                <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters</p>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                </div>
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <button 
                    type="button"
                    onClick={toggleTerms}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
                    'Register'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => navigate('/login')} 
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Log in
                </button>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;