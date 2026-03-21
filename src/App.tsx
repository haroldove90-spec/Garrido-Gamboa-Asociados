import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scale, 
  Calculator, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Calendar,
  User
} from 'lucide-react';
import { analyzeTaxRisk, RiskAnalysis, analyzeBookingRequest, BookingAnalysis } from './services/geminiService';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Citas', href: '#booking' },
    { name: 'Escáner IA', href: '#ai-scanner' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 gold-gradient rounded-sm flex items-center justify-center">
            <Scale className="text-navy w-6 h-6" />
          </div>
          <span className={`font-serif text-xl font-bold tracking-tighter ${isScrolled ? 'text-white' : 'text-white'}`}>
            CARRILLO GAMBOA <span className="text-gold">& ASOCIADOS</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white/80 hover:text-gold transition-colors text-sm font-medium uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button className="gold-gradient text-navy px-6 py-2 rounded-sm font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
            Consulta Gratuita
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-navy border-t border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/80 hover:text-gold text-lg font-medium"
                >
                  {link.name}
                </a>
              ))}
              <button className="gold-gradient text-navy w-full py-3 rounded-sm font-bold mt-4">
                Consulta Gratuita
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070",
      title: "Tu éxito, nuestra meta.",
      subtitle: "Excelencia en Asesoría Integral",
      desc: "Estrategias fiscales, legales y contables diseñadas para proteger tu patrimonio y potenciar el crecimiento de tu empresa en México."
    },
    {
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
      title: "Solidez Legal y Fiscal.",
      subtitle: "Protección Patrimonial",
      desc: "Defensa jurídica especializada y planeación fiscal estratégica para blindar tus activos frente a cualquier contingencia."
    },
    {
      image: "https://images.unsplash.com/photo-1454165833767-027ffea10c3b?auto=format&fit=crop&q=80&w=2070",
      title: "Innovación en Consultoría.",
      subtitle: "Tecnología y Derecho",
      desc: "Implementamos herramientas de IA para diagnósticos precisos, permitiéndote tomar decisiones informadas en tiempo real."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt="Hero Slide" 
            className="w-full h-full object-cover brightness-[0.3] scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
              {slides[currentSlide].subtitle}
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
              {slides[currentSlide].title.split(',')[0]} <br />
              <span className="text-gold italic">{slides[currentSlide].title.split(',')[1] || ''}</span>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-lg leading-relaxed">
              {slides[currentSlide].desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="gold-gradient text-navy px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center gap-2 group">
                Agendar Cita <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-sm font-bold uppercase tracking-widest flex items-center justify-center transition-all">
                Servicios
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 right-10 z-20 flex gap-4">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1 transition-all duration-300 ${currentSlide === i ? 'w-12 bg-gold' : 'w-6 bg-white/30'}`}
          />
        ))}
      </div>

      <div className="absolute bottom-10 left-10 z-20 hidden md:flex items-center gap-4 text-white/50 text-xs tracking-widest uppercase">
        <span className="text-gold font-bold">0{currentSlide + 1}</span>
        <div className="w-12 h-px bg-white/20" />
        <span>0{slides.length}</span>
      </div>
    </section>
  );
};

const BookingSystem = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: 'Asesoría Fiscal',
    description: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<BookingAnalysis | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const services = ['Asesoría Fiscal', 'Contabilidad', 'Defensa Legal', 'Administración', 'Auditoría'];
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'];

  const handleNextStep = async () => {
    if (step === 2) {
      setLoading(true);
      const analysis = await analyzeBookingRequest(formData.description, formData.service);
      setAiAnalysis(analysis);
      setLoading(false);
    }
    setStep(step + 1);
  };

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsConfirmed(true);
    }, 1500);
  };

  if (isConfirmed) {
    return (
      <section id="booking" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-emerald-50 border border-emerald-100 p-12 rounded-2xl"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-200">
              <CheckCircle className="text-white w-10 h-10" />
            </div>
            <h2 className="text-3xl font-serif text-navy mb-4">¡Cita Agendada con Éxito!</h2>
            <p className="text-slate-600 mb-8">
              Hemos recibido tu solicitud. Un especialista de **Carrillo Gamboa & Asociados** se pondrá en contacto contigo en breve para confirmar los detalles finales.
            </p>
            <div className="bg-white p-6 rounded-xl border border-emerald-100 text-left mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Fecha y Hora</p>
                  <p className="text-navy font-bold">{formData.date} a las {formData.time}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Servicio</p>
                  <p className="text-navy font-bold">{formData.service}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Especialista Sugerido</p>
                  <p className="text-gold font-bold">{aiAnalysis?.suggestedSpecialist}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase text-[10px] font-bold tracking-widest">Prioridad</p>
                  <p className={`font-bold ${aiAnalysis?.priority === 'Urgente' ? 'text-rose-500' : 'text-navy'}`}>{aiAnalysis?.priority}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setIsConfirmed(false); setStep(1); setFormData({ service: 'Asesoría Fiscal', description: '', date: '', time: '', name: '', email: '', phone: '' }); }}
              className="text-navy font-bold text-xs uppercase tracking-widest hover:text-gold transition-colors"
            >
              Agendar otra cita
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Agenda tu Cita</span>
          <h2 className="text-4xl font-serif text-navy">Sistema de <span className="text-gold">Agenda Inteligente</span></h2>
          <p className="text-slate-500 mt-4">Nuestra IA analizará tu caso para asignarte al especialista adecuado.</p>
        </div>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          {/* Sidebar Progress */}
          <div className="bg-navy p-10 md:w-1/3 text-white">
            <div className="space-y-8">
              {[
                { s: 1, t: 'Servicio', i: <Briefcase className="w-4 h-4" /> },
                { s: 2, t: 'Detalles del Caso', i: <FileText className="w-4 h-4" /> },
                { s: 3, t: 'Fecha y Hora', i: <Calendar className="w-4 h-4" /> },
                { s: 4, t: 'Información', i: <User className="w-4 h-4" /> }
              ].map((item) => (
                <div key={item.s} className={`flex items-center gap-4 transition-opacity ${step >= item.s ? 'opacity-100' : 'opacity-30'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${step === item.s ? 'bg-gold border-gold text-navy' : 'border-white/20'}`}>
                    {item.i}
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">{item.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-20 p-6 bg-white/5 rounded-xl border border-white/10">
              <p className="text-xs text-white/40 italic leading-relaxed">
                "Nuestra agenda inteligente optimiza los tiempos de respuesta basándose en la complejidad de tu requerimiento."
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="p-12 md:w-2/3">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif text-navy mb-8">¿Qué servicio requieres?</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((s) => (
                      <button 
                        key={s}
                        onClick={() => setFormData({ ...formData, service: s })}
                        className={`p-4 text-left rounded-xl border transition-all flex justify-between items-center ${formData.service === s ? 'border-gold bg-gold/5 text-navy font-bold' : 'border-slate-200 text-slate-500 hover:border-gold/50'}`}
                      >
                        {s}
                        {formData.service === s && <CheckCircle className="w-5 h-5 text-gold" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif text-navy mb-4">Cuéntanos sobre tu caso</h3>
                  <p className="text-slate-500 text-sm mb-6">Nuestra IA procesará esta información para priorizar tu cita.</p>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-navy focus:outline-none focus:border-gold min-h-[200px]"
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif text-navy mb-8">Selecciona Fecha y Hora</h3>
                  <div className="space-y-6">
                    <input 
                      type="date" 
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-navy focus:outline-none focus:border-gold"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {timeSlots.map((t) => (
                        <button 
                          key={t}
                          onClick={() => setFormData({ ...formData, time: t })}
                          className={`p-3 text-xs font-bold rounded-lg border transition-all ${formData.time === t ? 'bg-navy text-white border-navy' : 'bg-white text-slate-500 border-slate-200 hover:border-gold'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif text-navy mb-4">Tus Datos de Contacto</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      placeholder="Nombre Completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-navy focus:outline-none focus:border-gold"
                    />
                    <input 
                      type="email" 
                      placeholder="Correo Electrónico"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-navy focus:outline-none focus:border-gold"
                    />
                    <input 
                      type="tel" 
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-navy focus:outline-none focus:border-gold"
                    />
                  </div>

                  {aiAnalysis && (
                    <div className="mt-8 p-4 bg-gold/10 border border-gold/20 rounded-xl">
                      <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-2">
                        <ShieldCheck className="w-4 h-4" /> Análisis de Prioridad IA
                      </div>
                      <p className="text-navy font-bold text-sm">Especialista Sugerido: {aiAnalysis.suggestedSpecialist}</p>
                      <p className="text-slate-600 text-xs mt-1">Prioridad: {aiAnalysis.priority} | Duración: {aiAnalysis.estimatedDuration}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-12 flex justify-between items-center">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-navy transition-colors"
                >
                  Atrás
                </button>
              )}
              <div className="flex-1" />
              {step < 4 ? (
                <button 
                  onClick={handleNextStep}
                  disabled={loading || (step === 1 && !formData.service) || (step === 2 && !formData.description) || (step === 3 && (!formData.date || !formData.time))}
                  className="gold-gradient text-navy px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50"
                >
                  {loading ? 'Analizando...' : 'Siguiente'}
                </button>
              ) : (
                <button 
                  onClick={handleConfirm}
                  disabled={loading || !formData.name || !formData.email || !formData.phone}
                  className="navy-gradient text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-125 transition-all disabled:opacity-50"
                >
                  {loading ? 'Confirmando...' : 'Confirmar Cita'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      name: "Roberto Sánchez",
      role: "CEO, TechLogistics MX",
      content: "La asesoría fiscal de Carrillo Gamboa transformó nuestra estructura corporativa. Su profesionalismo y atención al detalle son inigualables.",
      image: "https://i.pravatar.cc/150?u=roberto"
    },
    {
      name: "Elena Villarreal",
      role: "Directora de Finanzas, Grupo Arcos",
      content: "El escáner de riesgo IA nos dio la claridad que necesitábamos en un momento crítico. Una firma que realmente abraza la tecnología.",
      image: "https://i.pravatar.cc/150?u=elena"
    },
    {
      name: "Carlos Mendoza",
      role: "Fundador, Mendoza & Co.",
      content: "Más que un despacho, son socios estratégicos. Su capacidad para resolver litigios complejos nos ha dado una tranquilidad invaluable.",
      image: "https://i.pravatar.cc/150?u=carlos"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Testimonios</span>
          <h2 className="text-4xl font-serif text-navy">La voz de nuestros <span className="text-gold">clientes</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-slate-50 border border-slate-100 rounded-sm relative"
            >
              <div className="text-gold/20 absolute top-4 right-8 text-6xl font-serif">“</div>
              <p className="text-slate-600 italic mb-8 relative z-10 leading-relaxed">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full grayscale" />
                <div>
                  <h4 className="font-bold text-navy text-sm">{t.name}</h4>
                  <p className="text-gold text-[10px] uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold" />
            <img 
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=2071" 
              alt="Professional Team" 
              className="w-full h-[500px] object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl font-serif mb-8 text-navy">
              Más de 20 años de <span className="text-gold">trayectoria</span> y confianza.
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              En Carrillo Gamboa & Asociados, entendemos que cada cliente es único. Nuestro despacho en la Ciudad de México se especializa en brindar soluciones integrales que combinan la precisión contable con la solidez legal.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Nuestro equipo multidisciplinario trabaja bajo los más altos estándares de ética y profesionalismo, asegurando que tu negocio cumpla con todas las normativas vigentes mientras optimizas tus recursos financieros.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-serif text-gold mb-2">500+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-navy/60">Clientes Satisfechos</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif text-gold mb-2">15+</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-navy/60">Especialistas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Asesoría Fiscal',
      desc: 'Optimización de carga tributaria y cumplimiento normativo ante el SAT.',
      icon: <Scale className="w-8 h-8" />,
    },
    {
      title: 'Contabilidad Integral',
      desc: 'Gestión contable precisa, estados financieros y auditorías preventivas.',
      icon: <Calculator className="w-8 h-8" />,
    },
    {
      title: 'Defensa Legal',
      desc: 'Litigio administrativo, fiscal y corporativo con estrategias de alto impacto.',
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: 'Administración',
      desc: 'Consultoría en procesos administrativos y optimización operativa empresarial.',
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      title: 'Nóminas y RRHH',
      desc: 'Gestión eficiente de capital humano y cumplimiento de obligaciones patronales.',
      icon: <FileText className="w-8 h-8" />,
    },
    {
      title: 'Auditoría',
      desc: 'Revisiones exhaustivas para garantizar la transparencia y salud financiera.',
      icon: <Search className="w-8 h-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Nuestras Especialidades</span>
          <h2 className="text-4xl font-serif text-navy">Servicios de <span className="text-gold">Élite</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-10 shadow-sm border border-slate-100 hover:border-gold/30 hover:shadow-xl transition-all group"
            >
              <div className="text-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif mb-4 text-navy">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>
              <a href="#" className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
                Saber más <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIScanner = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskAnalysis | null>(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const analysis = await analyzeTaxRisk(input);
      setResult(analysis);
    } catch (err) {
      setError('Ocurrió un error al procesar el diagnóstico. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (color: string) => {
    switch (color) {
      case 'Verde': return { icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' };
      case 'Amarillo': return { icon: <Info className="text-amber-500" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' };
      case 'Rojo': return { icon: <AlertTriangle className="text-rose-500" />, bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700' };
      default: return { icon: <Info />, bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-700' };
    }
  };

  return (
    <section id="ai-scanner" className="py-24 navy-gradient text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gold/20 text-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-gold/30">
            <Search className="w-3 h-3" /> Herramienta Inteligente
          </div>
          <h2 className="text-4xl font-serif mb-4">Escáner de <span className="text-gold">Riesgo Fiscal</span></h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Utiliza nuestra tecnología de IA para obtener un diagnóstico preliminar sobre tu situación fiscal o legal en segundos.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-xl shadow-2xl">
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest text-gold mb-3">Describe tu situación</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: Recibí un aviso del SAT sobre mi declaración anual 2024 y no estoy seguro de cómo proceder..."
              className="w-full bg-navy/50 border border-white/10 rounded-lg p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 min-h-[150px] transition-all"
            />
          </div>

          <button 
            onClick={handleScan}
            disabled={loading || !input.trim()}
            className={`w-full gold-gradient text-navy py-4 rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${loading || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin" />
                Procesando Análisis...
              </>
            ) : (
              <>
                Iniciar Diagnóstico <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {error && (
            <div className="mt-6 p-4 bg-rose-500/20 border border-rose-500/30 text-rose-200 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10"
              >
                <div className={`p-6 rounded-xl border ${getStatusConfig(result.color).bg} ${getStatusConfig(result.color).border}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      {getStatusConfig(result.color).icon}
                    </div>
                    <div>
                      <h4 className={`font-bold text-lg ${getStatusConfig(result.color).text}`}>Riesgo {result.level}</h4>
                      <p className="text-slate-500 text-xs uppercase tracking-widest font-medium">Diagnóstico de IA</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-6">
                    {result.summary}
                  </p>

                  <div className="space-y-3">
                    <h5 className="text-navy font-bold text-sm uppercase tracking-widest">Recomendaciones:</h5>
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-[10px] uppercase tracking-widest italic">
                      * Este análisis es generado por IA y no sustituye una asesoría profesional.
                    </p>
                    <button className="text-navy font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:text-gold transition-colors">
                      Agendar Cita con Experto <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4 block">Contacto</span>
            <h2 className="text-4xl font-serif text-navy mb-8">Estamos listos para <span className="text-gold">ayudarte</span></h2>
            <p className="text-slate-500 mb-12">
              Visítanos en nuestras oficinas o contáctanos a través de nuestros canales digitales. Un especialista te atenderá a la brevedad.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-gold shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Ubicación</h4>
                  <p className="text-slate-500 text-sm">Av. Paseo de la Reforma 250, Juárez, CDMX, 06600</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Teléfono</h4>
                  <p className="text-slate-500 text-sm">+52 (55) 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-gold shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-navy mb-1">Email</h4>
                  <p className="text-slate-500 text-sm">contacto@carrillogamboa.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-xl border border-slate-100">
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/60">Nombre</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-gold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-navy/60">Apellido</label>
                  <input type="text" className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-gold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60">Email</label>
                <input type="email" className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-gold" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60">Asunto</label>
                <select className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-gold">
                  <option>Asesoría Fiscal</option>
                  <option>Legal / Litigio</option>
                  <option>Contabilidad</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-navy/60">Mensaje</label>
                <textarea className="w-full bg-white border border-slate-200 rounded-lg p-3 focus:outline-none focus:border-gold min-h-[120px]" />
              </div>
              <button className="w-full navy-gradient text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-125 transition-all">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy pt-20 pb-10 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 gold-gradient rounded-sm flex items-center justify-center">
                <Scale className="text-navy w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold tracking-tighter">
                CARRILLO GAMBOA <span className="text-gold">& ASOCIADOS</span>
              </span>
            </div>
            <p className="text-white/50 max-w-md leading-relaxed mb-8">
              Firma líder en servicios integrales de consultoría fiscal, legal y administrativa. Comprometidos con la excelencia y la protección del patrimonio de nuestros clientes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-navy transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Enlaces Rápidos</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#home" className="hover:text-gold transition-colors">Inicio</a></li>
              <li><a href="#about" className="hover:text-gold transition-colors">Nosotros</a></li>
              <li><a href="#services" className="hover:text-gold transition-colors">Servicios</a></li>
              <li><a href="#booking" className="hover:text-gold transition-colors">Agendar Cita</a></li>
              <li><a href="#ai-scanner" className="hover:text-gold transition-colors">Escáner IA</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-white/50 text-sm">
              <li><a href="#" className="hover:text-gold transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Bolsa de Trabajo</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-xs uppercase tracking-widest font-medium">
          <p>&copy; 2026 Carrillo Gamboa & Asociados. Todos los derechos reservados.</p>
          <p>CDMX, México.</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <BookingSystem />
      <Testimonials />
      <AIScanner />
      <Contact />
      <Footer />
    </div>
  );
}
