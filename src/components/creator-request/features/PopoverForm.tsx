import React, { useRef, useState } from 'react';
import { ChevronUp, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { PopoverFormProps } from '../types';
import { useClickOutside } from '../hooks/useClickOutside';
import { PopoverFormCutOutTopIcon } from './PopoverFormCutOutTopIcon';

export function PopoverForm({
  open,
  setOpen,
  openChild,
  showSuccess,
  successChild,
  width = "400px",
  height = "280px",
  title = "Get Started",
  showCloseButton = true,
}: PopoverFormProps) {
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [] = useState({ top: 0, left: 0 });

  useClickOutside(ref, () => setOpen(false));

  return (
    <>
      <motion.button
        ref={buttonRef}
        layoutId={`${title}-wrapper`}
        onClick={() => setOpen(true)}
        style={{ borderRadius: 12 }}
        className="group relative overflow-hidden px-8 py-4 text-base font-semibold bg-gradient-to-r from-[#0b131c] to-[#0b131c]/80 dark:from-[#CCF301] dark:to-[#CCF301]/80 text-white dark:text-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <motion.div layoutId={`${title}-title`} className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <span>{title}</span>
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={`${title}-wrapper`}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1 overflow-hidden bg-white dark:bg-gray-900 shadow-2xl outline-none border border-gray-200 dark:border-gray-700"
            ref={ref}
            style={{ borderRadius: 16, width, height, zIndex: 9999 }}
          >
            <motion.span
              aria-hidden
              className="absolute left-6 top-[21px] text-base font-semibold text-gray-900 dark:text-white data-[success]:text-transparent"
              layoutId={`${title}-title`}
              data-success={showSuccess}
            >
              {title}
            </motion.span>

            {showCloseButton && (
              <div className="absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-[12px] h-[26px] flex items-center justify-center z-20">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute z-10 -mt-1 flex items-center justify-center w-[10px] h-[6px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none rounded-full transition-colors"
                  aria-label="Close"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <PopoverFormCutOutTopIcon />
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {showSuccess ? (
                <motion.div
                  key="success"
                  initial={{ y: -32, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  className="flex h-full flex-col items-center justify-center"
                >
                  {successChild}
                </motion.div>
              ) : (
                <motion.div
                  exit={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                  transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                  key="open-child"
                  style={{ borderRadius: 16 }}
                  className="h-full bg-white dark:bg-gray-900 z-20"
                >
                  {openChild}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            style={{ zIndex: 9998 }}
          />
        )}
      </AnimatePresence>
    </>
  );
}