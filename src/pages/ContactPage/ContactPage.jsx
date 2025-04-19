import React from 'react';
import { useTranslations } from '../../hooks/useTranslations'; // Importujemo hook
import './ContactPage.css'; // Importujemo CSS

function ContactPage() {
  const t = useTranslations(); // Pozivamo hook

  // Proveravamo da li postoji t.contact pre nego što pristupimo ključevima
  if (!t.contact) {
    return <div>Loading contact information...</div>; // Ili neki drugi fallback
  }

  return (
    <>
    <title>Veljko Spasic | Contact</title>
    <meta name="description" content="Feel free to reach out. I'm open to new projects, collaborations, or just connecting with like-minded people in tech."/>
    <meta name="keywords" content="Veljko Spasic contact, software engineer collaboration, freelance developer, AI engineer Serbia, full stack developer contact, connect with Veljko Spasic"/>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.veljkospasic.com/contact" />
    <div className="contact-page">
      <article className="contact-content">
        <header>
          <h1 className="page-title">{t.contact.title}</h1> {/* Koristimo istu klasu kao na drugim stranicama */} 
        </header>
        <p>{t.contact.greeting}</p>
        <p>{t.contact.intro}</p>
        {/* Koristimo dangerouslySetInnerHTML za paragrafe sa HTML-om */}
        <p dangerouslySetInnerHTML={{ __html: t.contact.emailPrompt }} />
        <p dangerouslySetInnerHTML={{ __html: t.contact.linkedinPrompt }} />
        <p dangerouslySetInnerHTML={{ __html: t.contact.githubPrompt }} />
        
        <h2 id="schedule-a-call-appointment" className="contact-subheading">{t.contact.callHeading}</h2> {/* Dodajemo klasu za H2 */} 
        <p>{t.contact.callPrompt}</p>
      </article>
     
    </div>
    </>
  );
}

export default ContactPage; 