import React, { createContext, useState, useEffect, useMemo } from 'react';

// 1. Kreiranje Konteksta
export const LanguageContext = createContext();

// Direktni import JSON fajlova koje Vite obrađuje
import enTranslations from '../locales/en.json';
import srTranslations from '../locales/sr.json';

// Objekat koji mapira jezik na učitane prevode
const translationsData = {
  en: enTranslations,
  sr: srTranslations
};

// 2. Kreiranje Provider Komponente
export const LanguageProvider = ({ children }) => {
  // Pokušaj čitanja jezika iz localStorage ili koristi 'en' kao podrazumevani
  const getInitialLanguage = () => {
    const storedLanguage = localStorage.getItem('language');
    return storedLanguage && translationsData[storedLanguage] ? storedLanguage : 'en';
  };

  const [language, setLanguage] = useState(getInitialLanguage);

  // Efekat za čuvanje jezika u localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // useMemo da izbegnemo recalculating na svaki re-render ako se jezik nije promenio
  const translations = useMemo(() => translationsData[language], [language]);

  // Funkcija za promenu jezika
  const switchLanguage = (lang) => {
    if (translationsData[lang]) {
      setLanguage(lang);
    }
  };

  const contextValue = useMemo(() => ({
    language,
    translations,
    setLanguage: switchLanguage,
  }), [language, translations]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}; 