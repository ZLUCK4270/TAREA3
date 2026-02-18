import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Smile, Frown, Meh, ThumbsUp, Heart } from 'lucide-react';
import clsx from 'clsx';

const MOODS = [
  { icon: Frown, label: 'Stressed', color: 'text-red-500', bg: 'bg-red-100' },
  { icon: Meh, label: 'Okay', color: 'text-yellow-500', bg: 'bg-yellow-100' },
  { icon: Smile, label: 'Good', color: 'text-blue-500', bg: 'bg-blue-100' },
  { icon: ThumbsUp, label: 'Great', color: 'text-green-500', bg: 'bg-green-100' },
  { icon: Heart, label: 'Amazing', color: 'text-purple-500', bg: 'bg-purple-100' },
];

export default function MoodTracker() {
  const { addPoints } = useAuth();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleMoodSelect = (label: string) => {
    setSelectedMood(label);
  };

  const handleSubmit = () => {
    if (selectedMood) {
      // Here we would send data to backend
      addPoints(10);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setSelectedMood(null);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4">How are you feeling today?</h3>
      
      {submitted ? (
        <div className="text-center py-8 text-green-600 animate-fade-in">
          <p className="font-medium">Thanks for sharing! 🌟</p>
          <p className="text-sm text-gray-500">+10 points earned</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-6">
            {MOODS.map((mood) => {
              const Icon = mood.icon;
              const isSelected = selectedMood === mood.label;
              return (
                <button
                  key={mood.label}
                  onClick={() => handleMoodSelect(mood.label)}
                  className={clsx(
                    'flex flex-col items-center space-y-2 p-3 rounded-lg transition-all',
                    isSelected ? `${mood.bg} ring-2 ring-offset-2 ring-gray-200` : 'hover:bg-gray-50'
                  )}
                >
                  <Icon
                    size={32}
                    className={clsx(
                        'transition-transform',
                        isSelected ? `scale-110 ${mood.color}` : 'text-gray-400'
                    )}
                  />
                  <span className={clsx('text-xs font-medium', isSelected ? 'text-gray-900' : 'text-gray-500')}>
                    {mood.label}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            onClick={handleSubmit}
            disabled={!selectedMood}
            className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Log Mood
          </button>
        </>
      )}
    </div>
  );
}
