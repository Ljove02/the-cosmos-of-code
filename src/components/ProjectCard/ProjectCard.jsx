import React from 'react';

import './ProjectCard.css';

const ProjectCard = ({ 
  title, 
  description, 
  tags, 
  image = '/placeholder.svg',
  githubUrl, 
  demoUrl 
}) => {
  return (
    <div className="project-card">
      <div className="project-card-image-wrapper">
        <img 
          src={image} 
          alt={title} 
          className="project-card-image" 
        />
      </div>
      
      <div className="project-card-content">
        <h3 className="project-card-title">{title}</h3>
        <p className="project-card-description">{description}</p>
        
        <div className="project-card-tags">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="project-card-tag"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="project-card-links">
          {githubUrl && (
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-card-link"
              aria-label="View GitHub repository"
            >
              
            </a>
          )}
          
          {demoUrl && (
            <a 
              href={demoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-card-link"
              aria-label="View live demo"
            >
              
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 