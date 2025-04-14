import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import './App.css';
import LandingPage from './pages/LandingPage';
import BlogMainPage from './pages/BlogMainPage';
import ProjectPage from './pages/ProjectPage';
import BlogTemplatePage from './pages/BlogTemplatePage';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import backgroundImage from './assets/gbg.jpg';

// Placeholder importi za stranice - kreiraćemo ih kasnije
// import LandingPage from './pages/LandingPage';
// import BlogMainPage from './pages/BlogMainPage';
// import BlogTemplatePage from './pages/BlogTemplatePage';
// import ProjectPage from './pages/ProjectPage';

// Privremene komponente za testiranje ruta
// const LandingPage = () => <div>Landing Page</div>;
// const BlogMainPage = () => <div>Blog Main Page</div>;
// const BlogTemplatePage = () => <div>Blog Template Page (e.g., /blog/my-first-post)</div>;
// const ProjectPage = () => <div>Project Page</div>;

// Podesive konstante za overlay efekat
const OVERLAY_SCROLL_THRESHOLD_FACTOR = 0.5; // Prag na 50% visine viewporta
const OVERLAY_START_OPACITY = 0.3; // Početni opacity overlay-a
const OVERLAY_END_OPACITY = 1.0;   // Krajnji opacity overlay-a
// Konstanta za početak fade-in čestica (npr. kada overlay pređe 70% opacity)
const PARTICLE_FADE_IN_START_OPACITY = 0.7;

// Komponenta koja sadrži logiku jer hookovi mogu samo unutar komponente
function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  // Stanja za opacitete - inicijalno stanje ostaje isto
  const [overlayOpacity, setOverlayOpacity] = useState(isLandingPage ? OVERLAY_START_OPACITY : OVERLAY_END_OPACITY);
  const [particleOpacity, setParticleOpacity] = useState(isLandingPage ? 0 : 1);
  const showBackgroundImage = true;

  // ===== Novi Efekat za Scroll-to-Top =====
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Pokreni efekat svaki put kada se putanja promeni
  // =======================================

  // Efekat za praćenje skrola i ažuriranje opacity-a
  useEffect(() => {
    // Definišemo handleScroll funkciju uvek, van if bloka
    const handleScroll = () => {
      // Ova logika će se pozivati samo ako je listener dodat (tj. na landing page)
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollThresholdPx = windowHeight * OVERLAY_SCROLL_THRESHOLD_FACTOR;
      let scrollProgress = Math.max(0, Math.min(1, scrollY / scrollThresholdPx));
      const newOverlayOpacity = OVERLAY_START_OPACITY + (OVERLAY_END_OPACITY - OVERLAY_START_OPACITY) * scrollProgress;

      setOverlayOpacity(newOverlayOpacity);

      let newParticleOpacity = 0;
      if (newOverlayOpacity >= PARTICLE_FADE_IN_START_OPACITY) {
        const particleProgress = (newOverlayOpacity - PARTICLE_FADE_IN_START_OPACITY) / (OVERLAY_END_OPACITY - PARTICLE_FADE_IN_START_OPACITY);
        newParticleOpacity = Math.max(0, Math.min(1, particleProgress));
      }
      setParticleOpacity(newParticleOpacity);
    };

    // Ako SMO na landing stranici
    if (isLandingPage) {
      // Postavi inicijalni opacity na osnovu trenutnog skrola
      handleScroll();
      // Dodaj listener
      window.addEventListener('scroll', handleScroll, { passive: true });
    } 
    // Ako NISMO na landing stranici
    else {
      // Postavi fiksne vrednosti
      setOverlayOpacity(OVERLAY_END_OPACITY);
      setParticleOpacity(1);
    }

    // Cleanup funkcija - UVEK pokušaj da ukloniš listener
    // Ako listener nije bio dodat (jer nismo bili na landing page), removeEventListener neće uraditi ništa
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // Ponovo pokreni efekat kada se promeni putanja
  }, [isLandingPage]);

  return (
    <>
      {/* Prikazujemo sliku samo na landing stranici */} 
      {showBackgroundImage && isLandingPage && (
        <div
          className="background-image-container"
          style={{ backgroundImage: `url(${backgroundImage})`, position: 'fixed' }}
        ></div>
      )}
      {/* Overlay je uvek tu, ali opacity zavisi od stranice/skrola */} 
      <div
        className="background-overlay"
        style={{ opacity: overlayOpacity }}
      ></div>
      {/* ParticleBackground je uvek tu, opacity zavisi od stranice/skrola */} 
      <ParticleBackground style={{ opacity: particleOpacity }} />

      <Navbar />
      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', maxHeight: '100vh', height: '100%' }}>
        <main style={{ paddingTop: '70px', flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/blog" element={<BlogMainPage />} />
            <Route path="/blog/:slug" element={<BlogTemplatePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/contact" element={<div>Contact Page Placeholder</div>} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}

// Glavna App komponenta sada samo obavija Router i Provider
function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent /> { /* Renderujemo novu komponentu unutar Routera */ }
      </Router>
    </LanguageProvider>
  );
}

export default App;
