import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { TimorLesteLogoFull } from '../../components/TimorLesteLogo';
import Button from '../../components/Button';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) navigate('/admin');
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <TimorLesteLogoFull className="w-20 h-20" />
          </div>
          <h1 className="text-2xl font-bold text-white">GIS TIMOR-LESTE</h1>
          <p className="text-text-secondary">Admin Panel - Login</p>
        </div>
        
        <div className="bg-card rounded-xl p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div><label className="block text-text-secondary text-sm mb-2">Email</label><div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-tl-red" placeholder="admin@gis.tl" required /></div></div>
            <div><label className="block text-text-secondary text-sm mb-2">Password</label><div className="relative"><Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-text-muted" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-tl-red" placeholder="********" required /></div></div>
            <Button type="submit" variant="primary" loading={loading} fullWidth><LogIn className="w-4 h-4 mr-2" /> Login</Button>
          </form>
          <div className="mt-6 pt-6 border-t border-border text-center"><p className="text-text-muted text-xs"></p></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
