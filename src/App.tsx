import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExpertProfile } from './components/ExpertProfile';
import { TrustIndicators } from './components/TrustIndicators';
import { AiReading } from './components/AiReading';
import { NumerologySection } from './components/NumerologySection';
import { ConsultationSection } from './components/ConsultationSection';
import { BookingSuccess } from './components/BookingSuccess';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminModal } from './components/AdminModal';
import { Booking } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [adminOpen, setAdminOpen] = useState(false);
  const [consultationData, setConsultationData] = useState<{ name: string; dob: string; place: string } | null>(null);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('mode') === 'consultation') {
      const savedDetails = sessionStorage.getItem('angras_consultation_details');
      if (savedDetails) {
        try {
          setConsultationData(JSON.parse(savedDetails));
        } catch (e) {}
      }
      setActiveTab('consultation');
      setTimeout(() => {
        document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  const handleExplore = () => {
    setActiveTab('reading');
    document.getElementById('reading')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBook = () => {
    window.open(window.location.origin + '/?mode=consultation', '_blank');
  };

  const handleBookConsultationWithDetails = (details: { name: string; dob: string; place: string }) => {
    sessionStorage.setItem('angras_consultation_details', JSON.stringify(details));
    window.open(window.location.origin + '/?mode=consultation', '_blank');
  };

  const handleBookingSuccess = (booking: Booking) => {
    setSuccessBooking(booking);
    setActiveTab('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setSuccessBooking(null);
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (id: string) => {
    if (id === 'consultation') {
      window.open(window.location.origin + '/?mode=consultation', '_blank');
      return;
    }
    setActiveTab(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (activeTab === 'success' && successBooking) {
    return <BookingSuccess booking={successBooking} onReturnHome={handleReturnHome} />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main>
        <ExpertProfile />
        <TrustIndicators />
        <Hero onExplore={handleExplore} onBook={handleBook} />
        <AiReading onBookConsultationWithDetails={handleBookConsultationWithDetails} />
        <NumerologySection />
        <ConsultationSection initialData={consultationData} onBookingSuccess={handleBookingSuccess} />
        <Testimonials />
        <FaqSection />
        <ContactSection />
      </main>

      <Footer onNavClick={handleNavClick} />

      {adminOpen && <AdminModal onClose={() => setAdminOpen(false)} />}
    </div>
  );
}
