import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import { allPosts } from '../../data/Posts'; // Import podataka
import './BlogMainPage.css';

// Privremeni podaci - Idealno bi dolazili iz API-ja ili CMS-a
/* const allPosts = [...] - Uklonjeno odavde */

function BlogMainPage() {
  const t = useTranslations();
  const { language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'case-study', 'blog'

  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') {
      // Prikazujemo SVE postove
      return allPosts;
    }
    // Prikazujemo SVE postove iz filtrirane kategorije
    return allPosts.filter(post => post.category === activeFilter);
  }, [activeFilter]);

  const getButtonClass = (filterType) => {
    return `filter-button ${activeFilter === filterType ? 'active' : ''}`;
  };

  return (
    <>
    <title>Veljko Spasic | Blog</title>
    <meta name="description" content="I write about things that interest me — from artificial intelligence and data science to system design and personal projects. I document ideas, experiments, and thoughts on technology in motion."/>
    <meta name="keywords" content="Veljko Spasic, tech blog, AI articles, data science writing, full stack development, personal projects, software engineering insights, machine learning blog, developer experiences, Serbia developer blog, startup"/>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.veljkospasic.com/blog" />
    <div className="blog-main-page">
      <h2 className="blog-list-title">{t.blog.title}</h2>

      <div className="filter-controls" role="group" aria-label="Filter blog posts">
        <button onClick={() => setActiveFilter('all')} className={getButtonClass('all')}>
          {t.blog.all}
        </button>
        <button onClick={() => setActiveFilter('case-study')} className={getButtonClass('case-study')}>
          {t.blog.filterCaseStudies}
        </button>
        <button onClick={() => setActiveFilter('blog')} className={getButtonClass('blog')}>
          {t.blog.filterBlogs}
        </button>
      </div>

      <div className="posts-list">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <article key={post.id} className="post-item-minimal">
              <Link to={`/blog/${post.slug}`} className="blog-item-link">
                <span className="blog-item-title">{post.title[language]}</span>
              </Link>
              <span className="blog-item-date">{post.date}</span>
            </article>
          ))
        ) : (
          <p className="no-posts-message">{t.blog['no-posts-message']}</p>
        )}
      </div>
    </div>
    </>
  );
}

export default BlogMainPage; 