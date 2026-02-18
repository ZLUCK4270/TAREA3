import { useState } from 'react';
import { Heart, Send, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const KUDOS_TAGS = ['Teamwork', 'Innovation', 'Helping Hand', 'Leadership', 'Bug Hunter'];

export default function KudosSystem() {
  const { user, addPoints } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(KUDOS_TAGS[0]);
  const [sending, setSending] = useState(false);

  // Mock users list for autocomplete (simplified)
  const users = ['Maria García', 'Juan Perez', 'Ana Lopez', 'Carlos Ruiz'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate API call
    setTimeout(() => {
      addPoints(50);
      setSending(false);
      setRecipient('');
      setMessage('');
      alert(`Kudos sent to ${recipient}!`);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
         <div className="flex items-center space-x-2 mb-2">
             <Heart className="text-pink-500" fill="currentColor" />
             <h3 className="font-bold text-gray-900">Send Kudos</h3>
         </div>
         <p className="text-sm text-gray-600">Recognize a colleague's amazing work!</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSend} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">RECIPIENT</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={16} />
                    <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full pl-10 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none appearance-none bg-white"
                        required
                    >
                        <option value="">Select a colleague...</option>
                        {users.filter(u => u !== user?.name).map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">WHAT FOR?</label>
                <div className="flex flex-wrap gap-2">
                    {KUDOS_TAGS.map(tag => (
                        <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                                selectedTag === tag
                                    ? 'bg-pink-100 text-pink-700 border-pink-200'
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">MESSAGE</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Thank you for..."
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none h-24 resize-none"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={sending || !recipient || !message}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-pink-600 text-white rounded-lg font-bold hover:bg-pink-700 transition-colors disabled:opacity-50"
            >
                <Send size={18} />
                <span>{sending ? 'Sending...' : 'Send Kudos (+50 pts)'}</span>
            </button>
        </form>
      </div>
    </div>
  );
}
