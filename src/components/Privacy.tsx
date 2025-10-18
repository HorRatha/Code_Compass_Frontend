"use client";
import {
  Shield,
  FileText,
  Lock,
  Eye,
  Users,
  Database,
  Settings,
  Globe,
  LucideIcon,
} from "lucide-react";

// ================== Types ==================
interface SectionContent {
  subtitle?: string;
  text?: string;
  list?: string[];
  note?: string;
}

interface PrivacySectionProps {
  icon: LucideIcon;
  title: string;
  content: SectionContent[];
}

// ================== Components ==================

// Reusable Section Block
function PrivacySection({ icon: Icon, title, content }: PrivacySectionProps) {
  return (
    <section className="mb-10">
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <Icon className="mr-3 h-6 w-6 text-primary" />
        {title}
      </h3>

      {content.map((item, idx) => (
        <div key={idx} className="mb-6">
          {item.subtitle && (
            <h4 className="text-xl font-semibold mb-2">{item.subtitle}</h4>
          )}
          {item.text && (
            <p className="dark:text-gray-300 text-black/70 leading-relaxed mb-2">
              {item.text}
            </p>
          )}
          {item.list && (
            <ul className="list-disc list-inside mb-2 ml-4 dark:text-white text-black/70 space-y-1">
              {item.list.map((li, i) => (
                <li key={i}>{li}</li>
              ))}
            </ul>
          )}
          {item.note && (
            <p className="text-black/70 dark:text-white">{item.note}</p>
          )}
        </div>
      ))}
    </section>
  );
}

// ================== Data ==================
const privacySections: PrivacySectionProps[] = [
  {
    icon: Database,
    title: "What information do we collect?",
    content: [
      {
        subtitle: "Personal Information",
        text: "We collect personal information that you provide directly to us when you create an account, subscribe to our services, or communicate with us.",
        list: [
          "Account registration details (name, email, username)",
          "Profile information and preferences",
          "Communication and correspondence records",
          "Payment information (processed securely by third-party providers)",
        ],
      },
      {
        subtitle: "Usage and Activity Data",
        text: "We automatically collect certain information about your device and usage of our platform.",
        list: [
          "Code submissions, projects, and programming exercises",
          "Learning progress, course completion, and achievements",
          "Platform navigation patterns and feature usage",
          "Session duration and interaction timestamps",
        ],
      },
      {
        subtitle: "Technical Information",
        text: "We collect technical data to ensure platform security, optimize performance, and provide technical support when needed.",
        list: [
          "IP address and geographic location (general)",
          "Browser type, version, and operating system",
          "Device information and screen resolution",
          "Cookies and similar tracking technologies",
        ],
      },
    ],
  },
  {
    icon: Settings,
    title: "Use of Data",
    content: [
      {
        text: "We use the information we collect to:",
        list: [
          "Provide, maintain, and improve our educational services",
          "Process enrollments and track course progress",
          "Send you important updates about your courses and account",
          "Respond to your comments, questions, and support requests",
          "Analyze usage patterns to enhance user experience",
          "Comply with legal obligations and protect our rights",
        ],
      },
    ],
  },
  {
    icon: Globe,
    title: "Cookies and Tracking",
    content: [
      {
        text: "We use cookies and similar tracking technologies to enhance your experience on our platform.",
        list: [
          "Essential Cookies: Required for basic platform functionality",
          "Performance Cookies: Help us understand how you use our platform",
          "Preference Cookies: Remember your settings and preferences",
          "Marketing Cookies: Used to deliver relevant educational content",
        ],
      },
    ],
  },
  {
    icon: Shield,
    title: "Third-party Services",
    content: [
      {
        text: "We may use third-party services to enhance our educational platform.",
        list: [
          "Analytics services to understand platform usage",
          "Payment processors for course enrollments",
          "Email services for communications",
          "Cloud storage providers for content delivery",
          "Video hosting platforms for educational content",
        ],
      },
    ],
  },
  {
    icon: Users,
    title: "Your Rights",
    content: [
      {
        text: "You have several rights regarding your personal information:",
        list: [
          "Access: Request a copy of the personal information we hold about you",
          "Correction: Ask us to correct any inaccurate or incomplete information",
          "Deletion: Request deletion of your personal information",
          "Portability: Request a copy of your data in a structured format",
          "Restriction: Ask us to limit how we use your information",
          "Objection: Object to certain uses of your personal information",
        ],
        note: "To exercise any of these rights, please contact us using the information provided in the Contact Us section.",
      },
    ],
  },
];

// ================== Main Page ==================
export default function PrivacyPolicyPage() {
//   const [isDark, setIsDark] = useState(false);
//   const [mounted, setMounted] = useState<boolean>(false)

//     useEffect(() => {
//       setMounted(true);
//       const saved = localStorage.getItem('darkMode');
//       if (saved) {
//         setIsDark(JSON.parse(saved));
//       }
//     }, []);

// useEffect(() => {
//     if (mounted) {
//       if (isDark) {
//         document.documentElement.classList.add('dark');
//       } else {
//         document.documentElement.classList.remove('dark');
//       }
//       localStorage.setItem('darkMode', JSON.stringify(isDark));
//     }
//   }, [isDark, mounted]);

  return (
    <div
      className="pt-16 min-h-screen transition-colors duration-500 dark:bg-gray-900 bg-gray-50"
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Privacy Content */}
      <section
        className="dark:bg-gray-900 bg-gray-200 px-6 py-16 lg:px-8 lg:py-24 transition-colors duration-500"
      >
        <div className="mx-auto max-w-4xl dark:bg-gray-800 bg-gray-100 text-black/80 dark:text-white p-8 rounded-2xl shadow-lg transition-colors duration-500">
          <h2 className="text-2xl font-semibold mb-6">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-lg mb-10 leading-relaxed">
            At <span className="text-[#b4ff00]">CodeCompass</span>, we are
            committed to protecting your privacy and ensuring the security of
            your personal information.
          </p>

          {privacySections.map((section, idx) => (
            <PrivacySection key={idx} {...section} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ================== Hero Section ==================
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-lime-300 via-emerald-400 to-teal-500 px-6 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col justify-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-gray-900">
            Privacy & Policy
          </h1>
          <p className="mt-6 text-lg lg:text-xl max-w-lg text-gray-800">
            Your Privacy, Our Priority. We respect your privacy regarding any
            information we may collect from you across our coding platform and
            services.
          </p>
        </div>

        {/* Illustration */}
        <div className="relative flex items-center justify-center">
          {/* Base Platform */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-80 h-4 bg-white/30 rounded-full rotate-3 skew-x-12"></div>

          {/* Floating Document */}
          <div className="absolute left-1/2 top-16 -translate-x-1/2 rotate-6">
            <div className="relative">
              <div className="absolute top-2 left-2 h-56 w-40 rounded-lg bg-black/20"></div>
              <div className="relative h-56 w-40 rounded-lg bg-white shadow-2xl border">
                <div className="p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <FileText className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-gray-800">
                      PRIVACY POLICY
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 w-full rounded bg-gray-300"></div>
                    <div className="h-2 w-4/5 rounded bg-gray-200"></div>
                    <div className="h-2 w-full rounded bg-gray-300"></div>
                    <div className="h-2 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-2 w-full rounded bg-gray-300"></div>
                    <div className="h-2 w-2/3 rounded bg-gray-200"></div>
                    <div className="h-2 w-5/6 rounded bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <Illustrations />
        </div>
      </div>
    </section>
  );
}

// ================== Illustration Subsection ==================
function Illustrations() {
  return (
    <>
      {/* Person */}
      <div className="absolute bottom-12 right-20">
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-3 h-12 bg-blue-800 rounded-b"></div>
            <div className="w-3 h-12 bg-blue-700 rounded-b"></div>
          </div>
          <div className="w-8 h-16 bg-white rounded-t-lg relative bottom-12 shadow-lg"></div>
          <div className="w-6 h-6 bg-orange-400 rounded-full mx-auto relative bottom-14 shadow-md"></div>
          <div className="absolute top-2 -left-2 w-3 h-8 bg-orange-300 rounded -rotate-12"></div>
          <div className="absolute top-2 -right-2 w-3 h-8 bg-orange-300 rounded rotate-12"></div>
        </div>
      </div>

      {/* Shield */}
      <div className="absolute left-16 top-24 -rotate-12">
        <div className="relative">
          <div className="absolute top-1 left-1 w-20 h-24 bg-black/20 rounded-t-full"></div>
          <div className="w-20 h-24 bg-gradient-to-b from-purple-500 to-purple-700 rounded-t-full shadow-xl flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      {/* Floating Security Icons */}
      <div className="absolute right-12 top-32 rotate-12">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-lg flex items-center justify-center">
          <Lock className="h-6 w-6 text-white" />
        </div>
      </div>
      <div className="absolute left-20 bottom-20 -rotate-6">
        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-700 rounded-full shadow-lg flex items-center justify-center">
          <Eye className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Plant */}
      <div className="absolute bottom-16 left-12">
        <div className="relative">
          <div className="w-4 h-3 bg-orange-600 rounded-t"></div>
          <div className="w-6 h-8 bg-green-600 rounded-t-full mx-auto -mt-1"></div>
          <div className="w-2 h-2 bg-green-700 rounded-full mx-auto -mt-1"></div>
        </div>
      </div>
    </>
  );
}