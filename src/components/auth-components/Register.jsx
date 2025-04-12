import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import api from '../../axios';

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // Add loading state
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
    // Clear error when user types
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

    // Name validation
    if (!inputs.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    }

    // Gender validation
    if (!inputs.gender) {
      newErrors.gender = 'Please select a gender';
      valid = false;
    }

    // Phone validation
    if (!inputs.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,15}$/.test(inputs.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      valid = false;
    }

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
    if (validateForm()) {
      console.log('Registration data:', inputs);
      setIsLoading(true); // Start loading
      try {
        const response = await api.post('/register', inputs);
        if (response.status === 201) {  // Use 201 for successful creation
          toast.success('Registration successful. Please login.');
          navigate('/login');
        } else {
          toast.error(response.data.message); // no `.response` here
        }
      } catch (error) {
        // Handle error messages more safely
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong. Please try again.');
        }
      } finally {
        setIsLoading(false); // Stop loading regardless of success/error
      }
    }
  };
  

  const handleLoginLink = () => {
    navigate('/login');
  }

  const toggleTerms = () => {
    setShowTerms(!showTerms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#71618d] to-[#dcd4da] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-8">
        {showTerms ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#584c61]">Terms & Conditions</h2>
              <button 
                onClick={toggleTerms}
                className="text-purple-700 hover:text-purple-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            </div>
            
            <div className="text-sm text-[#584c61]/80 space-y-3 max-h-[400px] overflow-y-auto pr-2">
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-[#584c61] mb-2">Create Your Account</h1>
              <p className="text-[#584c61]/80 text-sm">Join us to manage your contacts</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* ... (keep all your existing form fields unchanged) ... */}
                          {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                  errors.name ? 'border border-red-500' : 'border-none'
                }`}
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
              <label htmlFor="phone" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                className={`w-full bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2.5 text-sm text-[#584c61] outline-none focus:ring-2 focus:ring-purple-500/50 transition ${
                  errors.phone ? 'border border-red-500' : 'border-none'
                }`}
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
              <label className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['male', 'female', 'other'].map((gender) => (
                  <div key={gender} className="flex items-center">
                    <input
                      type="radio"
                      id={`gender-${gender.toLowerCase()}`}
                      name="gender"
                      value={gender}
                      checked={inputs.gender === gender}
                      onChange={handleOnChange}
                      className="h-4 w-4 accent-purple-500 focus:ring-purple-500"
                    />
                    <label htmlFor={`gender-${gender.toLowerCase()}`} className="ml-2 block text-sm text-[#584c61]/80">
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
              {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Email <span className="text-red-500">*</span>
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

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#584c61]/80 mb-1">
                Password <span className="text-red-500">*</span>
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
              <p className="mt-1 text-xs text-[#584c61]/60">Password must be at least 6 characters</p>
            </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 accent-purple-500 focus:ring-purple-500 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-[#584c61]/80">
                  I agree to the{' '}
                  <span 
                    className="text-purple-700 hover:text-purple-600 cursor-pointer"
                    onClick={toggleTerms}
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
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
                Already have an account?{' '}
                <span 
                  className="font-medium text-purple-700 hover:text-purple-600 cursor-pointer pl-1"
                  onClick={handleLoginLink}
                >
                  Log in
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;