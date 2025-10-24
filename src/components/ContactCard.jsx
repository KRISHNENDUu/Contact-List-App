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
  
  const colorIndex = contact.name.charCodeAt(0) % avatarColors.length;
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
    <div className="group hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300">
      <div className="flex items-center gap-4 px-6 py-4">
        {/* Avatar */}
        <div className={`relative flex-shrink-0 w-14 h-14 rounded-full bg-gradient-to-br ${avatarColor} shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white font-bold text-lg">
            {getInitials(contact.name)}
          </span>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
            {contact.name}
          </h3>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Phone className="w-3.5 h-3.5" />
              <span className="truncate">{contact.phone}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="p-2.5 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
            title="Call"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button 
            className="p-2.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
            title="Message"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button 
            className="p-2.5 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-colors"
            title="Video Call"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Details */}
      <div className="px-6 pb-4 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-40 overflow-hidden transition-all duration-300">
        <div className="pt-2 border-t border-gray-200 space-y-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href={`mailto:${contact.email}`} className="text-gray-700 hover:text-indigo-600 transition-colors">
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <a href={`tel:${contact.phone}`} className="text-gray-700 hover:text-indigo-600 transition-colors">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;