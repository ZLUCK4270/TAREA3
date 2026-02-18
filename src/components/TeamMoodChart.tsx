import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', mood: 3.5 },
  { name: 'Tue', mood: 4.0 },
  { name: 'Wed', mood: 3.8 },
  { name: 'Thu', mood: 4.2 },
  { name: 'Fri', mood: 4.5 },
  { name: 'Sat', mood: 4.8 },
  { name: 'Sun', mood: 4.7 },
];

export default function TeamMoodChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
         <div className="flex items-center space-x-2 mb-2">
             <TrendingUp className="text-blue-500" />
             <h3 className="font-bold text-gray-900">Team Mood Trends</h3>
         </div>
         <p className="text-sm text-gray-600">Weekly average mood score</p>
      </div>
      
      <div className="p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6B7280', fontSize: 12 }} 
                dy={10}
            />
            <YAxis 
                hide 
                domain={[0, 5]} 
            />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            />
            <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#3B82F6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
