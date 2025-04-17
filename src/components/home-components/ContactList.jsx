import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2, FiStar, FiUser, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import api from '../../axios';

function ContactList({ 
  contacts, 
  onEditContact, 
  onDeleteContact,
  refreshFlag 
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [localContacts, setLocalContacts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize user_id from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setUserId(user.id);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (contacts === null) { // Only fetch if parent isn't providing contacts
      getAllContacts();
    } else {
      setLoading(false);
    }
  }, [refreshFlag, contacts]);

  const getAllContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/contacts/${userId}`);
      setLocalContacts(response.data.contacts);
    } catch (error) {
      toast.error('Failed to fetch contacts');
      setLocalContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this contact?');
      if (!confirmDelete) return;

      if (onDeleteContact) {
        await onDeleteContact(contactId);
      } else {
        await api.delete(`/contacts/${contactId}`);
        setLocalContacts(prev => prev.filter(contact => contact.id !== contactId));
        toast.success('Contact deleted successfully');
      }
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  const filteredContacts = (contacts || localContacts).filter(contact => 
    contact.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.contact_phone?.includes(searchTerm) ||
    contact.contact_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-white rounded-lg shadow-md border border-gray-200 p-6'>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Your Contacts</h2>
          <p className="text-gray-600 text-sm">
            {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredContacts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-gray-600 text-lg mb-2">No contacts found</p>
          {searchTerm ? (
            <p className="text-gray-500 text-sm">Try a different search term</p>
          ) : (
            <p className="text-gray-500 text-sm">Add your first contact to get started</p>
          )}
        </div>
      ) : (
        <div className="grid gap-3 max-h-[450px] overflow-y-auto pr-2">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id} 
              className={`p-4 rounded-lg border border-gray-200 transition-all ${
                contact.contact_favorite 
                  ? 'bg-blue-50 border-l-4 border-blue-500' 
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-800 truncate flex items-center gap-2">
                      {contact.contact_favorite ? (
                        <FiStar className="text-yellow-400 flex-shrink-0" />
                      ) : (
                        <FiUser className="text-gray-500 flex-shrink-0" />
                      )}
                      {contact.contact_name}
                    </h3>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    {contact.contact_phone && (
                      <p className="text-gray-700 flex items-center gap-2">
                        <FiPhone className="text-gray-500 flex-shrink-0" /> 
                        <span className="truncate">{contact.contact_phone}</span>
                      </p>
                    )}
                    
                    {contact.contact_email && (
                      <p className="text-gray-600 flex items-center gap-2">
                        <FiMail className="text-gray-500 flex-shrink-0" /> 
                        <span className="truncate">{contact.contact_email}</span>
                      </p>
                    )}
                    
                    {contact.contact_address && (
                      <p className="text-gray-600 flex items-start gap-2 w-full">
                        <FiMapPin className="text-gray-500 flex-shrink-0 mt-0.5" /> 
                        <span className="truncate">{contact.contact_address}</span>
                      </p>
                    )}
                  </div>
                  
                  {contact.contact_gender && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 text-xs">
                      {contact.contact_gender}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2 flex-shrink-0">
                  <button 
                    onClick={() => onEditContact(contact)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Edit contact"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(contact.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete contact"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ContactList;