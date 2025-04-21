import React, {useState, useEffect} from 'react';
import AddContact from './home-components/AddContact';
import EditContact from './home-components/EditContact';
import ContactList from './home-components/ContactList';
import api from '../axios';
import { FiMenu, FiX, FiUser, FiPlus, FiEdit2 } from 'react-icons/fi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

function Home() {  
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('contacts');
  const [userId, setUserId] = useState(null);
  
  // Initialize user_id from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) 
      setUserId(user.id);
  }, []);

  // Fetch contacts on component mount
  useEffect(() => {
    if (!userId) return;
  
    const fetchContacts = async () => {
      try {
        const response = await api.get(`/contacts/${userId}`);
        setContacts(response.data.contacts);
      } catch (error) {
        if(error.response.data.message === "No contacts found"){
          toast.error("Add your first contact");
        } else{
          toast.error(error.response.data.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchContacts();
  }, [userId]);

  const [refreshForm, setRefreshForm] = useState(false);
  const handleAddContact = async (newContact) => {
    try {
      if (!newContact.contact_name || !newContact.contact_phone) {
        toast.error("Name and phone are required");
        return;
      }
      if (!newContact.contact_gender) {
        toast.error("Gender is required"); 
        return;
      }
      if (newContact.contact_email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContact.contact_email))){
        toast.error("Please enter a valid email address"); 
        return;
      }
      const response = await api.post('/add-contact', newContact);
      setContacts(prev => [...prev, response.data.data]);
      toast.success("Contact added successfully!");
      setRefreshForm(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    console.log('📞 Updated contacts:', contacts)
  }, [contacts])
  

  const handleEditContact = async (updatedContact) => {
    try {
      const prev_contact = contacts.find(contact => contact.id === updatedContact.id);
      let no_change = true;

      for (let key in prev_contact) {
        if (updatedContact[key] !== prev_contact[key]) {
          no_change = false;
          break;
        }
      }

      if (no_change) {
        toast.error("No changes made");
        return;
      }

      if (!updatedContact.contact_name || !updatedContact.contact_phone) {
        toast.error("Name and phone are required");
        return;
      }
      const response = await api.put(`/update-contact/${updatedContact.id}`, updatedContact);
      setContacts(contacts.map(contact => 
        contact.id === updatedContact.id ? updatedContact : contact
      ));
      setEditingId(null);
      toast.success("Contact updated successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteContact = async (contactId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await api.delete(`/delete-contact/${contactId}`, {
        data: { user_id: user.id }
      });
      
      setContacts(contacts.filter(contact => contact.id !== contactId));
      toast.success("Contact deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };
  
  const startEditing = (contact) => {
    setEditingId(contact.id);
  };

  const [profile, setProfile] = useState(false);
  useEffect(() => {
    if(profile) {
      navigate('/profile')
      setProfile(false);
    }
  }, [profile])

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden p-4 md:p-8">
      {/* Header */}
      <header className='flex justify-between items-center mb-8'>
        <h1 className="text-3xl font-bold text-gray-800">
          Contact Manager
        </h1>
        
        {/* Desktop Profile */}
        <div 
          onClick={() => setProfile(true)}  
          className='hidden lg:flex items-center space-x-2 cursor-pointer'
        >
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-xl text-gray-800" />
          </div>
          <span className="font-medium text-gray-800">
            Profile
          </span>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="block lg:hidden mt-2 rounded-md text-gray-800 hover:bg-gray-200 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation */}
      {open && (
        <nav className="lg:hidden rounded-lg shadow-lg absolute top-20 right-4 z-50 w-48 py-2 bg-white border border-gray-200">
          <button 
            className={`w-full text-left px-4 py-3 flex items-center ${
              activeTab === 'add' ? 'bg-gray-200' : 'hover:bg-gray-100'
            } text-gray-800`}
            onClick={() => {
              setActiveTab('add');
              setOpen(false);
            }}
          >
            <FiPlus className='mr-2' /> Add Contact
          </button>
          <button 
            className={`w-full text-left px-4 py-3 flex items-center ${
              activeTab === 'contacts' ? 'bg-gray-200' : 'hover:bg-gray-100'
            } text-gray-800`}
            onClick={() => {
              setActiveTab('contacts');
              setOpen(false);
            }}
          >
            <FiUser className='mr-2' /> My Contacts
          </button>
          <button 
            className={`w-full text-left px-4 py-3 flex items-center ${
              activeTab === 'profile' ? 'bg-gray-200' : 'hover:bg-gray-100'
            } text-gray-800`}
            onClick={() => {
              setProfile(true);
            }}
          >
            <FiEdit2 className='mr-2 cursor-pointer' /> Profile
          </button>
        </nav>
      )}

      {/* Main Content */}
      <main className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
        {/* Forms Section - Desktop */}
        <section className='lg:col-span-4 hidden lg:block space-y-6'>
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <AddContact 
              onAddContact={handleAddContact} 
              refreshForm={refreshForm} 
              setRefreshForm={setRefreshForm}
            />
          </div>
          
          {editingId && (
            <div className="absolute top-[15%] left-[30%] w-1/2 z-20 bg-white rounded-lg shadow-md border border-gray-200">
              <EditContact
                onEditContact={handleEditContact}
                editingId={editingId}
                contacts={contacts}
                onCancelEdit={() => setEditingId(null)}
              />
            </div>
          )}
        </section>

        {editingId && (
          <div className="absolute lg:hidden top-[15%] left-[0%] w-full p-2 z-20 bg-white rounded-lg shadow-md border border-gray-200">
            <EditContact
              onEditContact={handleEditContact}
              editingId={editingId}
              contacts={contacts}
              onCancelEdit={() => setEditingId(null)}
            />
          </div>
        )}

        {/* Forms Section - Mobile */}
        {activeTab === 'add' && (
          <section className='lg:hidden'>
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <AddContact 
                onAddContact={handleAddContact} 
                refreshForm={refreshForm} 
                setRefreshForm={setRefreshForm}
              />
            </div>
          </section>
        )}

        {activeTab === 'contacts' && (
          <section className='lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5'>
            <div>
              <div className='flex justify-between items-center'>
                <button 
                  className="lg:hidden mb-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition flex items-center"
                  onClick={() => setActiveTab('add')}
                >
                  <FiPlus className='mr-2' /> Add Contact
                </button>
              </div>
              
              {isLoading ? (
                <div className='flex justify-center items-center h-64'>
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
                </div>
              ) : contacts.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <p className='text-lg'>No contacts found</p>
                  <button 
                    className="mt-4 px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition"
                    onClick={() => setActiveTab('add')}
                  >
                    Add your first contact
                  </button>
                </div>
              ) : (
                <ContactList
                  contacts={contacts}
                  onEditContact={startEditing}
                  onDeleteContact={handleDeleteContact}
                />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;