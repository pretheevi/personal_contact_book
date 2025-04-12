import React, { useEffect, useState } from 'react';
import { FiUser, FiPhone, FiMail, FiMapPin, FiStar, FiX, FiCheck } from 'react-icons/fi';

function AddContact({ onAddContact, refreshForm, setRefreshForm }) {
    const [formData, setFormData] = useState({
        contact_name: '',
        contact_phone: '',
        contact_email: '',
        contact_address: '',
        contact_gender: '',
        contact_favorite: false,
        user_id: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize user_id from localStorage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.id) {
            setFormData(prev => ({ ...prev, user_id: user.id }));
        }
    }, []);

    const resetForm = () => {
        setFormData({
            contact_name: '',
            contact_phone: '',
            contact_email: '',
            contact_address: '',
            contact_gender: '',
            contact_favorite: false,
            user_id: formData.user_id // Preserve user_id
        });
    };

    useEffect(() => {
        if (refreshForm) {
            resetForm();
            setRefreshForm(false); // Reset the refreshForm state
        }
    }, [refreshForm])

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await onAddContact(formData);
        } catch (error) {
            console.error("Error adding contact:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg transition-all hover:shadow-xl'>
            <div className='flex flex-col md:flex-row justify-between items-center mb-6'>
                <h3 className='text-1xl font-bold text-gray-800'>Add New Contact</h3>
                <div className='flex gap-2'>
                    <button
                        onClick={resetForm}
                        disabled={isSubmitting}
                        className='flex items-center gap-1 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg px-3 py-2 text-gray-700 text-sm font-medium disabled:opacity-50'
                    >
                        <FiX size={16} /> Clear
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className='flex items-center gap-1 bg-purple-600 hover:bg-purple-700 transition-colors rounded-lg px-4 py-2 text-white text-sm font-medium disabled:opacity-50'
                    >
                        {isSubmitting ? (
                            'Adding...'
                        ) : (
                            <>
                                <FiCheck size={16} /> Add Contact
                            </>
                        )}
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Name Field */}
                <div className='space-y-1'>
                    <label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
                        <FiUser size={16} /> Name
                    </label>
                    <input
                        className='w-full bg-white/90 border border-gray-200 rounded-lg px-4 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                        type="text"
                        name='contact_name'
                        value={formData.contact_name}
                        onChange={handleInputChange}
                        placeholder='John Doe'
                        required
                    />
                </div>

                {/* Phone Field */}
                <div className='space-y-1'>
                    <label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
                        <FiPhone size={16} /> Phone
                    </label>
                    <input
                        className='w-full bg-white/90 border border-gray-200 rounded-lg px-4 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                        type="tel"
                        name='contact_phone'
                        value={formData.contact_phone}
                        onChange={handleInputChange}
                        placeholder='+1 (123) 456-7890'
                        required
                    />
                </div>

                {/* Email Field */}
                <div className='space-y-1'>
                    <label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
                        <FiMail size={16} /> Email
                    </label>
                    <input
                        className='w-full bg-white/90 border border-gray-200 rounded-lg px-4 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
                        type="email"
                        name='contact_email'
                        value={formData.contact_email}
                        onChange={handleInputChange}
                        placeholder='john@example.com'
                    />
                </div>

                {/* Address Field */}
                <div className='space-y-1'>
                    <label className='flex items-center gap-2 text-gray-700 text-sm font-medium'>
                        <FiMapPin size={16} /> Address
                    </label>
                    <textarea
                        className='w-full bg-white/90 border border-gray-200 rounded-lg px-4 py-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all min-h-[80px]'
                        name='contact_address'
                        value={formData.contact_address}
                        onChange={handleInputChange}
                        placeholder='123 Main St, City, Country'
                        rows="3"
                    />
                </div>

                {/* Gender Field */}
                <div className='space-y-2'>
                    <label className='text-gray-700 text-sm font-medium block'>Gender</label>
                    <div className='flex flex-wrap gap-4'>
                        {['male', 'female', 'other'].map((gender) => (
                            <label key={gender} className='flex items-center gap-2 text-gray-700 cursor-pointer'>
                                <input
                                    type="radio"
                                    name="contact_gender"
                                    value={gender}
                                    checked={formData.contact_gender === gender}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                                />
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Favorite Checkbox */}
                <div className='flex items-center gap-2 pt-2'>
                    <input
                        type="checkbox"
                        id="favorite"
                        name="contact_favorite"
                        checked={formData.contact_favorite}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor="favorite" className='flex items-center gap-2 text-gray-700 text-sm font-medium cursor-pointer'>
                        <FiStar size={16} /> Mark as Favorite
                    </label>
                </div>
            </form>
        </div>
    );
}

export default AddContact;