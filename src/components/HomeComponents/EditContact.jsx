import React, {useState, useEffect} from 'react'

function EditContact({ onEditContact, editingId, contacts, onCancelEdit }) {
  const [formData, setFormData] = useState({
    id: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
    contact_address: '',
    contact_gender: '',
    contact_favorite: false,
    user_id: ''
  });

  const resetForm = () => {
    setFormData({
      id:'',
      contact_name: '',
      contact_phone: '',
      contact_email: '',
      contact_address: '',
      contact_gender: '',
      contact_favorite: false,
    });
  };

    // When editingId changes, load the contact data
    useEffect(() => {
      if (editingId) {
        const contactToEdit = contacts.find(contact => contact.id === editingId);
        if (contactToEdit) {
          setFormData(contactToEdit);
        }
      } else {
        // Reset form when not editing
        resetForm();
      }
    }, [editingId, contacts]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onEditContact(formData);
    };
  
    const handleCancel = () => {
      onCancelEdit();
      resetForm();
    };

  return (
    <>
          <div className='bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow'>
            <span className='flex flex-rwo justify-between'>
              <h3 className='text-xl font-bold text-black/80'>Edit Contact</h3>
              <button 
                onClick={handleCancel}
                className='bg-white/50 hover:bg-white/70 transition-colors backdrop-blur-sm rounded-md p-1 w-[18%] text-black/80 text-[0.8rem] cursor-pointer shadow-sm'
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!editingId}
                className={`${editingId ? 'bg-white/50 hover:bg-white/70 cursor-pointer' : 'bg-white/20 cursor-not-allowed'} transition-colors backdrop-blur-sm rounded-md p-1 w-[30%] text-black/80 text-[0.8rem] shadow-sm`}
              >
                Update
              </button>
            </span>

            <form className="space-y-3 mt-4">
              <span className="block">
                <label className='text-black/80 text-[0.8rem]' htmlFor="edit_name">Name</label>
                <input 
                  className='bg-white/40 hover:bg-white/50 transition-colors backdrop-blur-sm rounded-sm p-2 w-full outline-none text-[0.8rem] text-[#584c61]' 
                  type="text" 
                  id='edit_name' 
                  name='contact_name' 
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  required 
                />
              </span>

              <span className="block">
                <label className='text-black/80 text-[0.8rem]' htmlFor="edit_phone">Phone</label>
                <input 
                  className='bg-white/40 hover:bg-white/50 transition-colors backdrop-blur-sm rounded-sm p-2 w-full outline-none text-[0.8rem] text-[#584c61]' 
                  type="tel" 
                  id='edit_phone' 
                  name='contact_phone' 
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  required 
                />
              </span>

              <span className="block">
                <label className='text-black/80 text-[0.8rem]' htmlFor="edit_email">Email</label>
                <input 
                  className='bg-white/40 hover:bg-white/50 transition-colors backdrop-blur-sm rounded-sm p-2 w-full outline-none text-[0.8rem] text-[#584c61]' 
                  type="email" 
                  id='edit_email' 
                  name='contact_email' 
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  required 
                />
              </span>

              <span className="block">
                <label className='text-black/80 text-[0.8rem]' htmlFor="edit_address">Address</label>
                <textarea 
                  className='bg-white/40 hover:bg-white/50 transition-colors backdrop-blur-sm rounded-sm p-2 w-full outline-none text-[0.8rem] text-[#584c61]' 
                  id='edit_address' 
                  name='contact_address' 
                  rows="2"
                  value={formData.contact_address}
                  onChange={handleInputChange}
                  required
                />
              </span>

              <span className="block">
                <label className='text-black/80 text-[0.8rem] block'>Gender</label>
                <div className='flex items-center gap-4 mt-1'>
                  <label className='text-black/80 text-[0.8rem] flex items-center gap-1'>
                    <input 
                      type="radio" 
                      name="contact_gender" 
                      value="male" 
                      checked={formData.contact_gender === 'male'}
                      onChange={handleInputChange}
                      className="accent-purple-400" 
                    /> Male
                  </label>
                  <label className='text-black/80 text-[0.8rem] flex items-center gap-1'>
                    <input 
                      type="radio" 
                      name="contact_gender" 
                      value="female" 
                      checked={formData.contact_gender === 'female'}
                      onChange={handleInputChange}
                      className="accent-purple-400" 
                    /> Female
                  </label>
                  <label className='text-black/80 text-[0.8rem] flex items-center gap-1'>
                    <input 
                      type="radio" 
                      name="contact_gender" 
                      value="other" 
                      checked={formData.contact_gender === 'other'}
                      onChange={handleInputChange}
                      className="accent-purple-400" 
                    /> Other
                  </label>
                </div>
              </span>

              <span className="block">
                <label className='text-black/80 text-[0.8rem] flex items-center gap-2'>
                  <input 
                    type="checkbox" 
                    name="contact_favorite" 
                    checked={formData.contact_favorite}
                    onChange={handleInputChange}
                    className="accent-white" 
                  /> Mark as Favorite
                </label>
              </span>
            </form>
          </div>
    </>
  )
}

export default EditContact;