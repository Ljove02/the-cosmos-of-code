import React from 'react';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import ProjectCard from '../../components/ProjectCard'; // Ispravljen import putanja?
import { projectsData } from '../../data/projectsData'; // Importujemo podatke
import './ProjectPage.css';
// Importujemo sliku astronauta
import astronautImage from '/assets/astronaut.png'; // Paznja: Putanja moze zavisiti od build procesa (npr. Vite)

function ProjectPage() {
  const t = useTranslations();

  return (
    <div className="project-page">
      <h1 className="page-title">{t.projects.title}</h1>

      {projectsData.length === 0 ? (
        // Prikazujemo placeholder ako nema projekata
        <div className="project-placeholder">
          <img 
            rel="preload"
            src={astronautImage} 
            alt="Astronaut meditating" 
            className="placeholder-image" 
          />
          <p className="placeholder-text">
            Cooking some spicy Projects
          </p>
        </div>
      ) : (
        // Prikazujemo grid ako ima projekata
        <div className="projects-grid">
          {projectsData.map((project) => (
            <ProjectCard 
              key={project.id} 
              title={project.title} 
              description={project.description} 
              tags={project.tags} 
              image={project.image} 
              githubUrl={project.githubUrl} 
              demoUrl={project.demoUrl} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectPage; 