// components/AboutUs/our-team.tsx
"use client"

import { MENTORS_DATA, CORE_TEAM_DATA } from "./constants"
import { useInView, TeamCard } from "./shared"
import CreatorRequestForm from "@/components/creator-request/form"

export function OurTeamSection() {
  const teamView = useInView()

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div ref={teamView.ref} className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${teamView.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-4 sm:mb-6 font-barlow">
            MEET OUR <span className="bg-gradient-to-r from-[#0b131c] to-[#0b131c]/70 dark:from-[#CCF301] dark:to-[#CCF301]/70 bg-clip-text text-transparent">TEAM</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-barlow">
            The brilliant minds behind our success – mentors and innovators dedicated to revolutionizing the future of
            technology and development.
          </p>
        </div>

        {/* Mentors */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 font-barlow">
            Our <span className="text-[#0b131c] dark:text-[#CCF301]">Mentors</span>
          </h3>
          <div className={`flex flex-wrap justify-center gap-8 sm:gap-10 lg:gap-12 transition-all duration-1000 delay-200 ${teamView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
            {MENTORS_DATA.map((mentor, idx) => (
              <TeamCard key={idx} {...mentor} isLarge={true} />
            ))}
          </div>
        </div>

        {/* Core Team */}
        <div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12 font-barlow">
            Our <span className="text-[#0b131c] dark:text-[#CCF301]">Core Team</span>
          </h3>
          
          {/* Team Leader */}
          <div className={`flex justify-center mb-8 sm:mb-10 lg:mb-12 transition-all duration-1000 delay-300 ${teamView.isInView ? 'opacity-100 ' : 'opacity-0 '}`}>
            <TeamCard {...CORE_TEAM_DATA[0]} />
          </div>

          {/* Team Members */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 justify-items-center transition-all duration-1000 delay-500 ${teamView.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            {CORE_TEAM_DATA.slice(1).map((member, idx) => (
              <TeamCard key={idx} {...member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Creator CTA Section
export function CreatorCTASection() {
  return (
    <section >
      <div className="max-w-4xl mx-auto">
        <div className="relative group">
          <CreatorRequestForm/>
        </div>
      </div>
    </section>
  )
}