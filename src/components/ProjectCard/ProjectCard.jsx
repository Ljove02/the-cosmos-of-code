import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import './ProjectCard.css';

function ProjectCard({ title, description, imageUrl, projectUrl, tags = [] }) {
  const t = useTranslations();

  // Podrazumevana slika ako imageUrl nije prosleđen
  const displayImage = imageUrl || 'https://via.placeholder.com/400x250?text=Project+Image';

  return (
    <article className="project-card" aria-labelledby={`project-title-${title.replace(/\s+/g, '-')}`}>
      <div className="card-image-container">
        <img src={displayImage} alt={`${title} screenshot`} className="card-image" loading="lazy" />
      </div>
      <div className="card-content">
        <h3 id={`project-title-${title.replace(/\s+/g, '-')}`} className="card-title">{title}</h3>
        {tags.length > 0 && (
          <div className="card-tags">
            {tags.map(tag => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        )}
        <p className="card-description">{description}</p>
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link"
          >
            {t.projects.viewProject}
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard; 