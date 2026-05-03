import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import toast from 'react-hot-toast';

function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Favór prense formuláriu hotu.');
      return;
    }
    setLoading(true);
    
    // Simula envio (tanba backend contact endpoint seiduk iha)
    setTimeout(() => {
      toast.success('Mensagem haruka susesu! Resposta sei haruka iha loron 2-3.');
      setFormData({ name: '', email: '', message: '' });
      setLoading(false);
    }, 1000);
  };
  
  return (
    <div className="bg-primary min-h-screen">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Kontaktu</h1>
        <p className="text-text-secondary mb-8">Iha pergunta ka sujestaun? Haruka ba ami.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-white mb-4">Informasaun Kontaktu</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Palácio Governu, Dili</p>
                    <p className="text-text-muted text-xs">Timor-Leste</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">+670 333 8888</p>
                    <p className="text-text-muted text-xs">Segunda-Sesta, 9h00-17h00</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">kontaktu@gis.tl</p>
                    <p className="text-text-muted text-xs">info@gis.tl</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm">Segunda-Sesta: 9h00 - 17h00</p>
                    <p className="text-text-muted text-xs">Sábadu: 9h00 - 13h00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-semibold text-white mb-4">Haruka Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Naran Kompletu</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" 
                    placeholder="Ex: João Ximenes" 
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Email</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" 
                    placeholder="joao@exemplo.com" 
                  />
                </div>
                <div>
                  <label className="block text-text-secondary text-sm mb-2">Mensagem</label>
                  <textarea 
                    rows={5} 
                    value={formData.message} 
                    onChange={(e) => setFormData({...formData, message: e.target.value})} 
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-white focus:outline-none focus:border-accent" 
                    placeholder="Escreve ita nia mensagem iha ne'e..."
                  />
                </div>
                <Button type="submit" variant="primary" loading={loading} fullWidth>
                  <Send className="w-4 h-4 mr-2" /> Haruka Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default ContactPage;