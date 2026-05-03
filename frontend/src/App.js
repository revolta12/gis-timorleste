import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

// Pájina públiku - load diretu
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';           // ✅ TAMBAH
import ProfileSystemPage from './pages/ProfileSystemPage'; // ✅ TAMBAH
import AdminLogin from './pages/admin/AdminLogin';

// Pájina admin
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import AdminMinistries from './pages/admin/AdminMinistries';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';
import AdminNews from './pages/admin/AdminNews';
import AdminLogs from './pages/admin/AdminLogs';
import AdminSettings from './pages/admin/AdminSettings';

// Pájina boot sira - lazy load
const MapPage = lazy(() => import('./pages/MapPage'));
const MinistriesPage = lazy(() => import('./pages/MinistriesPage'));
const MinistryDetail = lazy(() => import('./pages/MinistryDetail'));
const NewsPage = lazy(() => import('./pages/NewsPage'));

// Pájina admin boot - lazy load
const AdminMinistryForm = lazy(() => import('./pages/admin/AdminMinistryForm'));

import PrivateRoute from './components/PrivateRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Toaster 
            position="top-right" 
            toastOptions={{ 
              duration: 4000, 
              style: { background: '#1a1f2e', color: '#f1f5f9' } 
            }} 
          />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-primary">
              <LoadingSpinner size="lg" />
            </div>
          }>
            <Routes>
              {/* Rota Publik */}
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/ministries" element={<MinistriesPage />} />
              <Route path="/ministries/:id" element={<MinistryDetail />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />           {/* ✅ TAMBAH */}
              <Route path="/profile" element={<ProfileSystemPage />} />     {/* ✅ TAMBAH */}
              
              {/* Rota Admin Login */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Rota Admin (Protejidu) */}
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminLayout />
                </PrivateRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="ministries" element={<AdminMinistries />} />
                <Route path="ministries/new" element={<AdminMinistryForm />} />
                <Route path="ministries/:id/edit" element={<AdminMinistryForm />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="logs" element={<AdminLogs />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              {/* Fallback - pájina la hetan */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;