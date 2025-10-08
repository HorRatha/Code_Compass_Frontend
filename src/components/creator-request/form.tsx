'use client'

import { useState, useRef, useEffect, ReactNode } from 'react';
import { usePostCreatorRequestMutation } from '@/lib/services/creator-request/creatorApi';
import { ChevronUp, Loader } from 'lucide-react';
import { AnimatePresence, motion } from "framer-motion";

// PopoverForm Components
type PopoverFormProps = {
  open: boolean
  setOpen: (open: boolean) => void
  openChild?: ReactNode
  successChild?: ReactNode
  showSuccess: boolean
  width?: string
  height?: string
  showCloseButton?: boolean
  title: string
}

function PopoverForm({
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
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  return (
    <div
      key={title}
      className="flex items-center justify-center"
    >
      <motion.button
        layoutId={`${title}-wrapper`}
        onClick={() => setOpen(true)}
        style={{ borderRadius: 8 }}
        className="flex h-10 items-center border bg-white dark:bg-[#121212] px-4 text-sm font-medium outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      >
        <motion.span layoutId={`${title}-title`}>{title}</motion.span>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId={`${title}-wrapper`}
            className="absolute p-1 overflow-hidden bg-muted shadow-[0_0_0_1px_rgba(0,0,0,0.08),0px_1px_2px_rgba(0,0,0,0.04)] outline-none z-50"
            ref={ref}
            style={{ borderRadius: 10, width, height }}
          >
            <motion.span
              aria-hidden
              className="absolute left-4 top-[17px] text-sm text-muted-foreground data-[success]:text-transparent"
              layoutId={`${title}-title`}
              data-success={showSuccess}
            >
              {title}
            </motion.span>

            {showCloseButton && (
              <div className="absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-[12px] h-[26px] flex items-center justify-center z-20">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute z-10 -mt-1 flex items-center justify-center w-[10px] h-[6px] text-muted-foreground hover:text-foreground focus:outline-none rounded-full"
                  aria-label="Close"
                >
                  <ChevronUp className="text-muted-foreground/80" />
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
                  style={{ borderRadius: 10 }}
                  className="h-full border bg-white dark:bg-[#121212] z-20"
                >
                  {openChild}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


function PopoverFormButton({
  loading,
  text = "Submit",
  onClick,
}: {
  loading: boolean
  text: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="ml-auto flex h-8 w-auto items-center justify-center overflow-hidden rounded-md bg-gradient-to-b from-blue-500 to-blue-600 text-xs font-semibold text-white shadow-sm hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={`${loading}`}
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 25 }}
          transition={{
            type: "spring",
            duration: 0.3,
            bounce: 0,
          }}
          className="flex w-full items-center justify-center"
        >
          {loading ? (
            <Loader className="animate-spin size-3" />
          ) : (
            <span>{text}</span>
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

// Fixed useClickOutside hook - properly handles null values
const useClickOutside = (
  ref: React.RefObject<HTMLElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function PopoverFormSuccess({
  title = "Success!",
  description = "Your creator request has been submitted successfully.",
}) {
  return (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mt-1"
      >
        <path
          d="M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          fill="#10B981"
          fillOpacity="0.16"
        />
        <path
          d="M12.1334 16.9667L15.0334 19.8667L19.8667 13.1M27.6 16C27.6 17.5234 27.3 19.0318 26.717 20.4392C26.1341 21.8465 25.2796 23.1253 24.2025 24.2025C23.1253 25.2796 21.8465 26.1341 20.4392 26.717C19.0318 27.3 17.5234 27.6 16 27.6C14.4767 27.6 12.9683 27.3 11.5609 26.717C10.1535 26.1341 8.87475 25.2796 7.79759 24.2025C6.72043 23.1253 5.86598 21.8465 5.28302 20.4392C4.70007 19.0318 4.40002 17.5234 4.40002 16C4.40002 12.9235 5.62216 9.97301 7.79759 7.79759C9.97301 5.62216 12.9235 4.40002 16 4.40002C19.0765 4.40002 22.027 5.62216 24.2025 7.79759C26.3779 9.97301 27.6 12.9235 27.6 16Z"
          stroke="#10B981"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h3 className="mb-1 mt-2 text-sm font-medium text-green-600">{title}</h3>
      <p className="text-sm text-gray-600 max-w-xs text-pretty mx-auto text-center">
        {description}
      </p>
    </>
  )
}

function PopoverFormCutOutTopIcon({
  width = 44,
  height = 30,
}: {
  width?: number
  height?: number
}) {
  const aspectRatio = 6 / 12
  const calculatedHeight = width * aspectRatio
  const calculatedWidth = height / aspectRatio

  const finalWidth = Math.min(width, calculatedWidth)
  const finalHeight = Math.min(height, calculatedHeight)

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 6 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="rotate-90 mt-[1px]"
      preserveAspectRatio="none"
    >
      <g clipPath="url(#clip0_2029_22)">
        <path
          d="M0 2C0.656613 2 1.30679 2.10346 1.91341 2.30448C2.52005 2.5055 3.07124 2.80014 3.53554 3.17157C3.99982 3.54301 4.36812 3.98396 4.6194 4.46927C4.87067 4.95457 5 5.47471 5 6C5 6.52529 4.87067 7.04543 4.6194 7.53073C4.36812 8.01604 3.99982 8.45699 3.53554 8.82843C3.07124 9.19986 2.52005 9.4945 1.91341 9.69552C1.30679 9.89654 0.656613 10 0 10V6V2Z"
          className="fill-gray-100"
        />
        <path
          d="M1 12V10C2.06087 10 3.07828 9.57857 3.82843 8.82843C4.57857 8.07828 5 7.06087 5 6C5 4.93913 4.57857 3.92172 3.82843 3.17157C3.07828 2.42143 2.06087 2 1 2V0"
          className="stroke-gray-300"
          strokeWidth={0.6}
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2029_22">
          <rect width={finalWidth} height={finalHeight} fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default function CreatorRequestForm() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [description, setDescription] = useState('');

  // Your existing API hook - kept unchanged
  const [postCreatorRequest, { isLoading, error }] = usePostCreatorRequestMutation();

  const handleSubmit = async () => {
    if (!description.trim()) {
      return;
    }

    try {
      await postCreatorRequest({ description }).unwrap();
      setShowSuccess(true);
      setDescription('');
      setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
      }, 2500);
    } catch (err) {
      console.error('Failed to submit creator request:', err);
    }
  };

  const formContent = (
    <div className="p-6 h-full flex flex-col">
      <div className="flex-1 mt-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tell us about yourself
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please tell us why you want to become a problem creator, what kind of problems you'd contribute, and any experience you have with creating or solving coding challenges."
          className="w-full h-28 p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={4}
          required
        />
        {error && (
          <p className="text-red-500 text-xs mt-2">
            Error: {JSON.stringify(error)}
          </p>
        )}
      </div>
      <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-700">
        <PopoverFormButton 
          loading={isLoading} 
          text="Submit Request"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );

  return (
    <section className="relative max-w-4xl mx-auto my-16 sm:my-24 lg:my-32 px-4 sm:px-6 lg:px-8">
      <div className="relative flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden rounded-2xl lg:rounded-3xl">
        
        {/* Centered Content */}
        <div className="w-full max-w-2xl z-10 p-6 sm:p-8 lg:p-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
            Become a Creator
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-500 dark:text-gray-300 mb-8 sm:mb-10 lg:mb-12 max-w-xl mx-auto leading-relaxed">
            Join our community of problem creators and help shape the next generation of coding challenges.
          </p>
          
          {/* Centered PopoverForm */}
          <div className="flex justify-center items-center relative">
            <PopoverForm
              open={open}
              setOpen={setOpen}
              openChild={formContent}
              successChild={<PopoverFormSuccess />}
              showSuccess={showSuccess}
              title="Get Started"
              width="min(90vw, 420px)"
              height="320px"
              showCloseButton={true}
            />
          </div>
        </div>

        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
      </div>
    </section>
  );
}