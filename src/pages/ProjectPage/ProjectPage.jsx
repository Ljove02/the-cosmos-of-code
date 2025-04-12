import React from 'react';
import { useLanguage, useTranslations } from '../../hooks/useTranslations';
import ProjectCard from '../../components/ProjectCard'; // Import kartice
import './ProjectPage.css';

// Privremeni podaci o projektima
const projectsData = [
  {
    id: 1,
    title: { sr: 'Portfolio V1', en: 'Portfolio V1' },
    description: { sr: 'Prva verzija ličnog portfolija kreirana pomoću HTML, CSS i JS.', en: 'First version of the personal portfolio built with HTML, CSS, and JS.' },
    imageUrl: '/images/project-portfolio-v1.jpg', // Putanja do slike unutar public foldera ili import
    projectUrl: 'https://stari-portfolio.example.com',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 2,
    title: { sr: 'Aplikacija za Beleške', en: 'Notes App' },
    description: { sr: 'Jednostavna React aplikacija za kreiranje i upravljanje beleškama.', en: 'Simple React application for creating and managing notes.' },
    imageUrl: '/images/project-notes-app.jpg',
    projectUrl: 'https://notes-app.example.com',
    tags: ['React', 'LocalStorage', 'CSS'],
  },
  {
    id: 3,
    title: { sr: 'Blog Platforma (Backend)', en: 'Blog Platform (Backend)' },
    description: { sr: 'Node.js/Express backend API za blog platformu sa autentifikacijom.', en: 'Node.js/Express backend API for a blog platform with authentication.' },
    imageUrl: '/images/project-blog-backend.jpg', // Može biti i generička slika za backend
    projectUrl: 'https://github.com/yourusername/blog-backend', // Link ka repozitorijumu
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
  },
  // Dodajte još projekata
];

function ProjectPage() {
  const t = useTranslations();
  const { language } = useLanguage();

  return (
    <div className="project-page">
      <h1 className="page-title">{t.projects.title}</h1>
      <div className="projects-grid">
        {projectsData.map(project => (
          <ProjectCard
            key={project.id}
            title={project.title[language]}
            description={project.description[language]}
            imageUrl={project.imageUrl}
            projectUrl={project.projectUrl}
            tags={project.tags}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage; 