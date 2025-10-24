import { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard';
import SearchBar from './components/SearchBar';
import AddContactForm from './components/AddContactForm';
import { mockContacts } from './data/contacts';
import { Users, UserCircle } from 'lucide-react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setContacts(mockContacts);
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const handleAddContact = (newContact) => {
    const contact = {
      // Use a more robust ID, like crypto.randomUUID() for a real app
      id: crypto.randomUUID(), 
      ...newContact
    };
    // Add new contacts to the top
    setContacts([contact, ...contacts]);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'2s']"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob [animation-delay:'4s']"></div>
      </div>

      {/* Main Container - Improved responsive layout */}
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

          {/* Search Bar */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Contacts List Container */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          
          {loading ? (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <p className="mt-6 text-gray-600 font-medium animate-pulse">Loading contacts...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
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
              {/* Search Results Info */}
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
                  // Use Tailwind for animation
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ContactCard contact={contact} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Info */}
        {!loading && contacts.length > 0 && (
          <div className="text-center mt-6 text-gray-600 text-sm">
            Showing {filteredContacts.length} of {contacts.length} contacts
          </div>
        )}
      </div>

      {/* Add Contact Button is now a true FAB */}
      <AddContactForm onAddContact={handleAddContact} />
    </div>
  );
}

export default App;