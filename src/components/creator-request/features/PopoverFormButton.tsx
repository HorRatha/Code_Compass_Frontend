import React from 'react';
import { Loader, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopoverFormButtonProps } from '../types';

export function PopoverFormButton({
  loading,
  text = 'Submit',
  onClick,
}: PopoverFormButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full h-11 flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-[#0b131c] to-[#0b131c]/80 dark:from-[#CCF301] dark:to-[#CCF301]/80 text-sm font-semibold text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${loading}`}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            type: 'spring',
            duration: 0.3,
            bounce: 0,
          }}
          className="flex w-full items-center justify-center gap-2"
        >
          {loading ? (
            <Loader className="animate-spin w-4 h-4" />
          ) : (
            <>
              <span>{text}</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}