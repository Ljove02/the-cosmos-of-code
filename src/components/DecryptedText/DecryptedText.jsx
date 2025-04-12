import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion' // Uverite se da je framer-motion instaliran

/**
 * DecryptedText
 *
 * Props:
 * - text: string
 * - speed?: number             (default: 50)
 * - maxIterations?: number     (default: 10) - Relevantno samo za !sequential
 * - sequential?: boolean       (default: false) - Da li otkriva slovo po slovo
 * - revealDirection?: "start" | "end" | "center" (default: "start") - Smer otkrivanja za sequential
 * - useOriginalCharsOnly?: boolean (default: false) - Koristi samo karaktere iz originalnog teksta za enkripciju
 * - characters?: string        (default: A-Z a-z !@#$%^&*()_+)
 * - className?: string          (applied to revealed/normal letters)
 * - encryptedClassName?: string (applied to encrypted letters)
 * - parentClassName?: string    (applied to the top-level span container)
 * - animateOn?: "view" | "hover"  (default: "hover")
 */
export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover', // Promenjeno na 'view' po defaultu za vaš slučaj
  ...props
}) {
  const [displayText, setDisplayText] = useState(text) // Počinjemo sa pravim tekstom
  const [isAnimating, setIsAnimating] = useState(false)
  const [revealedIndices, setRevealedIndices] = useState(new Set())
  const [hasAnimated, setHasAnimated] = useState(false)
  const containerRef = useRef(null)

  // Funkcija za generisanje inicijalnog nasumičnog teksta
  const generateInitialScramble = (length) => {
    let scramble = '';
    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');
    for (let i = 0; i < length; i++) {
      if (text[i] === ' ') {
        scramble += ' ';
      } else {
        scramble += availableChars[Math.floor(Math.random() * availableChars.length)];
      }
    }
    return scramble;
  };

  // Postavljamo inicijalno stanje na nasumični tekst pre prvog rendera ako animiramo na view
  useState(() => {
      if(animateOn === 'view') {
          setDisplayText(generateInitialScramble(text.length));
      }
  }, []);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = text.length;
      switch (revealDirection) {
        case 'start':
          return revealedSet.size;
        case 'end':
          return textLength - 1 - revealedSet.size;
        case 'center': {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor((revealedSet.size + 1) / 2);
          const nextIndex =
            revealedSet.size % 2 === 0
              ? middle - offset
              : middle + offset;

          // Provera granica i da li je već otkriveno
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          // Fallback ako centralni indeks ne uspe
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i) && text[i] !== ' ') return i;
          }
          return textLength; // Signal da je gotovo
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('');

    const scrambleText = (currentRevealed) => {
      return text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentRevealed.has(i)) return text[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    };

    if (isAnimating) {
      interval = setInterval(() => {
        if (sequential) {
          setRevealedIndices((prevRevealed) => {
             // Preskačemo razmake prilikom otkrivanja
             let nextIndex = getNextIndex(prevRevealed);
             while (nextIndex < text.length && text[nextIndex] === ' ') {
                 prevRevealed.add(nextIndex); // Automatski otkrij razmak
                 nextIndex = getNextIndex(prevRevealed);
             }

            if (nextIndex < text.length) {
              const newRevealed = new Set(prevRevealed);
              newRevealed.add(nextIndex);
              // Ažuriramo samo neotkrivena slova
              setDisplayText((prevText) => 
                prevText.split('').map((c, idx) => 
                  newRevealed.has(idx) ? text[idx] : 
                  (c === ' ' ? ' ' : availableChars[Math.floor(Math.random() * availableChars.length)])
                ).join('')
              );
              return newRevealed;
            } else {
              clearInterval(interval);
              setIsAnimating(false);
              setDisplayText(text); // Osiguraj da je finalni tekst tačan
              return prevRevealed;
            }
          });
        } else { // Nije sekvencijalno - samo vrti karaktere
          setDisplayText(scrambleText(revealedIndices)); // revealedIndices je prazan set ovde
          currentIteration++;
          if (currentIteration >= maxIterations) {
            clearInterval(interval);
            setIsAnimating(false);
            setDisplayText(text);
          }
        }
      }, speed);
    }

    // Cleanup
    return () => {
      if (interval) clearInterval(interval);
      // Ako animacija nije sekvencijalna, osiguraj da pravi tekst ostane kad se prekine animacija
      if (!sequential && !isAnimating) {
          setDisplayText(text);
          setRevealedIndices(new Set());
      }
    };
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    revealedIndices, // Dodato da bi non-sequential scramble radio ispravno
  ]);

  // Efekat za Intersection Observer (animacija na 'view')
  useEffect(() => {
    if (animateOn !== 'view' || hasAnimated) return;

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // Počni animaciju samo ako ulazi u view i nije već animirano
        if (entry.isIntersecting) {
          setIsAnimating(true);
          setHasAnimated(true); // Pokreni samo jednom
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1, // Pokreni kad je bar 10% vidljivo
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, hasAnimated]); // Izbačen text iz zavisnosti observera

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: () => {
              // Resetuj ako treba ponovo da se animira na hover
              setHasAnimated(false);
              setRevealedIndices(new Set());
              setDisplayText(generateInitialScramble(text.length));
              setIsAnimating(true);
          },
          onMouseLeave: () => setIsAnimating(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      {/* Screen reader vidi samo finalni tekst */}
      <span className="sr-only">{text}</span>

      {/* Vidljivi tekst koji se animira */}
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          // Otkriveno je ako je u setu ILI ako animacija nije aktivna (završena ili nije ni počela)
          const isRevealed = revealedIndices.has(index) || !isAnimating;

          return (
            <span
              key={`${char}-${index}`}
              // Primenjujemo klase na osnovu toga da li je karakter trenutno 'enkriptovan' ili 'otkriven'
              className={isRevealed ? className : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
