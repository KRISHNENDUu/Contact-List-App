import { Mail, Phone, MessageCircle, Video } from 'lucide-react';

const ContactCard = ({ contact }) => {
  // Generate avatar background colors
  const avatarColors = [
    'from-red-400 to-pink-600',
    'from-orange-400 to-red-600',
    'from-yellow-400 to-orange-600',
    'from-green-400 to-emerald-600',
    'from-teal-400 to-cyan-600',
    'from-blue-400 to-indigo-600',
    'from-indigo-400 to-purple-600',
    'from-purple-400 to-pink-600',
    'from-pink-400 to-rose-600',
  ];
  
  // Simple hash function for more varied color selection
  const getHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };
  
  const colorIndex = Math.abs(getHash(contact.name)) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];
  
  // Get initials
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="group transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50">
      {/* Main Card View */}
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Avatar */}
        <div className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor} shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white font-bold text-lg">
            {getInitials(contact.name)}
          </span>
          {/* Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {contact.name}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
            <Mail className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{contact.email}</span>
          </div>
        </div>

        {/* Expand Indicator */}
        <div className="text-gray-400 group-hover:text-indigo-600 transition-transform duration-300 transform group-hover:rotate-180">
          {/* Using a simple div, but ChevronDown from lucide-react is also a good option */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>

      {/* Expandable Details (on group-hover) */}
      <div className="px-6 pb-5 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 overflow-hidden transition-all duration-300">
        <div className="pt-4 border-t border-gray-200 space-y-3">
          {/* Detailed Info */}
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-indigo-600 transition-colors">
              {contact.phone}
            </a>
          </div>
          
          {/* Action Buttons - Moved here */}
          <div className="flex items-center gap-2 pt-2">
            <button 
              className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium text-sm"
              aria-label="Call"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-medium text-sm"
              aria-label="Message"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Message</span>
            </button>
            <button 
              className="flex-1 flex items-center justify-center gap-2 p-2.5 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-medium text-sm"
              aria-label="Video Call"
            >
              <Video className="w-4 h-4" />
              <span>Video</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;