// "use client"; // Ova direktiva nije potrebna u Vite/React okruženju kao u Next.js

// import { cn } from "@/lib/utils"; // Uklanjamo import jer nemamo ovu putanju
import { motion } from "framer-motion"; // Ispravljen import
import React from "react";

// Jednostavna zamena za cn funkciju
const cn = (...classes) => classes.filter(Boolean).join(' ');

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

// Definišemo HSL varijablu --primary ako nije globalno definisana
// Možete je postaviti u globalni CSS (:root) ili direktno ovde
const defaultPrimaryColor = "210 40% 98%"; // Prilagodite!

export const ShinyButton = React.forwardRef((props, ref) => {
  const { children, className, style, ...otherProps } = props;

  const combinedStyle = {
    ...style,
    '--primary': `var(--primary-hsl, ${defaultPrimaryColor})`,
    border: '1px solid rgb(210, 210, 210)', // Zadržavamo statični border
    backgroundColor: 'transparent', // Eksplicitno postavljamo transparentnu pozadinu
  };

  return (
    <motion.button
      ref={ref}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium", // Osnovni stilovi
        "transition-shadow duration-300 ease-in-out hover:shadow", // Zadržavamo samo shadow i transition
        "dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]", // Zadržavamo hover senku za dark mode
        className,
      )}
      style={combinedStyle}
      {...animationProps}
      {...otherProps}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[rgba(255,255,255,0.65)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
           WebkitMaskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask:
            "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMask:
             "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
        }}
        className="pointer-events-none absolute inset-0 z-0 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
});

ShinyButton.displayName = "ShinyButton";
