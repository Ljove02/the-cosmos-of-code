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
    <>
    <title>Veljko Spasic | Projects</title>
    <meta name="description" content="Explore personal and collaborative projects where I build, test, and experiment with ideas in AI, data science, full stack development, and early-stage startup concepts."/>
    <meta name="keywords" content="Veljko Spasic, AI projects, data science portfolio, full stack development, startup projects, collaborative tech work, personal software builds, software engineer Serbia"/>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.veljkospasic.com/projects" />
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
    </>
  );
}

export default ProjectPage; 