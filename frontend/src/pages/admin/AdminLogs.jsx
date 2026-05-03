import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Activity, User, Plus, Edit, Trash2, LogIn, Calendar, Eye } from 'lucide-react';
import api from '../../utils/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';

function AdminLogs() {
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading } = useQuery({
    queryKey: ['logs', currentPage],
    queryFn: async () => { 
      const res = await api.get('/logs', { params: { page: currentPage, limit: 30 } }); 
      return res.data.data; 
    }
  });
  
  const getActionIcon = (action) => {
    switch(action) {
      case 'CREATE': return <Plus className="w-3 h-3" />;
      case 'UPDATE': return <Edit className="w-3 h-3" />;
      case 'DELETE': return <Trash2 className="w-3 h-3" />;
      case 'LOGIN': return <LogIn className="w-3 h-3" />;
      case 'LOGOUT': return <LogIn className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };
  
  const getActionColor = (action) => {
    switch(action) {
      case 'CREATE': return 'bg-accent-green/20 text-accent-green';
      case 'UPDATE': return 'bg-accent/20 text-accent';
      case 'DELETE': return 'bg-accent-red/20 text-accent-red';
      case 'LOGIN': return 'bg-accent-amber/20 text-accent-amber';
      case 'LOGOUT': return 'bg-accent-amber/20 text-accent-amber';
      default: return 'bg-text-muted/20 text-text-muted';
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('id', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Log Atividade</h1>
          <p className="text-text-secondary text-sm mt-1">Rejistu hotu kona-ba atividade iha sistema</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <div className="w-2 h-2 rounded-full bg-accent-green"></div>
            <span>Kria</span>
            <div className="w-2 h-2 rounded-full bg-accent ml-2"></div>
            <span>Atualiza</span>
            <div className="w-2 h-2 rounded-full bg-accent-red ml-2"></div>
            <span>Hamos</span>
            <div className="w-2 h-2 rounded-full bg-accent-amber ml-2"></div>
            <span>Login</span>
          </div>
        </div>
      </div>
      
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Data & Hora</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Uza-na'in</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Aksaun</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Entidade</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">Detallu</th>
                <th className="text-left px-5 py-3 text-text-muted text-xs font-medium">IP Adresa</th>
              </tr>
            </thead>
            <tbody>
              {data?.logs?.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12">
                    <Activity className="w-12 h-12 text-text-muted mx-auto mb-3" />
                    <p className="text-text-secondary">La iha atividade rejistu</p>
                    <p className="text-text-muted text-sm">Atividade foun sei hatudu iha ne'e</p>
                  </td>
                </tr>
              ) : (
                data?.logs?.map((log) => (
                  <tr key={log.id} className="border-t border-border hover:bg-hover transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-text-muted" />
                        <span className="text-text-secondary text-xs font-mono">{formatDate(log.created_at)}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-white text-sm">
                          {log.User?.name || 'Sistema'}
                        </span>
                      </div>
                      {log.User && (
                        <p className="text-text-muted text-xs mt-1">{log.User.email}</p>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)}
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-text-secondary text-sm capitalize">
                          {log.entity_type || '-'}
                        </span>
                        {log.entity_id && (
                          <span className="text-text-muted text-xs">#{log.entity_id}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="max-w-md">
                        <p className="text-text-secondary text-sm truncate" title={log.detail}>
                          {log.detail || '-'}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <code className="text-accent text-xs bg-accent/10 px-2 py-1 rounded">
                        {log.ip_address || '-'}
                      </code>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex justify-between items-center p-4 border-t border-border">
            <p className="text-text-muted text-xs">
              Total {data.total} registu | Pájina {data.page} husi {data.totalPages}
            </p>
            <div className="flex gap-2">
              <Button 
                onClick={() => setCurrentPage(p => Math.max(1, p-1))} 
                disabled={currentPage === 1} 
                variant="outline" 
                size="sm"
              >
                Anterior
              </Button>
              <div className="flex gap-1">
                {[...Array(Math.min(5, data.totalPages))].map((_, i) => {
                  let pageNum;
                  if (data.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= data.totalPages - 2) {
                    pageNum = data.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-lg text-sm transition ${
                        currentPage === pageNum 
                          ? 'bg-accent text-white' 
                          : 'bg-secondary text-text-secondary hover:bg-hover'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <Button 
                onClick={() => setCurrentPage(p => Math.min(data.totalPages, p+1))} 
                disabled={currentPage === data.totalPages} 
                variant="outline" 
                size="sm"
              >
                Prósimu
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLogs;