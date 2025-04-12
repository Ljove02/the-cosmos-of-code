import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import { allPosts } from '../../data/mockPosts'; // Import podataka
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
          <p className="no-posts-message">No posts to display in this category.</p>
        )}
      </div>
    </div>
  );
}

export default BlogMainPage; 