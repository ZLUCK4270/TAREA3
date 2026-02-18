import { useAuth } from '../hooks/useAuth';
import { Award } from 'lucide-react';
import MoodTracker from '../components/MoodTracker';
import KudosSystem from '../components/KudosSystem';
import Leaderboard from '../components/Leaderboard';
import TeamMoodChart from '../components/TeamMoodChart';

export default function Dashboard() {
  const { user } = useAuth();

  const activities = [
    { id: 1, user: 'Maria García', action: 'envió kudos a', target: 'Juan Perez', type: 'kudos', time: 'hace 2h' },
    { id: 2, user: 'Juan Perez', action: 'alcanzó una racha de', target: '5 días', type: 'streak', time: 'hace 4h' },
    { id: 3, user: 'Ana Lopez', action: 'se siente', target: 'Feliz', type: 'mood', time: 'hace 5h' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">¡Hola, {user?.name}! 👋</h1>
           <p className="text-gray-500">Aquí está lo que pasa con tu equipo hoy.</p>
        </div>
        <div className="flex space-x-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                    <Award size={24} />
                </div>
                <div>
                    <p className="text-sm text-gray-500">Puntos Totales</p>
                    <p className="text-xl font-bold text-gray-900">{user?.points}</p>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mood Tracker Component takes up one slot but we can make it span or check layout */}
        <div className="md:col-span-2 lg:col-span-1">
             <MoodTracker />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
             <KudosSystem />
        </div>

        <div className="md:col-span-2 lg:col-span-1">
             <Leaderboard />
        </div>
      </div>

      {/* Team Stats & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
              <TeamMoodChart />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="p-6 border-b border-gray-100">
                 <h3 className="font-bold text-gray-900">Actividad del Equipo</h3>
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
    </div>
  );
}
