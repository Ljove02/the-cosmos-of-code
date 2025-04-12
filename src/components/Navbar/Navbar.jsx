import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLanguage } from '../../hooks/useTranslations'; // Hook za jezik
import { ShinyButton } from '../ShinyButton'; // Import ShinyButton
// Importujemo slike zastava
import serbiaFlag from '../../assets/serbia.png';
import usFlag from '../../assets/united-states.png';
import './Navbar.css';

function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'sr' ? 'en' : 'sr');
    // Ne zatvaramo mobilni meni ovde, korisnik može želeti da ostane otvoren
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Efekat za zatvaranje menija na resize ako prozor postane širi
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Dodajemo klasu na body kada je meni otvoren da sprečimo skrolovanje pozadine
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('body-no-scroll');
    } else {
      document.body.classList.remove('body-no-scroll');
    }
    // Cleanup funkcija
    return () => {
      document.body.classList.remove('body-no-scroll');
    };
  }, [isMobileMenuOpen]);

  // Određujemo koju zastavu prikazati (prikazujemo zastavu jezika NA KOJI SE PREBACUJE)
  const flagToShow = language === 'en' ? serbiaFlag : usFlag;
  const nextLanguageLabel = language === 'en' ? 'Prebaci na Srpski' : 'Switch to English'; // Ažuriran label
  const altText = language === 'en' ? 'Serbian flag' : 'US flag'; // Alt tekst odgovara zastavi koja se prikazuje

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Leva strana + Nav Linkovi (Desktop) / Hamburger (Mobile) */}
          <div className="navbar-left">
            {/* Desktop Navigacioni Linkovi - premešteni ovde */}
            <div className="navbar-center-desktop">
               <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>01 : Home</NavLink>
               <p className='nav-link-separator'>|</p>
               <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>02 : Blog</NavLink>
               <p className='nav-link-separator'>|</p>
               <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>03 : Projects</NavLink>
             </div>
            <button className="mobile-menu-icon" onClick={toggleMobileMenu} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
              {/* Jednostavan hamburger ikonica (može se zameniti SVG-om) */}
              &#9776;
            </button>
          </div>

          {/* Sredina (Desktop) - Sada prazna ili uklonjena */}
          {/* <div className="navbar-center">...</div> */}

          {/* Desna strana (Desktop) / Samo Jezički Switcher (Mobile) */}
          <div className="navbar-right">
            <Link to="/contact">
              <ShinyButton className="contact-shiny-button">Contact Me</ShinyButton>
            </Link>
            {/* Koristimo dugme sa slikom zastave */} 
            <button
              onClick={toggleLanguage}
              className="language-switcher-nav flag-button"
              aria-label={nextLanguageLabel}
            >
              <img src={flagToShow} alt={altText} className="flag-icon" />
            </button>
          </div>

           {/* Samo Jezički Switcher prikazan direktno na mobilnom */}
           <div className="navbar-right-mobile">
             <button
               onClick={toggleLanguage}
               className="language-switcher-nav flag-button"
               aria-label={nextLanguageLabel}
             >
               <img src={flagToShow} alt={altText} className="flag-icon" />
             </button>
           </div>
        </div>
      </nav>

      {/* Mobile Side Nav */}
      <div className={`mobile-nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Overlay za zatvaranje menija klikom van njega */}
        {isMobileMenuOpen && <div className="mobile-nav-overlay" onClick={closeMobileMenu}></div>}
        <div className="mobile-nav-content">
           <button className="close-menu-icon" onClick={closeMobileMenu} aria-label="Close menu">&times;</button>
          <Link to="/" className="mobile-nav-link logo-link">
             Veljko Spasić
           </Link>
           <Link to="/contact" className="mobile-nav-link contact-link">
              <ShinyButton className="contact-shiny-button-mobile">
                 Contact
              </ShinyButton>
           </Link>
           <NavLink to="/" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'} end>Home</NavLink>
           <NavLink to="/blog" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>Blog</NavLink>
           <NavLink to="/projects" className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}>Projects</NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
