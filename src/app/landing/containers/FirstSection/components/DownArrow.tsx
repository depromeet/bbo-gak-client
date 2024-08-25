'use client';

import { motion } from 'framer-motion';

export function DownArrow() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: 10 }}
      transition={{
        repeat: Infinity,
        repeatType: 'reverse',
        duration: 0.5,
      }}
      className="flex flex-col items-center">
      <span className="text-white text-heading1 font-bold">SCROLL</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" viewBox="0 0 26 17" fill="none">
        <g opacity="0.82">
          <path d="M4.25 3L13 8.8463L21.75 3" stroke="#CCCDD1" stroke-width="3" stroke-linecap="square" />
          <path d="M4.25 9.1543L13 15.0006L21.75 9.1543" stroke="white" stroke-width="3" stroke-linecap="square" />
        </g>
      </svg>
    </motion.div>
  );
}
