'use client';

import { useState, useEffect } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    const observer = new MutationObserver(() => {
      checkDarkMode();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    const timeouts = [
      setTimeout(() => setAnimationStage(1), 100),
      setTimeout(() => setAnimationStage(2), 300),
      setTimeout(() => setAnimationStage(3), 500),
      setTimeout(() => setAnimationStage(4), 700),
      setTimeout(() => setAnimationStage(5), 900),
    ];

    return () => {
      timeouts.forEach(clearTimeout);
      observer.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.email || !formData.message) {
      alert('Please fill in all required fields (First Name, Email, and Message)');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Message sent successfully! We\'ll get back to you within 24 hours.');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('❌ Failed to send message. Please try again or email us directly at codecompass.istad.co@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeClasses = {
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-400' : 'text-gray-700',
    cardBg: isDarkMode ? 'bg-gray-900/95' : 'bg-white/95',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    inputBg: isDarkMode ? 'bg-gray-800' : 'bg-white',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-400',
    inputText: isDarkMode ? 'text-white' : 'text-gray-900',
    placeholder: isDarkMode ? 'placeholder-gray-500' : 'placeholder-gray-600',
    iconBg: isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10',
    iconColor: isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]',
    socialBg: isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#0b131c]/10',
    socialHover: isDarkMode ? 'hover:bg-[#CCF301]/30' : 'hover:bg-[#0b131c]/20',
    socialIcon: isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]',
    accent: isDarkMode ? 'text-[#CCF301]' : 'text-[#0b131c]',
    accentBg: isDarkMode ? 'bg-[#CCF301]' : 'bg-[#0b131c]',
    accentHover: isDarkMode ? 'hover:bg-[#B8E000]' : 'hover:bg-[#0a0f16]',
    linkHover: isDarkMode ? 'hover:text-[#CCF301]' : 'hover:text-[#0b131c]',
    focusBorder: isDarkMode ? 'focus:border-[#CCF301]' : 'focus:border-[#0b131c]',
    focusRing: isDarkMode ? 'focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)]' : 'focus:shadow-[0_0_0_3px_rgba(11,19,28,0.1)]',
    buttonText: isDarkMode ? 'text-black' : 'text-white'
  };

  return (
    <div className="min-h-screen relative transition-colors duration-500" style={{ fontFamily: 'Barlow, sans-serif' }}>
      <div className="absolute inset-0 bg-[#fdfff4] dark:from-black dark:via-slate-900 dark:to-black dark:bg-gradient-to-br"></div>

      <div className={`relative ${themeClasses.text}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Get in <span className={themeClasses.accent}>Touch</span>
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto px-2`}>
              {"Have questions about CodeCompass? Need technical support? We're here to help you on your coding journey."}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-200 ${
              animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:transform sm:hover:translate-y-[-8px]`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 25px 50px -12px rgba(204,243,1,0.25)' 
                    : '0 25px 50px -12px rgba(11,19,28,0.25)'
                }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3`}></span>
                  Send us a message
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label htmlFor="firstName" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 ${isDarkMode ? 'group-focus-within:text-[#CCF301]' : 'group-focus-within:text-[#0b131c]'}`}>
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none ${themeClasses.focusBorder} ${themeClasses.focusRing} transition-all duration-200 text-sm sm:text-base`}
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="lastName" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 ${isDarkMode ? 'group-focus-within:text-[#CCF301]' : 'group-focus-within:text-[#0b131c]'}`}>
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none ${themeClasses.focusBorder} ${themeClasses.focusRing} transition-all duration-200 text-sm sm:text-base`}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 ${isDarkMode ? 'group-focus-within:text-[#CCF301]' : 'group-focus-within:text-[#0b131c]'}`}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none ${themeClasses.focusBorder} ${themeClasses.focusRing} transition-all duration-200 text-sm sm:text-base`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  
                  <div className="group">
                    <label htmlFor="subject" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 ${isDarkMode ? 'group-focus-within:text-[#CCF301]' : 'group-focus-within:text-[#0b131c]'}`}>
                      Subject
                    </label>
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} focus:outline-none ${themeClasses.focusBorder} ${themeClasses.focusRing} transition-all duration-200 text-sm sm:text-base`}
                    >
                      <option value="">Select a topic</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Account Issues">Account Issues</option>
                      <option value="Billing Questions">Billing Questions</option>
                      <option value="Feedback & Suggestions">Feedback & Suggestions</option>
                      <option value="Partnership Inquiry">Partnership Inquiry</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="message" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 ${isDarkMode ? 'group-focus-within:text-[#CCF301]' : 'group-focus-within:text-[#0b131c]'}`}>
                      Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none ${themeClasses.focusBorder} ${themeClasses.focusRing} transition-all duration-200 resize-none text-sm sm:text-base`}
                      placeholder="Tell us how we can help you..."
                      required
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      type="button"
                      disabled={isSubmitting}
                      onClick={handleSubmit}
                      className={`${themeClasses.accentBg} ${themeClasses.accentHover} ${themeClasses.buttonText} font-medium py-2.5 px-8 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm`}
                      style={{
                        boxShadow: isDarkMode 
                          ? '0 0 15px rgba(204,243,1,0.2)' 
                          : '0 0 15px rgba(11,19,28,0.2)'
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] ${
                animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 25px 50px -12px rgba(204,243,1,0.15)' 
                    : '0 25px 50px -12px rgba(11,19,28,0.15)'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3 animate-pulse`}></span>
                  Quick Contact
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-500 group-hover:rotate-[360deg]`}>
                      <svg className={`w-4 h-4 ${themeClasses.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base`}>Email</p>
                      <a 
                        href="mailto:codecompass.istad.co@gmail.com" 
                        className={`${themeClasses.textSecondary} ${themeClasses.linkHover} transition-colors text-xs sm:text-sm break-all`}
                      >
                        codecompass.istad.co@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-500 group-hover:rotate-[360deg]`}>
                      <svg className={`w-4 h-4 ${themeClasses.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base`}>Location</p>
                      <p className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Build at ISTAD,Phnom Penh, Cambodia</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-500 group-hover:rotate-[360deg]`}>
                      <svg className={`w-4 h-4 ${themeClasses.iconColor}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base`}>Response Time</p>
                      <p className={`${themeClasses.textSecondary} text-xs sm:text-sm`}>Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] ${
                animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 25px 50px -12px rgba(204,243,1,0.15)' 
                    : '0 25px 50px -12px rgba(11,19,28,0.15)'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3 animate-pulse`}></span>
                  Need Help?
                </h3>
                <p className={`${themeClasses.textSecondary} mb-3 sm:mb-4 text-sm sm:text-base`}>
                  Check out our FAQ section for quick answers to common questions.
                </p>
                <a href="#" className={`inline-flex items-center ${themeClasses.accent} ${themeClasses.accentHover} transition-all duration-300 sm:hover:translate-x-2 group text-sm sm:text-base`}>
                  <span>View FAQ</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div> */}
              
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] ${
                animationStage >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
                style={{
                  boxShadow: isDarkMode 
                    ? '0 25px 50px -12px rgba(204,243,1,0.15)' 
                    : '0 25px 50px -12px rgba(11,19,28,0.15)'
                }}
              >
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
                  <span className={`w-2 h-2 ${themeClasses.accentBg} rounded-full mr-3 animate-pulse`}></span>
                  Follow Us
                </h3>
                <div className="flex space-x-3 sm:space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/codecompass-undefined-43810838b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 ${themeClasses.socialBg} ${themeClasses.socialHover} rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-[360deg] group`}
                  >
                    <svg className={`w-5 h-5 ${themeClasses.socialIcon} transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://t.me/CodeCompassCommunity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 ${themeClasses.socialBg} ${themeClasses.socialHover} rounded-lg flex items-center justify-center transition-all duration-500 hover:rotate-[360deg] group`}
                  >
                    <svg className={`w-5 h-5 ${themeClasses.socialIcon} transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}