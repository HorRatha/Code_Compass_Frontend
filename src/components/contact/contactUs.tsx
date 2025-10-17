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

  const handleSubmit = () => {
    if (!formData.firstName || !formData.email || !formData.message) {
      alert('Please fill in all required fields (First Name, Email, and Message)');
      return;
    }
    
    setIsSubmitting(true);
    
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();
    const subjectLine = formData.subject 
      ? `${formData.subject} - Contact from ${fullName}`
      : `Contact from ${fullName}`;
    
    const emailBody = `Name: ${fullName}
Email: ${formData.email}
Subject: ${formData.subject || 'N/A'}

Message:
${formData.message}`;
    
    const mailtoLink = `mailto:codecompass.istad.co@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const themeClasses = {
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    cardBg: isDarkMode ? 'bg-gray-900/90' : 'bg-[#f9fce8]/20',
    cardBorder: isDarkMode ? 'border-gray-800' : 'border-gray-200',
    inputBg: isDarkMode ? 'bg-gray-800' : 'bg-[#fdfff4]',
    inputBorder: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    inputText: isDarkMode ? 'text-white' : 'text-gray-900',
    placeholder: isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500',
    iconBg: isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#CCF301]/20',
    socialBg: isDarkMode ? 'bg-[#CCF301]/20' : 'bg-[#CCF301]/20',
    socialHover: isDarkMode ? 'hover:bg-[#CCF301]/20' : 'hover:bg-[#CCF301]/20',
    socialIcon: isDarkMode ? 'text-[#CCF301]' : 'text-[#CCF301]'
  };

  return (
    <div className="min-h-screen relative transition-colors duration-500">
      <div className="absolute inset-0 bg-[#fdfff4] dark:from-black dark:via-slate-900 dark:to-black dark:bg-gradient-to-br"></div>

      <div className={`relative ${themeClasses.text}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
          <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight font-mono">
              Get in <span className="text-[#CCF301]">Touch</span>
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto px-2 font-sans`}>
              {"Have questions about CodeCompass? Need technical support? We're here to help you on your coding journey."}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            <div className={`lg:col-span-2 transition-all duration-1000 ease-out delay-200 ${
              animationStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:transform sm:hover:translate-y-[-8px] hover:shadow-[0_25px_50px_-12px_rgba(204,243,1,0.25)]`}>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center font-mono">
                  <span className="w-2 h-2 bg-[#CCF301] rounded-full mr-3"></span>
                  Send us a message
                </h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label htmlFor="firstName" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 group-focus-within:text-[#CCF301] font-sans`}>
                        First Name *
                      </label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none focus:border-[#CCF301] focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)] transition-all duration-200 text-sm sm:text-base font-sans`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="lastName" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 group-focus-within:text-[#CCF301] font-sans`}>
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none focus:border-[#CCF301] focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)] transition-all duration-200 text-sm sm:text-base font-sans`}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label htmlFor="email" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 group-focus-within:text-[#CCF301] font-sans`}>
                      Email Address *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none focus:border-[#CCF301] focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)] transition-all duration-200 text-sm sm:text-base font-sans`}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div className="group">
                    <label htmlFor="subject" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 group-focus-within:text-[#CCF301] font-sans`}>
                      Subject
                    </label>
                    <select 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} focus:outline-none focus:border-[#CCF301] focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)] transition-all duration-200 text-sm sm:text-base font-sans`}
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
                    <label htmlFor="message" className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2 transition-all duration-200 group-focus-within:text-[#CCF301] font-sans`}>
                      Message *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 ${themeClasses.inputBg} border ${themeClasses.inputBorder} rounded-lg ${themeClasses.inputText} ${themeClasses.placeholder} focus:outline-none focus:border-[#CCF301] focus:shadow-[0_0_0_3px_rgba(204,243,1,0.1)] transition-all duration-200 resize-none text-sm sm:text-base font-sans`}
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-[#CCF301] hover:bg-[#B8E000] text-black font-medium py-2.5 px-8 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(204,243,1,0.2)] hover:shadow-[0_0_25px_rgba(204,243,1,0.4)] sm:hover:scale-[1.05] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm font-mono"
                    >
                      {isSubmitting ? 'Opening Email...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] hover:shadow-[0_25px_50px_-12px_rgba(204,243,1,0.25)] ${
                animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center font-mono">
                  <span className="w-2 h-2 bg-[#CCF301] rounded-full mr-3 animate-pulse"></span>
                  Quick Contact
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      <svg className="w-4 h-4 text-[#CCF301]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base font-mono`}>Email</p>
                      <a 
                        href="mailto:codecompass.istad.co@gmail.com" 
                        className={`${themeClasses.textSecondary} hover:text-[#CCF301] transition-colors text-xs sm:text-sm font-sans break-all`}
                      >
                        codecompass.istad.co@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      <svg className="w-4 h-4 text-[#CCF301]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base font-mono`}>Location</p>
                      <p className={`${themeClasses.textSecondary} text-xs sm:text-sm font-sans`}>San Francisco, CA</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 group">
                    <div className={`w-8 h-8 ${themeClasses.iconBg} rounded-lg flex items-center justify-center mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                      <svg className="w-4 h-4 text-[#CCF301]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.text} text-sm sm:text-base font-mono`}>Response Time</p>
                      <p className={`${themeClasses.textSecondary} text-xs sm:text-sm font-sans`}>Within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] hover:shadow-[0_25px_50px_-12px_rgba(204,243,1,0.25)] ${
                animationStage >= 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center font-mono">
                  <span className="w-2 h-2 bg-[#CCF301] rounded-full mr-3 animate-pulse"></span>
                  Need Help?
                </h3>
                <p className={`${themeClasses.textSecondary} mb-3 sm:mb-4 text-sm sm:text-base font-sans`}>
                  Check out our FAQ section for quick answers to common questions.
                </p>
                <a href="#" className="inline-flex items-center text-[#CCF301] hover:text-[#B8E000] transition-all duration-300 sm:hover:translate-x-2 group text-sm sm:text-base">
                  <span className="font-mono">View FAQ</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div> */}
              
              <div className={`${themeClasses.cardBg} backdrop-blur-xl border ${themeClasses.cardBorder} rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-700 ease-out hover:transform sm:hover:translate-y-[-8px] hover:shadow-[0_25px_50px_-12px_rgba(204,243,1,0.25)] ${
                animationStage >= 5 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
              }`}>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center font-mono">
                  <span className="w-2 h-2 bg-[#CCF301] rounded-full mr-3 animate-pulse"></span>
                  Follow Us
                </h3>
                <div className="flex space-x-3 sm:space-x-4">
                  {[1, 2, 3].map((index) => (
                    <a 
                      key={index}
                      href="#" 
                      className={`w-10 h-10 ${themeClasses.socialBg} ${themeClasses.socialHover} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 group`}
                    >
                      {index === 1 && (
                        <svg className={`w-4 sm:w-5 h-4 sm:h-5 ${themeClasses.socialIcon} group-hover:text-[#CCF301] transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className={`w-4 sm:w-5 h-4 sm:h-5 ${themeClasses.socialIcon} group-hover:text-[#CCF301] transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      )}
                      {index === 3 && (
                        <svg className={`w-4 sm:w-5 h-4 sm:h-5 ${themeClasses.socialIcon} group-hover:text-[#CCF301] transition-colors duration-300`} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.739.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                        </svg>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}