import React from 'react';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import ProjectCard from '../../components/ProjectCard'; // Uklanjamo stari import

import './ProjectPage.css';

// Uklanjamo dummy podatke
// const projectsData = [ ... ];

function ProjectPage() {
  const t = useTranslations();
  // const { language } = useLanguage(); // Ne treba nam jezik ako nemamo dinamički tekst

  return (
    <div className="project-page">
      {/* Zadržavamo naslov stranice */}
      <h1 className="page-title">{t.projects.title}</h1>
      <div className="projects-grid">
        
      </div>
    </div>
  );
}

export default ProjectPage; 