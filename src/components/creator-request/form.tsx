'use client';

import { useState, useEffect } from 'react';
import { Code, Users, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { ElectricBorder } from './features/ElectricBorder';
import { PopoverForm } from './features/PopoverForm';
import { PopoverFormButton } from './features/PopoverFormButton';
import { PopoverFormSuccess } from './features/PopoverFormSuccess';
import { usePostCreatorRequestMutation } from '@/lib/services/creator-request/creatorApi';

export default function CreatorRequestForm() {
  const [open, setOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [postCreatorRequest] = usePostCreatorRequestMutation();

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    if (!description.trim()) {
      setError('Please provide a description');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // ✅ Use the mutation function here
      await postCreatorRequest({ description }).unwrap();

      setShowSuccess(true);
      setDescription('');
      setTimeout(() => {
        setShowSuccess(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
      setError('Failed to submit request. Please try again.');
      console.error('Failed to submit creator request:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formContent = (
    <div className="h-full flex flex-col justify-center p-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Why do you want to become a creator?
          </label>
          <div className="relative">
            <textarea
              id="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError(null);
              }}
              placeholder="Share your passion for problem-solving, experience with coding challenges, and what unique problems you'd love to create..."
              className="w-full h-32 p-4 text-sm border-2 border-gray-200 dark:border-gray-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0b131c] dark:focus:ring-[#CCF301] focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
              rows={4}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              {description.length} characters
            </div>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-2 flex items-center gap-1"
            >
              <span className="w-1 h-1 bg-red-500 rounded-full"></span>
              {error}
            </motion.p>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <PopoverFormButton 
          loading={isLoading} 
          text="Submit Request"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <ElectricBorder 
          color={isDark ? "#CCF301" : "#10172c"}
          speed={0.8} 
          chaos={1.2} 
          thickness={3}
          className="rounded-3xl"
        >
          <div className="relative group">
            <div className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-2 border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#0b131c]/5 to-transparent dark:from-[#CCF301]/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#0b131c]/5 to-transparent dark:from-[#CCF301]/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 px-8 py-12 sm:p-16 lg:p-20">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="flex justify-center gap-4 mb-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <Code className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <Users className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700"
                    >
                      <Trophy className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  </div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6"
                  >
                    Wanna become our <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">Creator ?</span>
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto"
                  >
                    Join our community of problem setters and help create challenging coding problems. Share your expertise and inspire thousands of developers worldwide.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-8 mb-10"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">500+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Problems Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Active Creators</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Developers Reached</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                  >
                    <PopoverForm
                      open={open}
                      setOpen={setOpen}
                      openChild={formContent}
                      successChild={<PopoverFormSuccess />}
                      showSuccess={showSuccess}
                      title="Join as Creator"
                      width="min(90vw, 480px)"
                      height="380px"
                      showCloseButton={true}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}
