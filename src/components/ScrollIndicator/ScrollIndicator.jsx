import React, { useState, useEffect, useRef } from 'react';
import DecryptedText from '../DecryptedText';
import './ScrollIndicator.css';

// Podesivo vreme inicijalnog kašnjenja u ms
const INITIAL_DELAY_MS = 1000;
const SCROLL_THRESHOLD = 0.10; // Prag skrola (10% visine prozora)

function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(false); // Da li treba dodati .visible klasu
  const [hasInitialDelayPassed, setHasInitialDelayPassed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);
  const [decryptionKey, setDecryptionKey] = useState(0);
  const isInitiallyVisibleRef = useRef(true); // Da li je bio vidljiv na početku

  // Provera inicijalne scroll pozicije
  useEffect(() => {
    const initialScrolled = window.scrollY / window.innerHeight;
    isInitiallyVisibleRef.current = !(initialScrolled > SCROLL_THRESHOLD);
  }, []);

  // Efekat za inicijalno kašnjenje
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialDelayPassed(true);
    }, INITIAL_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  // Efekat za praćenje resize-a i postavljanje isDesktop
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Inicijalna provera
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efekat za praćenje skrola i ažuriranje vidljivosti NAKON kašnjenja
  useEffect(() => {
    // Ne radi ništa dok kašnjenje ne prođe
    if (!hasInitialDelayPassed) return;

    const handleScroll = () => {
      const scrolled = window.scrollY / window.innerHeight;
      const shouldBeVisible = !(scrolled > SCROLL_THRESHOLD);

      // Ažuriraj stanje samo ako smo na desktopu
      if (isDesktop) {
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Odmah proveri stanje nakon kašnjenja (i inicijalne provere rezolucije)
    if (isDesktop && isInitiallyVisibleRef.current) {
        setIsVisible(true);
    }

    // Ako smo na mobilnom nakon kašnjenja, osiguraj da je sakriven
    if (!isDesktop) {
        setIsVisible(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // Zavisnosti: isDesktop i hasInitialDelayPassed
    // Kada se bilo koja od njih promeni, ovaj efekat se ponovo pokreće
  }, [isDesktop, hasInitialDelayPassed]);

  // Efekat za ponavljanje dekripcije (ostaje isti)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDecryptionKey(prevKey => prevKey + 1);
    }, 7000);
    return () => clearInterval(intervalId);
  }, []);

  // Konstruisanje klase na osnovu stanja
  const wrapperClassName = `scroll-indicator-wrap ${isVisible ? 'visible' : ''}`;

  // Uvek renderujemo div, ali CSS kontroliše opacity
  return (
    <div className={wrapperClassName}>
      <div className="scroll-indicator-mouse">
        <div className="scroll-indicator-scroller"></div>
      </div>
      <DecryptedText
        key={decryptionKey}
        text="About Me" // Trebalo bi koristiti prevod ovde
        animateOn="view"
        sequential={true}
        speed={50}
        parentClassName="scroll-indicator-label"
      />
    </div>
  );
}

export default ScrollIndicator;
