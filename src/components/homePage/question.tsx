import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const Questions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "How do I start solving problems?",
      answer: "Go to the \"Problemset\" page from the main navigation. You can browse all available problems. We recommend filtering by difficulty (Easy first) and trying a few to get a feel for how our coding environment works."
    },
    {
      question: "I logged in, but my progress seems to be gone. What happened?",
      answer: "Your progress is saved to your account. If it appears lost, the most common reason is that you are accidentally logged into a different account. Please try logging out and back in with your primary email. If the issue persists, contact support."
    },
    {
      question: "What is the point of the Leaderboard?",
      answer: "The Leaderboard fosters a healthy competitive spirit! It ranks users based on their problem-solving performance, speed, and consistency. It's a great way to see how you stack up against your peers and stay motivated."
    },
    {
      question: "The \"Hint\" didn't help me. Are there more detailed solutions?",
      answer: "The \"Hint\" system is designed to give you a small nudge in the right direction without giving away the entire solution. If you're still stuck after using the hint, we encourage you to try a different approach or take a break and come back to the problem later. Deep learning happens through struggle!"
    },
    {
      question: "My code works on my computer but fails here. Why?",
      answer: "This is very common! Our online judge has a specific environment. The most likely causes are:\n\n• Edge Cases: Your code might not handle all possible inputs (e.g., empty lists, very large numbers).\n• Global Variables: Avoid using global variables, as they can retain state between test runs.\n• Output Format: Ensure you are returning the exact output type and format specified in the problem (e.g., a list, not a printed string)."
    },
    {
      question: "What does \"Runtime Error\" mean?",
      answer: "A Runtime Error means your code crashed during execution. Common causes include: dividing by zero, accessing an array index that doesn't exist, or running out of memory."
    },
    {
      question: "What does \"Time Limit Exceeded\" (TLE) mean?",
      answer: "Your code produced the correct output, but it was too slow. The problem has a time constraint, and your algorithm needs to be more efficient. Consider the time complexity (e.g., O(n²) might be too slow, requiring an O(n log n) or O(n) solution)."
    },
    {
      question: "I found a bug or a problem is unclear. How do I report it?",
      answer: "We appreciate your feedback! Please use the \"Report a Problem\" feature, if available on the problem page, or contact our support team directly. Please include the problem name and a clear description of the issue."
    },
    {
      question: "Can I change my username?",
      answer: "Typically, usernames cannot be changed manually as they are a core part of your identity on the leaderboards. Please check your account settings to see if this option is available."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 font-barlow">
      <div className="mb-8 sm:mb-12 text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">
          Your questions answered
        </h1>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
          Find quick answers to common questions about our platform, problem solving, and account management.
        </p>
      </div>
      
      <div className="space-y-3 sm:space-y-4">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:border-[#CCF301] dark:hover:border-[#CCF301] transition-all duration-200 hover:shadow-md"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-[#CCF301]/10 dark:hover:bg-[#CCF301]/10 transition-colors duration-200 rounded-lg group"
            >
              <span className="text-base sm:text-lg font-semibold pr-4 sm:pr-6 text-gray-900 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white">
                {faq.question}
              </span>
              <ChevronDown 
                className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 sm:mt-16">
        <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Can&apos;t find what you&apos;re looking for? Contact our{' '}
          <span className="font-semibold text-gray-900 dark:text-white hover:text-[#CCF301] dark:hover:text-[#CCF301] cursor-pointer transition-colors duration-200">
            customer support team
          </span>
        </p>
      </div>
    </div>
  );
};

export default Questions;