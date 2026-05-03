import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, User } from 'lucide-react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';

function NewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const parseYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const { data, isLoading } = useQuery({
    queryKey: ['news', currentPage],
    queryFn: async () => { const res = await api.get('/news', { params: { page: currentPage, limit: 9 } }); return res.data.data; }
  });
  
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Notísia</h1>
        <p className="text-text-secondary mb-8">Informasaun atualizasaun kona-ba ministériu sira</p>
        
        {isLoading ? (
          <div className="flex justify-center py-12"><LoadingSpinner /></div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.news?.map((news) => (
                <div key={news.id} className="bg-card rounded-xl overflow-hidden hover:bg-hover transition border border-border">
                  <img src={news.thumbnail || 'https://placehold.co/400x200/1a1d27/3b82f6?text=Not%C3%ADsia'} alt={news.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{news.title}</h3>
                    <p className="text-text-secondary text-sm mb-3 line-clamp-3">{news.excerpt || news.content?.substring(0, 100)}</p>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between text-text-muted text-xs">
                        <div className="flex items-center gap-2"><Calendar className="w-3 h-3" />{new Date(news.published_at || news.created_at).toLocaleDateString('id')}</div>
                        <div className="flex items-center gap-2"><User className="w-3 h-3" />{news.user?.name || 'Admin'}</div>
                      </div>
{news.youtube_url && (
                        <Button onClick={() => setSelectedVideoUrl(news.youtube_url)} variant="outline" size="sm" className="w-full justify-center">Haree Video Notisia</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {data && data.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} variant="outline" size="sm">Anterior</Button>
                <span className="px-4 py-2 bg-card rounded-lg text-white text-sm">Pájina {currentPage} husi {data.totalPages}</span>
                <Button onClick={() => setCurrentPage(p => Math.min(data.totalPages, p+1))} disabled={currentPage === data.totalPages} variant="outline" size="sm">Prósimu</Button>
              </div>
            )}
          </>
        )}
      </div>
      
      {selectedVideoUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVideoUrl('')}>
          <div className="relative w-full max-w-4xl max-h-screen aspect-video" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute -top-12 right-0 text-white text-2xl hover:text-red-400 z-10"
              onClick={() => setSelectedVideoUrl('')}
            >
              ✕
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${parseYouTubeId(selectedVideoUrl)}?autoplay=1`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-2xl"
            ></iframe>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default NewsPage;