import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  // Sample user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    joinDate: 'Joined January 2023'
  };

  const handleEditProfile = () => {
    // navigate('/edit-profile');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#71618d] to-[#dcd4da] p-4 md:p-8">
      {/* Development Notice Banner */}
      <div className="max-w-6xl mx-auto mb-4 bg-yellow-100/80 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded-r-lg backdrop-blur-sm">
        <div className="flex items-start">
          <svg className="h-5 w-5 mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">Profile Under Development</p>
            <p className="text-sm">What you're seeing is dummy data. The real profile page is being worked on.</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Back button */}
        <button 
          onClick={handleBack}
          className="mb-4 md:mb-6 flex items-center text-[#584c61] hover:text-purple-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>

        {/* Main Content - flex-grow ensures it takes available space without overflowing */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden flex flex-col">
            {/* Profile Header */}
            <div className="bg-purple-600/10 p-6 text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 md:h-12 md:w-12 text-purple-700" 
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
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-[#584c61]">{user.name}</h1>
              <p className="text-[#584c61]/80 text-sm mt-1">{user.joinDate}</p>
            </div>

            {/* Profile Details */}
            <div className="p-6 space-y-4 flex-grow">
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#584c61]/70 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#584c61]/60">Email</p>
                    <p className="text-sm text-[#584c61]">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#584c61]/70 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-xs text-[#584c61]/60">Phone</p>
                    <p className="text-sm text-[#584c61]">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-4">
                <button
                  onClick={handleEditProfile}
                  className="flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/forgot-password')}
                  className="flex-1 py-2 px-4 rounded-lg text-xs md:text-sm font-medium text-purple-700 bg-white/70 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Contact Me Section - Added at the bottom of main card */}
            <div className="p-4 bg-purple-500/10 border-t border-purple-500/20">
              <h3 className="text-sm font-medium text-[#584c61] mb-2">Contact Developer</h3>
              <div className="flex flex-col space-y-2 text-sm">
                <a href="mailto:pretheeviraj0805@gmail.com" className="flex items-center text-[#584c61] hover:text-purple-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  pretheeviraj0805@gmail.com
                </a>
                <a href="tel:7708999817" className="flex items-center text-[#584c61] hover:text-purple-700 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 7708999817
                </a>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="space-y-4 lg:space-y-6">
            {/* Preferences Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-5">
              <h2 className="text-md font-semibold text-[#584c61] mb-3">Preferences</h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs md:text-sm text-[#584c61]/80">Dark Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-xs md:text-sm text-[#584c61]/80">Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-5">
              <h2 className="text-md font-semibold text-[#584c61] mb-3">Your Stats</h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-purple-500/10 p-2 rounded-lg text-center">
                  <p className="text-xs text-[#584c61]/60">Contacts</p>
                  <p className="text-lg font-bold text-[#584c61]">142</p>
                </div>
                <div className="bg-purple-500/10 p-2 rounded-lg text-center">
                  <p className="text-xs text-[#584c61]/60">Groups</p>
                  <p className="text-lg font-bold text-[#584c61]">8</p>
                </div>
                <div className="bg-purple-500/10 p-2 rounded-lg text-center">
                  <p className="text-xs text-[#584c61]/60">Since</p>
                  <p className="text-lg font-bold text-[#584c61]">2023</p>
                </div>
                <div className="bg-purple-500/10 p-2 rounded-lg text-center">
                  <p className="text-xs text-[#584c61]/60">Active</p>
                  <p className="text-lg font-bold text-[#584c61]">Today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;