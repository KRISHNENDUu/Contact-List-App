import { X, Phone, MessageCircle, Video, PhoneOff, Mic, MicOff, Volume2, VideoOff, Send, GripVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Initials helper (पहले जैसा ही)
const getInitials = (name = "") => { /* ... */
  return name
    .split(' ')
    .map(word => word ? word[0] : '') // Handle empty strings
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Action details (पहले जैसा ही)
const actionDetails = {
  call: { icon: Phone, text: 'Calling', endText: 'End Call', endIcon: PhoneOff, color: 'red' }, // End call is red
  message: { icon: MessageCircle, text: 'Messaging', endText: 'Send', endIcon: Send, color: 'blue' }, // Send icon for message
  video: { icon: Video, text: 'Video Calling', endText: 'End Video', endIcon: PhoneOff, color: 'red' }, // End video is red
};

// --- Professional Action Modal ---
const ActionModal = ({ isOpen, onClose, contact, actionType }) => {
  const audioRef = useRef(null);
  const [timer, setTimer] = useState('00:00');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const intervalRef = useRef(null);

  // Prevent background scroll (पहले जैसा ही)
  useEffect(() => { /* ... */
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
   }, [isOpen]);

  // Handle audio and call timer
  useEffect(() => {
    if (isOpen && (actionType === 'call' || actionType === 'video')) {
      // Play dialing sound
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => console.log("Audio play prevented:", error));
        }
      }
      // Start call timer simulation
      let seconds = 0;
      intervalRef.current = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        setTimer(`${mins}:${secs}`);
      }, 1000);

    } else {
      // Stop sound and timer
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(intervalRef.current);
      setTimer('00:00'); // Reset timer
      setIsMuted(false); // Reset mute state
      setIsVideoOff(false); // Reset video state
    }

    // Cleanup on unmount or close
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      clearInterval(intervalRef.current);
    };
  }, [isOpen, actionType]);

  if (!isOpen || !contact || !actionType) return null;

  const details = actionDetails[actionType];
  const ActionIcon = details.icon;
  const EndIcon = details.endIcon;

  // Avatar color (पहले जैसा ही)
   const avatarColors = [ /* ... */
     'from-red-400 to-pink-600', 'from-orange-400 to-red-600',
    'from-yellow-400 to-orange-600', 'from-green-400 to-emerald-600',
    'from-teal-400 to-cyan-600', 'from-blue-400 to-indigo-600',
    'from-indigo-400 to-purple-600', 'from-purple-400 to-pink-600',
    'from-pink-400 to-rose-600',
  ];
   const getHash = (str="") => { /* ... */
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return hash;
   };
   const colorIndex = Math.abs(getHash(contact.name)) % avatarColors.length;
   const avatarColor = avatarColors[colorIndex];

   // Button colors
   const endButtonBase = `bg-${details.color}-600 hover:bg-${details.color}-700 focus:ring-${details.color}-500`;
   const controlButtonBase = "bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white";
   const controlButtonActive = "bg-white/30 text-white"; // For active mute/video off

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* --- Main Modal Content --- */}
      <div
        className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md h-[80vh] max-h-[700px] flex flex-col border border-white/10 overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Audio Element */}
        <audio ref={audioRef} src="/dialing-sound.mp3" loop preload="auto" />

        {/* --- Header --- */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
           <div className="flex items-center gap-2">
            <ActionIcon className={`w-5 h-5 text-${details.color === 'red' ? 'green' : details.color}-400 animate-pulse-slow`} />
            <span className="text-gray-300 font-medium">{details.text}...</span>
           </div>
           <button
             onClick={onClose}
             aria-label="Close"
             className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all"
           >
             <X className="w-6 h-6" />
           </button>
        </div>

        {/* --- Body (Varies by action) --- */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">

          {/* Avatar */}
          <div className={`relative mb-4 w-28 h-28 rounded-full bg-gradient-to-br ${avatarColor} shadow-lg flex items-center justify-center ring-4 ring-white/10`}>
            <span className="text-white font-bold text-4xl">{getInitials(contact.name)}</span>
          </div>

          {/* Name & Status/Timer */}
          <h2 className="text-3xl font-bold text-white mb-1 truncate max-w-full px-2">{contact.name}</h2>
          {(actionType === 'call' || actionType === 'video') && (
             <p className="text-lg text-gray-400 font-mono">{timer}</p>
          )}
          {actionType === 'message' && (
             <p className="text-lg text-gray-400">{contact.phone || contact.email}</p> // Show number/email for message
          )}

          {/* --- Action Specific UI --- */}

          {/* Video Call Placeholders */}
          {actionType === 'video' && (
            <div className="mt-6 w-full aspect-video bg-black/30 rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden border border-white/10">
               {isVideoOff ? (
                 <VideoOff className="w-16 h-16 opacity-50"/>
               ) : (
                 <span className='italic'>Simulated Video Feed</span>
               )}
               {/* Small self-view placeholder */}
               <div className="absolute bottom-3 right-3 w-1/4 aspect-[3/4] bg-black/50 rounded flex items-center justify-center border border-white/10">
                 <Video className="w-6 h-6 text-gray-600"/>
               </div>
            </div>
          )}

          {/* Message Input & History Placeholder */}
          {actionType === 'message' && (
            <div className="mt-6 w-full flex-1 flex flex-col">
              <div className="flex-1 bg-black/20 rounded-lg p-3 mb-3 border border-white/10 text-left overflow-y-auto">
                 <p className="text-gray-400 text-sm italic">Simulated message history...</p>
                 {/* Dummy messages */}
                 <div className="mt-2 p-2 bg-blue-600/30 rounded-lg max-w-[70%] ml-auto text-white text-sm">Hey!</div>
                 <div className="mt-2 p-2 bg-gray-600/30 rounded-lg max-w-[70%] mr-auto text-gray-200 text-sm">Hi there!</div>
              </div>
              <textarea
                placeholder={`Type message...`}
                rows="3"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          )}

        </div> {/* End Body */}


        {/* --- Footer Controls --- */}
        <div className="bg-black/20 p-4 border-t border-white/10">
          {/* Call/Video Controls */}
          {(actionType === 'call' || actionType === 'video') && (
            <div className="flex justify-center items-center gap-4 mb-4">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-3 rounded-full transition-colors ${isMuted ? controlButtonActive : controlButtonBase}`}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              <button className={`p-3 rounded-full transition-colors ${controlButtonBase}`} aria-label="Keypad">
                <GripVertical className="w-6 h-6" /> {/* Keypad Icon */}
              </button>
              <button className={`p-3 rounded-full transition-colors ${controlButtonBase}`} aria-label="Speaker">
                <Volume2 className="w-6 h-6" />
              </button>
              {actionType === 'video' && (
                <button
                 onClick={() => setIsVideoOff(!isVideoOff)}
                 className={`p-3 rounded-full transition-colors ${isVideoOff ? controlButtonActive : controlButtonBase}`}
                 aria-label={isVideoOff ? 'Start Video' : 'Stop Video'}
                >
                  {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                </button>
              )}
            </div>
          )}

          {/* Main Action Button (End Call / Send Message) */}
          <div className="flex justify-center">
            <button
              onClick={actionType === 'message' ? () => { /* Add send logic here if needed */ onClose(); } : onClose}
              className={`flex items-center justify-center gap-2 px-8 py-3.5 ${endButtonBase} text-white rounded-full transition-all font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800`}
            >
              <EndIcon className="w-5 h-5" />
              <span>{details.endText}</span>
            </button>
          </div>
        </div> {/* End Footer */}

      </div> {/* End Modal Content */}
    </div> // End Backdrop
  );
};

export default ActionModal;