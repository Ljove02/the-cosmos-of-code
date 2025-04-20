import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useTranslations';
import DecryptedText from '../../components/DecryptedText';
import TypingAnimation from '../../components/TypingAnimation';
import ScrollIndicator from '../../components/ScrollIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

function LandingPage() {
  const { translations: t } = useLanguage();

  
  const typingTexts = [
    t.introduction.type1, 
    t.introduction.type2, 
    t.introduction.type3, 
    t.introduction.type4  
  ];

  const subheadingText = "Software Engineer | AI Builder & Tinkerer | Startup Explorer";

  return (
    <>
    <title>Veljko Spasic | AI, Data Science & Full Stack</title>
    <meta name="description" content="I'm Veljko Spasic, a software engineer who enjoys combining AI, data science, and development into projects that make sense. I like technology, good ideas, and simple solutions."/>
    <meta name="keywords" content="Veljko Spasic, software engineer, AI developer, data science engineer, full stack web developer, machine learning projects, personal tech blog, AI portfolio, Serbia developer, modern web applications"/>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.veljkospasic.com/" />
      
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

        {/* === Social Links Section === */}
        <div className="social-links">
          <span className="social-links-span">Links: </span>
          <a 
            href="https://www.linkedin.com/in/veljko-spasic-831b4828b/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="LinkedIn Profile"
          >
             {<FontAwesomeIcon icon={faLinkedin} />}
          </a>
          <a 
            href="https://github.com/Ljove02" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link"
            aria-label="GitHub Profile"
          >
              {<FontAwesomeIcon icon={faGithub} />}
          </a>
          <a 
            href="mailto:veljkoposlovni02@gmail.com" 
            className="social-link"
            aria-label="Send Email"
          >
             {<FontAwesomeIcon icon={faEnvelope} />}
          </a>
        </div>
        {/* === End Social Links Section === */}

      </section>

      <ScrollIndicator />
    </div>
    </>
  );
}

export default LandingPage; 