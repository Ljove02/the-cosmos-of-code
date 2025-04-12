import React, { useState, useEffect, useRef } from 'react';
import './TypingAnimation.css';

function TypingAnimation({ texts, typeSpeed = 100, deleteSpeed = 50, delay = 1500 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Osiguramo da uvek počne sa prvim tekstom
    if (textIndex === 0 && subIndex === 0 && !isDeleting && displayedText === '') {
      setSubIndex(0); // Reset subIndex ako je već na početku
    }

    // Čišćenje timeout-a pri svakoj promeni zavisnosti
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Logika za kucanje
    if (!isDeleting && subIndex < texts[textIndex].length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + texts[textIndex][subIndex]);
        setSubIndex(prev => prev + 1);
      }, typeSpeed);
    }
    // Logika za prelazak na brisanje (nakon pauze)
    else if (!isDeleting && subIndex === texts[textIndex].length) {
      timeoutRef.current = setTimeout(() => {
        // Ne brišemo prvi tekst "Veljko Spasic" odmah, osim ako nije jedini tekst
        if (textIndex === 0 && texts.length > 1) {
             // Preskačemo brisanje prvog elementa i idemo na sledeći
             setIsDeleting(false); // O(p)stajemo u stanju kucanja
             setSubIndex(0);
             setTextIndex(prev => (prev + 1) % texts.length);
             setDisplayedText(''); // Počinjemo sledeći tekst od praznog stringa
        } else {
             setIsDeleting(true);
        }
      }, delay);
    }
    // Logika za brisanje
    else if (isDeleting && subIndex > 0) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev.substring(0, prev.length - 1));
        setSubIndex(prev => prev - 1);
      }, deleteSpeed);
    }
    // Logika za prelazak na sledeći tekst (nakon brisanja)
    else if (isDeleting && subIndex === 0) {
      setIsDeleting(false);
      setTextIndex(prev => (prev + 1) % texts.length);
      // displayedText će automatski biti prazan jer je subIndex 0
    }

    // Cleanup funkcija za prekidanje timeout-a
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [subIndex, isDeleting, textIndex, texts, typeSpeed, deleteSpeed, delay, displayedText]); // Dodajemo displayedText da bi reset na pocetku radio

  return (
    <span className="typing-container">
      {displayedText}
      <span className="typing-cursor">|</span>
    </span>
  );
}

export default TypingAnimation;
