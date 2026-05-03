import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, MapPin, Eye, Route, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-card rounded-xl p-4 md:p-5 border border-border hover:bg-hover transition-all duration-300 hover:scale-105">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-muted text-xs md:text-sm">{title}</p>
        <p className="text-xl md:text-2xl font-bold text-white mt-1">{value?.toLocaleString() || 0}</p>
      </div>
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-${color}/20 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 md:w-6 md:h-6 text-${color}`} />
      </div>
    </div>
  </div>
);

function Dashboard() {
  const { data, isLoading } = useQuery({ 
    queryKey: ['stats'], 
    queryFn: async () => { 
      const res = await api.get('/stats'); 
      return res.data.data;
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false
  });
  
  if (isLoading) return <div className="flex justify-center py-12"><LoadingSpinner /></div>;
  
  const COLORS = ['#dc241f', '#ffc72c', '#8b5cf6', '#f59e0b', '#ef4444', '#22c55e', '#f97316', '#06b6d4', '#ec4899', '#a855f7'];
  
  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-white mb-6">Dashboard</h1>
      
      {/* Stat Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-6 md:mb-8">
        <StatCard title="Total Kementerian" value={data?.totalMinistries} icon={Building2} color="tl-red" />
        <StatCard title="Total Lokasi" value={data?.totalRoutes} icon={MapPin} color="tl-yellow" />
        <StatCard title="Total Views" value={data?.totalViews} icon={Eye} color="accent-green" />
        <StatCard title="Rota Disponível" value={data?.totalRoutes} icon={Route} color="accent-amber" />
      </div>
      
      {/* Charts - Responsive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-8">
        {/* Line Chart */}
        <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Estatístika Vizualizasaun (7 Dias)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data?.weeklyViews}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252840" />
              <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e2130', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} 
              />
              <Line type="monotone" dataKey="views" stroke="#dc241f" strokeWidth={2} dot={{ fill: '#dc241f', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Pie Chart */}
        <div className="bg-card rounded-xl p-4 md:p-5 border border-border">
          <h3 className="text-base md:text-lg font-semibold text-white mb-4">Distribuisaun Kategoria</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={data?.byCat} 
                dataKey="count" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                innerRadius={40} 
                outerRadius={70} 
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data?.byCat?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ color: '#94a3b8', fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e2130', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Ministries Table - Responsive */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-4 md:px-5 py-4 border-b border-border">
          <h3 className="text-base md:text-lg font-semibold text-white">Kementerian ho Rating Aas</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[500px] md:min-w-full w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left px-4 md:px-5 py-3 text-text-muted text-xs font-medium">Naran</th>
                <th className="text-left px-4 md:px-5 py-3 text-text-muted text-xs font-medium">Kategoria</th>
                <th className="text-left px-4 md:px-5 py-3 text-text-muted text-xs font-medium">Lokál</th>
                <th className="text-left px-4 md:px-5 py-3 text-text-muted text-xs font-medium">Rating</th>
              </tr>
            </thead>
            <tbody>
              {data?.topMinistries?.map((m, i) => (
                <tr key={i} className="border-t border-border hover:bg-hover transition">
                  <td className="px-4 md:px-5 py-3 text-white text-sm">{m.name}</td>
                  <td className="px-4 md:px-5 py-3 text-text-secondary text-sm">{m.Category?.name}</td>
                  <td className="px-4 md:px-5 py-3 text-text-secondary text-sm">{m.city}</td>
                  <td className="px-4 md:px-5 py-3 text-text-secondary text-sm">
                    <span className="flex items-center gap-1">
                      {m.rating} ⭐
                    </span>
                  </td>
                </tr>
              ))}
              {(!data?.topMinistries || data.topMinistries.length === 0) && (
                <tr className="border-t border-border">
                  <td colSpan="4" className="px-4 md:px-5 py-8 text-center text-text-muted">
                    La iha dadus rating
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;