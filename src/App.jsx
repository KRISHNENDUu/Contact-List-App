import { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard'; //
import SearchBar from './components/SearchBar'; //
import AddContactForm from './components/AddContactForm'; //
import ActionModal from './components/ActionModal'; // <-- Import the new modal
import { mockContacts } from './data/contacts'; //
import { Users, UserCircle } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'addedContacts';

const loadInitialContacts = () => {
  // ... (keep the existing loadInitialContacts function from the previous step)
  let storedContacts = [];
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      storedContacts = JSON.parse(storedData);
    }
    if (!Array.isArray(storedContacts)) {
        storedContacts = [];
    }
  } catch (error) {
    console.error("Failed to parse contacts from localStorage:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY); 
    storedContacts = [];
  }
  return [...storedContacts, ...mockContacts]; 
};


function App() {
  const [contacts, setContacts] = useState(loadInitialContacts); 
  const [searchTerm, setSearchTerm] = useState('');

  // **NEW**: State for the action modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalActionType, setModalActionType] = useState(null); // 'call', 'message', 'video'
  const [selectedContact, setSelectedContact] = useState(null); // Contact object for modal

  // Save added contacts to localStorage
  useEffect(() => {
     // ... (keep the existing saving useEffect from the previous step)
    const addedContacts = contacts.filter(contact => 
      !mockContacts.some(mockContact => mockContact.id === contact.id) //
    );
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addedContacts));
    } catch (error) {
      console.error("Failed to save contacts to localStorage:", error);
    }
  }, [contacts]); 

  // Add new contact handler
  const handleAddContact = (newContactData) => {
    // ... (keep the existing handleAddContact function)
     const newContact = {
      id: crypto.randomUUID(), 
      ...newContactData
    };
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  // **NEW**: Function to open the modal
  const openActionModal = (contact, actionType) => {
    setSelectedContact(contact);
    setModalActionType(actionType);
    setIsModalOpen(true);
  };

  // **NEW**: Function to close the modal
  const closeActionModal = () => {
    setIsModalOpen(false);
    // Optionally reset state after a short delay for animation
    setTimeout(() => {
      setSelectedContact(null);
      setModalActionType(null);
    }, 300); // Match animation duration if needed
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* ... blobs ... */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'2s']"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'4s']"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-3xl mx-auto px-4 py-12 sm:py-20 z-10">
        
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border border-white/20">
          {/* ... header content ... */}
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <UserCircle className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Contacts
              </h1>
              <p className="text-gray-600">
                {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} total
              </p>
            </div>
          </div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} /> {/* */}
        </div>

        {/* Contacts List Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* No loading state needed here anymore */}
          {filteredContacts.length === 0 ? (
             // ... empty state JSX ...
             <div className="text-center py-20 px-6">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {searchTerm ? 'No matches found' : 'No contacts yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? `No contacts match "${searchTerm}"`
                  : 'Add your first contact to get started'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium shadow-lg"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {/* Search Info */}
              {searchTerm && (
                 <div className="px-6 py-3 bg-indigo-50 flex items-center justify-between">
                  <span className="text-sm text-indigo-700 font-medium">
                    Found {filteredContacts.length} result{filteredContacts.length !== 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}
              {/* Contact List */}
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id} 
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* **PASS DOWN THE openActionModal function** */}
                  <ContactCard 
                    contact={contact} 
                    onActionClick={openActionModal} // <-- Pass the handler
                  /> 
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {contacts.length > 0 && (
          <div className="text-center mt-6 text-gray-600 text-sm">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </div>
        )}
      </div>

      {/* Add Contact Button */}
      <AddContactForm onAddContact={handleAddContact} /> {/* */}

      {/* **RENDER THE ACTION MODAL** */}
      <ActionModal 
        isOpen={isModalOpen} 
        onClose={closeActionModal} 
        contact={selectedContact} 
        actionType={modalActionType} 
      />
    </div>
  );
}

export default App;