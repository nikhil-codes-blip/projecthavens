"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const teamMembers = [
    {
      name: "Priyanshu Singh",
      role: "Lead Developer & UI/UX Architect",
      image: "/images/priyanshu.jpg",
      skills: ["React", "JavaScript", "UI Design", "Problem Solving"],
      year: "1st Year",
      interest: "Full-Stack Development",
    },
    {
      name: "Pranjal Sharma",
      role: "Co-Developer & Visual Content Provider",
      image: "/images/pranjal.png",
      skills: ["Frontend", "Design", "CSS", "Creativity"],
      year: "1st Year",
      interest: "Web Design & Animation",
    },
    {
      name: "Mohd. Asad Ahmed",
      role: "Media Curator & Visual Contributor",
      image: "/images/asad.jpg",
      skills: ["Photography", "Graphics", "Visual Arts", "Editing"],
      year: "1st Year",
      interest: "Digital Media & Content",
    },
    {
      name: "Sonal Pandey",
      role: "Prototype designer & voice Presenter",
      image: "/images/sonal.jpg",
      skills: ["Strategy", "UX Research", "Planning", "Analysis"],
      year: "1st Year",
      interest: "User Experience Design",
    },
    {
      name: "Shivansh Sharma",
      role: "Content Researcher – Heritage & History",
      image: "/images/shivansh.jpg",
      skills: ["Research", "Writing", "History", "Documentation"],
      year: "1st Year",
      interest: "Cultural Heritage Studies",
    },
    {
      name: "Shivendra Yadav",
      role: "Support & Coordination Team Member",
      image: "/images/shivendra.jpg",
      skills: ["Teamwork", "Communication", "Organization", "Support"],
      year: "1st Year",
      interest: "Project Management",
    },
  ]

  const teamStats = [
    { label: "Team Members", value: "6", icon: "👥" },
    { label: "Academic Year", value: "1st", icon: "🎓" },
    { label: "Passion Projects", value: "5+", icon: "🚀" },
    { label: "Learning Goals", value: "∞", icon: "📈" },
  ]

  const teamValues = [
    {
      title: "Learning",
      description: "Growing our skills every day as computer science students",
      icon: "📖",
    },
    {
      title: "Collaboration",
      description: "Working together to build amazing projects and learn from each other",
      icon: "🤝",
    },
    {
      title: "Innovation",
      description: "Exploring new technologies and creative solutions as beginners",
      icon: "💡",
    },
    {
      title: "Heritage",
      description: "Combining our love for technology with preserving cultural heritage",
      icon: "🏛️",
    },
  ]

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1f2937;
        }
        ::-webkit-scrollbar-thumb {
          background: #49ce71;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #3bb85f;
        }
        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: #49ce71 #1f2937;
        }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#49ce71] rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[#49ce71] rounded-full mix-blend-multiply filter blur-xl opacity-5 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#49ce71] rounded-full mix-blend-multiply filter blur-xl opacity-7 animate-pulse delay-500"></div>
        </div>

        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div
              className={`text-center mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="inline-block mb-4">
                <span className="text-[#49ce71] text-lg font-semibold tracking-wider uppercase"></span>
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                <span className="animate-pulse">Meet Our Team</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-[#49ce71] to-green-400 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                A group of passionate first-year computer science students working together to preserve heritage through
                technology
              </p>
            </div>

            {/* Team Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              {teamStats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-[#49ce71] transition-all duration-300 hover:shadow-lg hover:shadow-[#49ce71]/20">
                    <div className="text-3xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                    <div className="text-3xl font-bold text-[#49ce71] mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`group bg-gray-800 rounded-3xl overflow-hidden border border-gray-700 hover:border-[#49ce71] transition-all duration-500 hover:shadow-2xl hover:shadow-[#49ce71]/20 hover:-translate-y-3 cursor-pointer transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Image/Icon Section */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 h-72 flex items-center justify-center">
                    {member.image ? (
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={`${member.name} - ${member.role}`}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="text-9xl group-hover:scale-110 transition-transform duration-500 group-hover:animate-pulse">
                        
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Floating Academic Year */}
                    <div className="absolute top-4 right-4 bg-[#49ce71] text-black px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      {member.year}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 relative">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#49ce71] transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-3">{member.role}</p>
                      <div className="text-[#49ce71] text-sm font-semibold">🎯 {member.interest}</div>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-full border border-gray-600 group-hover:border-[#49ce71] group-hover:text-[#49ce71] transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Animated Progress Bar */}
                    <div className="relative">
                      <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-[#49ce71] to-green-400 rounded-full transition-all duration-1000 ${activeCard === index ? "w-full" : "w-0"}`}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Team Values */}
            <div
              className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <h3 className="text-4xl font-bold text-white text-center mb-12">
                Our <span className="text-[#49ce71]">Values</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {teamValues.map((value, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-[#49ce71] transition-all duration-300 hover:shadow-lg hover:shadow-[#49ce71]/20 h-full">
                      <div className="text-4xl mb-4 group-hover:animate-pulse">{value.icon}</div>
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#49ce71] transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Join Our Journey CTA */}
            <div
              className={`text-center transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700">
                <h3 className="text-4xl font-bold text-white mb-4">
                  Want to <span className="text-[#49ce71]">Learn With Us?</span>
                </h3>
                <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                  We're always excited to collaborate with fellow students who share our passion for technology and
                  heritage preservation.
                </p>
        
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
