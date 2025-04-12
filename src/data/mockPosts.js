// src/data/mockPosts.js

// Privremeni podaci - Idealno bi dolazili iz API-ja ili CMS-a
export const allPosts = [
  {
    id: 1,
    slug: "prvi-blog-post",
    title: { sr: "Moj Prvi Blog Post", en: "My First Blog Post" },
    excerpt: {
      sr: "Kratak izvod mog prvog blog posta...",
      en: "A short excerpt of my first blog post...",
    },
    content: {
      sr: `
        <h2>Početak Putovanja</h2>
        <p>Ovo je sadržaj mog prvog blog posta napisanog na srpskom jeziku. Cilj je demonstrirati kako će izgledati struktura pojedinačnog posta.</p>
        <p>Možemo koristiti osnovne HTML tagove za formatiranje teksta, kao što su <strong>podebljano</strong>, <em>iskošeno</em>, ili čak liste:</p>
        <ul>
          <li>Stavka 1</li>
          <li>Stavka 2</li>
          <li>Stavka 3</li>
        </ul>
        <p>Naravno, sadržaj će biti dinamički učitan na osnovu izabranog jezika.</p>
      `,
      en: `
        <h2>Beginning the Journey</h2>
        <p>This is the content of my first blog post written in English. The goal is to demonstrate the structure of an individual post.</p>
        <p>We can use basic HTML tags for text formatting, such as <strong>bold</strong>, <em>italic</em>, or even lists:</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
        <p>Of course, the content will be dynamically loaded based on the selected language.</p>
      `,
    },
    category: "blog",
    date: "2024-07-27",
  },

  // Dodajte još postova po potrebi
];
