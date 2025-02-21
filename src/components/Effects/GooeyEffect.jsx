import React from 'react';
import { motion } from 'framer-motion';

const GooeyEffect = () => {
  // Define different animation variants for each circle.
  const variant1 = {
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, -10, 0, 10, 0],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const variant2 = {
    animate: {
      x: [0, -15, 0, 15, 0],
      y: [0, 5, 0, -5, 0],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const variant3 = {
    animate: {
      x: [0, 5, 0, -5, 0],
      y: [0, 10, 0, -10, 0],
      transition: {
        duration: 5,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  const variant4 = {
    animate: {
      x: [0, -10, 0, 10, 0],
      y: [0, -15, 0, 15, 0],
      transition: {
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <div className="absolute z-[-1] w-full h-screen">
      <motion.div
        className="absolute -top-10 -left-40 w-[50vw] h-[30vw] bg-[#bfff0084] rounded-full blur-3xl"
        variants={variant1}
        animate="animate"
      />
      <motion.div
        className="absolute -top-10 left-44 rotate-[270deg] w-[40vw] h-[45vw] bg-[#bfff0084] rounded-full blur-3xl"
        variants={variant2}
        animate="animate"
      />
      <motion.div
        className="absolute -top-10 left-[30vw] rotate-[180deg] w-[80vw] h-[20vw] bg-[#bfff0084] rounded-full blur-3xl"
        variants={variant3}
        animate="animate"
      />
      <motion.div
        className="absolute top-[10vw] -right-[10vw] rotate-[90deg] w-[30vw] h-[25vw] bg-[#bfff0084] rounded-full blur-3xl"
        variants={variant4}
        animate="animate"
      />
    </div>
  );
};

export default GooeyEffect;
