import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

// Custom hook za lakši pristup prevodima
export const useTranslations = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useTranslations must be used within a LanguageProvider");
  }

  // Vraćamo samo objekat sa prevodima
  return context.translations;
};

// Opcioni hook ako treba pristup i jeziku i funkciji za promenu
export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context; // Vraća { language, translations, setLanguage }
};
