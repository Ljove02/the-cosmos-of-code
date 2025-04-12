import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useTranslations';
import DecryptedText from '../../components/DecryptedText';
import TypingAnimation from '../../components/TypingAnimation';
import ScrollIndicator from '../../components/ScrollIndicator';
import './LandingPage.css';

function LandingPage() {
  const { translations: t } = useLanguage();

  // Niz tekstova za TypingAnimation iz prevoda - ISPRAVNA SINTAKSA
  const typingTexts = [
    t.introduction.type1, // Ovo je string
    t.introduction.type2, // Ovo je string
    t.introduction.type3, // Ovo je string
    t.introduction.type4  // Ovo je string
  ];

  const subheadingText = "Software Engineer | Full Stack Developer | AI Enthusiast";

  return (
    <div className="landing-page">
      <section className="intro-section" aria-labelledby="intro-heading">
        <div className="intro-heading-wrapper">
          <h1 id="intro-heading" className="intro-heading static-h1">
            {t.introduction.mainGreeting}
          </h1>
          <h1 className="intro-heading dynamic-h1">
            <TypingAnimation texts={typingTexts} />
          </h1>
        </div>

        <p className="intro-subheading">
          <DecryptedText
            text={subheadingText}
            animateOn="view"
            sequential={true}
            revealDirection="start"
            speed={30}
            className="intro-subheading-char"
            parentClassName="intro-subheading-parent"
          />
        </p>
      </section>

      <section id="about-section" className="about-section" aria-labelledby="about-heading">
        <h2 id="about-heading" className="section-heading">
          {t.landing.aboutMeTitle}
        </h2>
        <div className="about-content">
          <p>
            {t.landing.aboutMePlaceholder1}
          </p>
          <p>
            {t.landing.aboutMePlaceholder2}
          </p>
          <div className="about-currently">
            <h4>{t.landing.currentlyTitle}</h4>
            <ul>
              <li>{t.landing.currentlyItem1}</li>
              <li>{t.landing.currentlyItem2}</li>
              <li>{t.landing.currentlyItem3}</li>
            </ul>
          </div>
        </div>
      </section>

      <ScrollIndicator />
    </div>
  );
}

export default LandingPage; 