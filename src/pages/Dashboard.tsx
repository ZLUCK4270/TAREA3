import { useAuth } from '../context/AuthContext';
import { Smile, Heart, TrendingUp, Award } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const activities = [
    { id: 1, user: 'Maria García', action: 'sent kudos to', target: 'Juan Perez', type: 'kudos', time: '2h ago' },
    { id: 2, user: 'Juan Perez', action: 'reached a streak of', target: '5 days', type: 'streak', time: '4h ago' },
    { id: 3, user: 'Ana Lopez', action: 'is feeling', target: 'Happy', type: 'mood', time: '5h ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Hello, {user?.name}! 👋</h1>
           <p className="text-gray-500">Here is what's happening with your team today.</p>
        </div>
        <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                    <Award size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total Points</p>
                    <p className="text-xl font-bold text-gray-900">{user?.points}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-[1.02] cursor-pointer">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-lg"><Smile size={24} /></div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Daily</span>
           </div>
           <h3 className="text-xl font-bold mb-1">Log Your Mood</h3>
           <p className="text-blue-100 text-sm">How are you feeling today?</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg transform transition hover:scale-[1.02] cursor-pointer">
           <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-white/20 rounded-lg"><Heart size={24} /></div>
              <span className="text-xs bg-white/20 px-2 py-1 rounded">Appreciate</span>
           </div>
           <h3 className="text-xl font-bold mb-1">Send Kudos</h3>
           <p className="text-purple-100 text-sm">Recognize a colleague's work.</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
           <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="text-green-500" />
              <h3 className="font-bold text-gray-900">Your Badges</h3>
           </div>
           <div className="flex flex-wrap gap-2">
              {user?.badges.map((badge, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                      {badge}
                  </span>
              ))}
              <span className="px-3 py-1 border border-dashed border-gray-300 text-gray-400 rounded-full text-sm">+ Add more</span>
           </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
         <div className="p-6 border-b border-gray-100">
             <h3 className="font-bold text-gray-900">Team Activity</h3>
         </div>
         <div className="divide-y divide-gray-100">
             {activities.map((activity) => (
                 <div key={activity.id} className="p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors">
                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500">
                         {activity.user.charAt(0)}
                     </div>
                     <div className="flex-1">
                         <p className="text-sm text-gray-900">
                             <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                         </p>
                         <p className="text-xs text-gray-500">{activity.time}</p>
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
}
