import React from 'react';
import { motion } from 'framer-motion';
import { PopoverFormSuccessProps } from '../types';

export function PopoverFormSuccess({
  title = 'Success!',
  description = 'Your creator request has been submitted successfully.',
}: PopoverFormSuccessProps) {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className="flex flex-col items-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ type: 'spring', duration: 0.6 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mb-4 shadow-lg"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}