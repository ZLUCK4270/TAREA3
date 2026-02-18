import { useState } from 'react';
import { Heart, Send, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const KUDOS_TAGS = ['Trabajo en equipo', 'Innovación', 'Ayuda', 'Liderazgo', 'Cazador de Bugs'];

export default function KudosSystem() {
  const { user, addPoints } = useAuth();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const [selectedTag, setSelectedTag] = useState(KUDOS_TAGS[0]);
  const [sending, setSending] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  // Mock users list for autocomplete (simplified)
  const users = ['Maria García', 'Juan Perez', 'Ana Lopez', 'Carlos Ruiz'];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate API call
    const timer = setTimeout(() => {
      addPoints(50);
      setSending(false);
      setRecipient('');
      setMessage('');
      setSelectedTag(KUDOS_TAGS[0]);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
      {showSuccess && (
        <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
             <Heart size={32} fill="currentColor" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">¡Kudos Enviados!</h3>
          <p className="text-gray-600">Has alegrado el día de alguien.</p>
          <p className="text-sm font-bold text-pink-600 mt-2">+50 puntos ganados</p>
        </div>
      )}

      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-pink-50 to-purple-50">
         <div className="flex items-center space-x-2 mb-2">
             <Heart className="text-pink-500" fill="currentColor" />
             <h3 className="font-bold text-gray-900">Enviar Kudos</h3>
         </div>
         <p className="text-sm text-gray-600">¡Reconoce el trabajo increíble de un colega!</p>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSend} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">DESTINATARIO</label>
                <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400" size={16} />
                    <select
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full pl-10 p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none appearance-none bg-white"
                        required
                    >
                        <option value="">Selecciona un colega...</option>
                        {users.filter(u => u !== user?.name).map(u => (
                            <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">¿POR QUÉ?</label>
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
                <label className="block text-xs font-medium text-gray-500 mb-1">MENSAJE</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Gracias por..."
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
                <span>{sending ? 'Enviando...' : 'Enviar Kudos (+50 pts)'}</span>
            </button>
        </form>
      </div>
    </div>
  );
}
