import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import { allPosts } from '../../data/Posts'; // Import podataka
import AudioNarrator from '../../components/AudioNarrator'; // Import nove komponente
import './BlogTemplatePage.css';

function BlogTemplatePage() {
  const { slug } = useParams();
  const { language } = useLanguage();
  const t = useTranslations();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    // Pronalazimo post na osnovu slug-a
    const foundPost = allPosts.find(post => post.slug === slug);

    if (foundPost) {
      setPostData(foundPost);
    } else {
      setError('Post nije pronađen.'); // TODO: Prevesti
      // Opciono: Preusmeri na 404 stranicu nakon par sekundi
      // setTimeout(() => navigate('/404'), 3000);
    }
    setIsLoading(false);
  }, [slug]); // Ponovo pokreni efekat ako se slug promeni

  if (isLoading) {
    // TODO: Prevesti i stilizovati
    return <div className="loading-message">Učitavanje posta...</div>;
  }

  if (error) {
     // TODO: Prevesti i stilizovati
    return <div className="error-message">{error}</div>;
  }

  if (!postData) {
    // Ovo ne bi trebalo da se desi ako isLoading i error rade kako treba, ali za svaki slučaj
    // TODO: Prevesti i stilizovati
    return <div className="error-message">Došlo je do greške prilikom učitavanja posta.</div>;
  }

  const categoryText = postData.category === 'case-study' ? t.blog.filterCaseStudies : t.blog.filterBlogs;
  // Provera da li postoje audio fajlovi za prikazivanje plejera
  const hasAudio = postData.audioSr && postData.audioEn; 


  return (
    <>
    <title>{postData.title[language]}</title>
    <meta name="description" content={postData.description} />
    <meta name="keywords" content={postData.keywords} />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={`https://www.veljkospasic.com/blog/${postData.slug}`} />
    <article className="blog-template-page">
      <header className="post-header">
        <h1 className="post-title-main">{postData.title[language]}</h1>
        <p className="post-meta-main">
          <span>{categoryText} | <span className="post-date-text">{postData.date}</span></span>
          <span className="post-read-time">{t.blog.readingTime} <span className="post-read-time-text">{postData.readTime[language]}</span></span>
        </p>
      </header>

      {/* Uslovno renderovanje Audio Narrator komponente */} 
      {hasAudio && (
        <AudioNarrator 
          audioSr={postData.audioSr} 
          audioEn={postData.audioEn} 
          language={language} 
        />
      )}

      {/* Koristimo dangerouslySetInnerHTML za prikaz HTML sadržaja. */}
      {/* Ovo je bezbedno samo ako ste sigurni da HTML dolazi iz pouzdanog izvora (npr. vašeg CMS-a). */}
      {/* Potrebno je sanitizovati HTML ako dolazi od korisnika! */}
      <div
        className="post-content-main"
        dangerouslySetInnerHTML={{ __html: postData.content[language] }}
      />

      <footer className="post-footer">
        <Link to="/blog" className="back-link">
          &larr; {t.common.backToBlog}
        </Link>
      </footer>
    </article>
    </>
  );
}

export default BlogTemplatePage; 