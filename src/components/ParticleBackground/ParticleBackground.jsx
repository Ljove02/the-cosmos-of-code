import React, { useRef, useEffect } from 'react';
import './ParticleBackground.css';

// Prihvata style prop
function ParticleBackground({ style }) {
  const canvasRef = useRef(null);
  // Koristimo useRef za čuvanje ID-ja animacije da bismo mogli da je prekinemo
  const animationFrameId = useRef(null);
  // Koristimo useRef za čuvanje niza čestica i brojača
  const particles = useRef([]);
  const particleCount = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // --- Vraćena originalna JS logika --- //

    const calculateParticleCount = () => {
      // Vraćeno na originalni delilac
      return Math.floor((canvas.width * canvas.height) / 6000);
    };

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        // Vraćeno na originalno resetovanje Y pozicije
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        // Vraćena originalna neprozirnost
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
        // Uklonjena dodatna size promenljiva
      }

      update() {
        this.y -= this.speed;
        // Vraćen originalni uslov za reset
        if (this.y < 0) {
          this.reset();
        }

        // Vraćena originalna fading logika
        if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
        }

        if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
                this.reset();
            }
        }
      }

      draw() {
        // Vraćen originalni način crtanja
        ctx.fillStyle = `rgba(${255 - (Math.random() * 255/2)}, 255, 255, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, 0.4, Math.random() * 3 + 2);
      }
    }

    const initParticles = () => {
      particles.current = [];
      particleCount.current = calculateParticleCount();
      for (let i = 0; i < particleCount.current; i++) {
        particles.current.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach(particle => {
        particle.update();
        particle.draw();
      });
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Vraćena originalna logika za resize
      particleCount.current = calculateParticleCount();
      initParticles();
    };

    // --- Kraj originalne JS logike --- //

    // Inicijalno postavljanje veličine i čestica
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
    animate(); // Pokrećemo animaciju

    // Dodajemo resize listener
    window.addEventListener('resize', onResize);

    // Cleanup funkcija
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId.current); // Prekidamo animaciju
    };

  }, []); // Prazan niz zavisnosti osigurava da se efekat pokrene samo jednom (na mount)

  // Primenjuje prosleđeni style na canvas
  return <canvas ref={canvasRef} id="particleCanvas" style={style}></canvas>;
}

export default ParticleBackground; 