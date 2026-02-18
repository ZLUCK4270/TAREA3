import { Trophy, Medal } from 'lucide-react';

const TOP_USERS = [
  { id: 1, name: 'Ana Lopez', points: 2450, avatar: 'A', change: '+120' },
  { id: 2, name: 'Luciano Acuña', points: 1250, avatar: 'L', change: '+50' },
  { id: 3, name: 'Juan Perez', points: 980, avatar: 'J', change: '+30' },
  { id: 4, name: 'Maria García', points: 850, avatar: 'M', change: '+10' },
  { id: 5, name: 'Carlos Ruiz', points: 720, avatar: 'C', change: '+5' },
];

export default function Leaderboard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-orange-50">
         <div className="flex items-center space-x-2 mb-2">
             <Trophy className="text-yellow-600" fill="currentColor" />
             <h3 className="font-bold text-gray-900">Tabla de Posiciones</h3>
         </div>
         <p className="text-sm text-gray-600">Top contribuidores del mes</p>
      </div>
      
      <div className="divide-y divide-gray-50">
        {TOP_USERS.map((user, index) => {
            let Icon = null;
            let color = 'text-gray-400 font-bold';
            
            if (index === 0) { Icon = Trophy; color = 'text-yellow-500'; }
            else if (index === 1) { Icon = Medal; color = 'text-gray-400'; }
            else if (index === 2) { Icon = Medal; color = 'text-orange-500'; }

            return (
                <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                        <div className={`w-8 text-center ${color} font-bold flex items-center justify-center`}>
                            {Icon ? <Icon size={20} fill="currentColor" /> : index + 1}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            {user.avatar}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-green-600 font-medium">{user.change} pts hoy</p>
                        </div>
                    </div>
                    <div className="font-bold text-gray-900">
                        {user.points} <span className="text-xs text-gray-400 font-normal">pts</span>
                    </div>
                </div>
            );
        })}
      </div>
      
      <div className="p-4 text-center border-t border-gray-100">
          <button className="text-sm text-blue-600 font-medium hover:text-blue-700">Ver Ranking Completo</button>
      </div>
    </div>
  );
}
