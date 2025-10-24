import { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard'; // [cite: krishnenduu/contact-list-app/.../ContactCard.jsx]
import SearchBar from './components/SearchBar'; // [cite: krishnenduu/contact-list-app/.../SearchBar.jsx]
import AddContactForm from './components/AddContactForm'; // [cite: krishnenduu/contact-list-app/.../AddContactForm.jsx]
import { mockContacts } from './data/contacts'; // [cite: krishnenduu/contact-list-app/.../contacts.js]
import { Users, UserCircle } from 'lucide-react';

// Key for localStorage
const LOCAL_STORAGE_KEY = 'addedContacts';

// Helper function to load initial contacts from localStorage
const loadInitialContacts = () => {
  let storedContacts = [];
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      storedContacts = JSON.parse(storedData);
    }
    // Ensure that storedContacts is always an array
    if (!Array.isArray(storedContacts)) {
        storedContacts = [];
    }
  } catch (error) {
    console.error("Failed to parse contacts from localStorage:", error);
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove bad data
    storedContacts = [];
  }
  // Combine stored contacts (newest first) and mock contacts
  return [...storedContacts, ...mockContacts];
};


function App() {
  // Initialize useState with the initial value loaded from localStorage
  const [contacts, setContacts] = useState(loadInitialContacts); 
  const [searchTerm, setSearchTerm] = useState('');
  // No need for a loading state since data is already in initial state
  // const [loading, setLoading] = useState(false); // can be removed or set false

  // Save *only added* contacts to localStorage whenever the contacts state changes
  useEffect(() => {
    // Filter out mockContacts based on ID
    const addedContacts = contacts.filter(contact => 
      !mockContacts.some(mockContact => mockContact.id === contact.id)
    );

    try {
      // Store only added contacts array as JSON string
      // Save in reverse order so the order remains correct while loading
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(addedContacts));
    } catch (error) {
      console.error("Failed to save contacts to localStorage:", error);
    }
  }, [contacts]); // This effect runs when 'contacts' state changes

  // Handler to add a new contact
  const handleAddContact = (newContactData) => {
    const newContact = {
      id: crypto.randomUUID(), // Generate a unique ID
      ...newContactData
    };
    // Add new contact at the beginning of the current list
    setContacts(prevContacts => [newContact, ...prevContacts]); 
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- JSX Rendering (no changes needed below) ---
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'2s']"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'4s']"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-3xl mx-auto px-4 py-12 sm:py-20 z-10">
        
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 mb-6 border border-white/20">
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
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} /> {/* [cite: krishnenduu/contact-list-app/.../SearchBar.jsx] */}
        </div>

        {/* Contacts List Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {/* Loading state can be removed or used when needed */}
          {/* {loading ? ( ... ) : ... } */}

          {filteredContacts.length === 0 ? (
            // Empty state (when no contacts or no search results found)
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
             // Contact list
            <div className="divide-y divide-gray-100">
              {searchTerm && (
                <div className="px-6 py-3 bg-indigo-50 flex items-center justify-between">
                  <span className="text-sm text-indigo-700 font-medium">
                    {filteredContacts.length} results found
                  </span>
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}
              
              {filteredContacts.map((contact, index) => (
                <div
                  key={contact.id} // Ensure IDs are unique!
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ContactCard contact={contact} /> {/* [cite: krishnenduu/contact-list-app/.../ContactCard.jsx] */}
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
      <AddContactForm onAddContact={handleAddContact} /> {/* [cite: krishnenduu/contact-list-app/.../AddContactForm.jsx] */}
    </div>
  );
}

export default App;
