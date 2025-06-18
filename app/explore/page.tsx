"use client"
import dynamic from "next/dynamic";
import "react-photo-view/dist/react-photo-view.css"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { SearchButton } from "@/components/search/SearchButton"

import { CheckCircle } from "lucide-react" // Optional: for tick icon

import {
  MapPin,
  Calendar,
  Star,
  Clock,
  Camera,
  Users,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  ExternalLink,
  ArrowUp,
  Play,
  BookOpen,
  Compass,
} from "lucide-react"

interface Haveli {
  id: string
  name: string
  location: string
  era: string
  highlight: string
  image: string
  description: string
  rating: number
  reviews: number
  timings: string
  category: "visit" | "stay" | "dine"
}

interface Event {
  id: string
  title: string
  date: string
  location: string
  image: string
  description: string
}

interface Testimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  image: string
  verified: boolean
}

const translations = {
  en: {
    siteTitle: "Heritage Havens Lucknow",
    heroTitle: "Step Into the Royal Past",
    heroSubtitle: "Explore the timeless Havelis of Lucknow with guided audio and QR tours",
    watchVirtualTour: "Watch Virtual Tour",
    discoverHeritage: "Discover Heritage",
    exploreGuide: "Explore Guide",
    aboutTitle: "Living Stories of the Past",
    aboutSubtitle: "Centuries-old homes of nobility, artisanship in stone and wood, living stories of the past.",
    featuredHavelis: "Featured Havelis",
    viewAllHavelis: "View All Havelis",
    interactiveMap: "Explore on Map",
    photoGallery: "Photo Gallery",
    travelGuide: "Travel Guide",
    eventsTitle: "Events & Experiences",
    testimonials: "What Visitors Say",
    newsletter: "Get Hidden Haveli Gems in Your Inbox",
    subscribe: "Subscribe",
    footerAbout: "Discover the magnificent heritage of Lucknow through our curated collection of historic Havelis.",
    contact: "Contact",
    followUs: "Follow Us",
    allRights: "All rights reserved.",
    bestTime: "Best Time to Visit",
    dressCode: "Dress Code",
    localGuides: "Local Guides",
    nearbyAttractions: "Nearby Attractions",
    backToTop: "Back to Top",
  },
  hi: {
    siteTitle: "हेरिटेज हेवन्स लखनऊ",
    heroTitle: "शाही अतीत में कदम रखें",
    heroSubtitle: "ऑडियो और क्यूआर टूर के साथ लखनऊ की कालातीत हवेलियों का अन्वेषण करें",
    watchVirtualTour: "वर्चुअल टूर देखें",
    discoverHeritage: "विरासत की खोज करें",
    exploreGuide: "गाइड देखें",
    aboutTitle: "अतीत की जीवंत कहानियां",
    aboutSubtitle: "रईसों के सदियों पुराने घर, पत्थर और लकड़ी में कारीगरी, अतीत की जीवंत कहानियां।",
    featuredHavelis: "प्रमुख हवेलियां",
    viewAllHavelis: "सभी हवेलियां देखें",
    interactiveMap: "मानचित्र पर देखें",
    photoGallery: "फोटो गैलरी",
    travelGuide: "यात्रा गाइड",
    eventsTitle: "कार्यक्रम और अनुभव",
    testimonials: "आगंतुक क्या कहते हैं",
    newsletter: "छुपे हुए हवेली रत्न अपने इनबॉक्स में पाएं",
    subscribe: "सब्सक्राइब करें",
    footerAbout: "ऐतिहासिक हवेलियों के हमारे संग्रह के माध्यम से लखनऊ की शानदार विरासत की खोज करें।",
    contact: "संपर्क",
    followUs: "हमें फॉलो करें",
    allRights: "सभी अधिकार सुरक्षित।",
    bestTime: "घूमने का सबसे अच्छा समय",
    dressCode: "ड्रेस कोड",
    localGuides: "स्थानीय गाइड",
    nearbyAttractions: "आसपास के आकर्षण",
    backToTop: "शीर्ष पर वापस जाएं",
  },
  ur: {
    siteTitle: "ہیریٹیج ہیونز لکھنؤ",
    heroTitle: "شاہی ماضی میں قدم رکھیں",
    heroSubtitle: "آڈیو اور کیو آر ٹورز کے ساتھ لکھنؤ کی لازوال حویلیوں کا جائزہ لیں",
    watchVirtualTour: "ورچوئل ٹور دیکھیں",
    discoverHeritage: "ورثے کی دریافت کریں",
    exploreGuide: "گائیڈ دیکھیں",
    aboutTitle: "ماضی کی زندہ کہانیاں",
    aboutSubtitle: "نوابوں کے صدیوں پرانے گھر، پتھر اور لکڑی میں کاریگری، ماضی کی زندہ کہانیاں۔",
    featuredHavelis: "نمایاں حویلیاں",
    viewAllHavelis: "تمام حویلیاں دیکھیں",
    interactiveMap: "نقشے پر دیکھیں",
    photoGallery: "فوٹو گیلری",
    travelGuide: "سفری گائیڈ",
    eventsTitle: "تقریبات اور تجربات",
    testimonials: "زائرین کیا کہتے ہیں",
    newsletter: "چھپے ہوئے حویلی کے جواہرات اپنے ان باکس میں حاصل کریں",
    subscribe: "سبسکرائب کریں",
    footerAbout: "تاریخی حویلیوں کے ہمارے مجموعے کے ذریعے لکھنؤ کی شاندار ورثے کی دریافت کریں۔",
    contact: "رابطہ",
    followUs: "ہمیں فالو کریں",
    allRights: "تمام حقوق محفوظ ہیں۔",
    bestTime: "بہترین وقت",
    dressCode: "لباس کا ضابطہ",
    localGuides: "مقامی گائیڈز",
    nearbyAttractions: "قریبی پرکشش مقامات",
    backToTop: "اوپر واپس جائیں",
  },
}

const havelis: Haveli[] = [
  {
    id: "bara-imambara",
    name: "Bara Imambara",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Architectural Marvel",
    image: "/images/bara-imambara.jpg?height=300&width=400",
    description:
      "The Bara Imambara is an architectural wonder built by Asaf-ud-Daula. Famous for its central hall and the mysterious Bhul-bhulaiya labyrinth.",
    rating: 4.8,
    reviews: 2847,
    timings: "6:00 AM - 5:00 PM",
    category: "visit",
  },
  {
    id: "chhota-imambara",
    name: "Chhota Imambara",
    location: "Hussainabad",
    era: "1838",
    highlight: "Golden Dome Paradise",
    image: "/images/chhota-imambara.jpg?height=300&width=400",
    description:
      "Also known as Imambara Hussainabad Mubarak, this stunning monument features beautiful chandeliers and intricate decorations.",
    rating: 4.7,
    reviews: 1923,
    timings: "6:00 AM - 5:00 PM",
    category: "visit",
  },
  {
    id: "rumi-darwaza",
    name: "Rumi Darwaza",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Gateway to History",
    image: "/images/rumi-darwaza.jpg?height=300&width=400",
    description: "An imposing gateway that stands as a symbol of Lucknow, modeled after the Sublime Porte in Istanbul.",
    rating: 4.6,
    reviews: 1456,
    timings: "24 Hours",
    category: "visit",
  },
  {
    id: "dilkusha-kothi",
    name: "Dilkusha Kothi",
    location: "Dilkusha",
    era: "1800",
    highlight: "Heritage Stay",
    image: "/images/dilkusha-kothi.jpg?height=300&width=400",
    description:
      "Experience royal living in this restored heritage property offering luxury accommodation with historical charm.",
    rating: 4.9,
    reviews: 567,
    timings: "Check-in: 2:00 PM",
    category: "stay",
  },
]

const events: Event[] = [
  {
    id: "1",
    title: "Lucknow Heritage Walk",
    date: "Every Saturday",
    location: "Old Lucknow",
    image: "/images/heritage.jpg?height=200&width=300",
    description: "Guided walking tour through the historic lanes of Lucknow, exploring hidden gems and local stories.",
  },
  {
    id: "2",
    title: "Nawabi Cuisine Festival",
    date: "Dec 15-20, 2024",
    location: "Various Havelis",
    image: "/images/nawabi.jpg?height=200&width=300",
    description: "Savor authentic Awadhi cuisine in the royal ambiance of historic Havelis.",
  },
  {
    id: "3",
    title: "Classical Music Evening",
    date: "Every Full Moon",
    location: "Bara Imambara",
    image: "/images/classical-music.jpg?height=200&width=300",
    description: "Experience soul-stirring classical music performances in the acoustically perfect halls.",
  },
]

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    location: "London, UK",
    rating: 5,
    comment:
      "Absolutely breathtaking! The architecture and history came alive through the excellent guides. A must-visit for anyone interested in Indian heritage.",
    image: "placeholder1.png?height=60&width=60",
    verified: true,
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    comment: "लखनऊ की हवेलियों का दौरा अविस्मरणीय था। इतिहास और संस्कृति का अद्भुत मिश्रण।",
    image: "/placeholder1.png?height=60&width=60",
    verified: true,
  },
  {
    id: "3",
    name: "Maria Garcia",
    location: "Barcelona, Spain",
    rating: 4,
    comment:
      "The heritage stay at Dilkusha Kothi was like living in a fairy tale. Impeccable service and authentic royal experience.",
    image: "/placeholder2.png?height=60&width=60",
    verified: true,
  },
]
export default function HeritageHavensLucknow() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false) // ✅ new state
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [mounted, setMounted] = useState(false)
   // Set mounted to true after component mounts (client-side)
  useEffect(() => {
    setMounted(true)
  }, [])
  // Smooth scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }, [])

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset
    setIsScrolled(scrollTop > 50)
    setShowBackToTop(scrollTop > 300)
  }, [])

  // Intersection Observer for fade-in animations
  useEffect(() => {
    if (!mounted) return // Only run on client
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement
          target.style.transitionDelay = `${target.getAttribute("data-delay") || "0"}s`
          target.classList.add("is-visible")
        }
      })
    }, observerOptions)

    const fadeElements = document.querySelectorAll(".fade-in-section")
    fadeElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [mounted])

  useEffect(() => {

    if (!mounted) return // Only run on client
    // Throttled scroll event listener
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll, mounted])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Home") {
        e.preventDefault()
        scrollToTop()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [scrollToTop])

  const t = (key: string): string => {
    return translations[currentLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  const filteredHavelis =
    filterCategory === "all" ? havelis : havelis.filter((haveli) => haveli.category === filterCategory)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setSubscribed(true)
        setEmail("")
        setTimeout(() => setSubscribed(false), 3000)
      } else {
        console.error("Failed to subscribe.")
      }
    } catch (err) {
      console.error("Error submitting newsletter:", err)
    }
  }
   
     // Don't render dynamic content until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-black" /> // Simple loading state
  }

  

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Fixed Background */}
      <div
        className="fixed inset-0 gpu-accelerated"
        style={{
          backgroundImage: `url('/images/lucknow-hero-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Reduced opacity overlay to show more of the background */}
      <div className="fixed inset-0 bg-black/15 z-0 transition-colors duration-300" />

      {/* All content with relative positioning */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 smooth-transition ${
            isScrolled ? "bg-[#121212]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-[#49ce71] font-playfair smooth-transition">{t("siteTitle")}</h1>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <a href="#home" className="text-white hover:text-[#49ce71] smooth-transition">
                    Home
                  </a>
                  <a href="#about" className="text-white hover:text-[#49ce71] smooth-transition">
                    About
                  </a>
                  <a href="#havelis" className="text-white hover:text-[#49ce71] smooth-transition">
                    Havelis
                  </a>
                  <a href="#events" className="text-white hover:text-[#49ce71] smooth-transition">
                    Events
                  </a>
                  <a href="#contact" className="text-white hover:text-[#49ce71] smooth-transition">
                    Contact
                  </a>
                </div>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                <SearchButton />

                <Select value={currentLanguage} onValueChange={setCurrentLanguage}>
                  <SelectTrigger className="w-20 bg-transparent border-[#49ce71] text-white smooth-transition">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121212] border-[#49ce71]">
                    <SelectItem value="en" className="text-white hover:text-[#49ce71]">
                      EN
                    </SelectItem>
                    <SelectItem value="hi" className="text-white hover:text-[#49ce71]">
                      हिं
                    </SelectItem>
                    <SelectItem value="ur" className="text-white hover:text-[#49ce71]">
                      اردو
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:hidden flex items-center space-x-2">
                <SearchButton />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white smooth-transition"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#121212]/95 backdrop-blur-md smooth-transition">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a href="#home" className="block px-3 py-2 text-white hover:text-[#49ce71] smooth-transition">
                  Home
                </a>
                <a href="#about" className="block px-3 py-2 text-white hover:text-[#49ce71] smooth-transition">
                  About
                </a>
                <a href="#havelis" className="block px-3 py-2 text-white hover:text-[#49ce71] smooth-transition">
                  Havelis
                </a>
                <a href="#events" className="block px-3 py-2 text-white hover:text-[#49ce71] smooth-transition">
                  Events
                </a>
                <a href="#contact" className="block px-3 py-2 text-white hover:text-[#49ce71] smooth-transition">
                  Contact
                </a>
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center overflow-hidden fade-in-section"
        >
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fadeInUp">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-playfair text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
            >
              <b>Discover Lucknow's Heritage</b>
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-white"
              style={{ textShadow: "1px 1px 3px rgba(32, 26, 26, 0.7)" }}
            >
              <b>Explore the timeless Havelis of Lucknow with guided audio and QR tours</b>
            </p>

            {/* New Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#e6b619] hover:bg-[#b68c1d] text-black px-8 py-4 text-lg smooth-transition group animate-pulse-slow"
                onClick={() => document.getElementById("havelis")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("watchVirtualTour")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-green-600 text-white hover:bg-white hover:text-black px-8 py-4 text-lg smooth-transition group"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                <BookOpen className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("discoverHeritage")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#49ce71] text-[#49ce71] hover:bg-[#49ce71] hover:text-black px-8 py-4 text-lg smooth-transition group"
                onClick={() => document.getElementById("travel-guide")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Compass className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("exploreGuide")}
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49ce71] mb-6 font-playfair animate-slideInLeft">
                {t("aboutTitle")}
              </h2>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slideInRight">
                {t("aboutSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-black/40 border-[#49ce71] shadow-lg hover:shadow-xl smooth-transition backdrop-blur-sm hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#49ce71]/20 rounded-full flex items-center justify-center mx-auto mb-6 smooth-transition">
                    <Clock className="h-8 w-8 text-[#49ce71]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-playfair text-white">Origins</h3>
                  <p className="text-gray-300">
                    Built during the Nawabi era, these architectural marvels showcase the grandeur of 18th-century
                    Awadhi culture.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#49ce71] shadow-lg hover:shadow-xl smooth-transition backdrop-blur-sm hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#49ce71]/20 rounded-full flex items-center justify-center mx-auto mb-6 smooth-transition">
                    <Users className="h-8 w-8 text-[#49ce71]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-playfair text-white">Cultural Significance</h3>
                  <p className="text-gray-300">
                    Centers of art, literature, and music that shaped the cultural landscape of North India for
                    centuries.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#49ce71] shadow-lg hover:shadow-xl smooth-transition backdrop-blur-sm hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-[#49ce71]/20 rounded-full flex items-center justify-center mx-auto mb-6 smooth-transition">
                    <Camera className="h-8 w-8 text-[#49ce71]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 font-playfair text-white">Unique Architecture</h3>
                  <p className="text-gray-300">
                    Intricate stone carvings, magnificent domes, and labyrinthine passages that tell stories of master
                    craftsmen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Havelis */}
        <section id="havelis" className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#49ce71] mb-6 font-playfair">
                {t("featuredHavelis")}
              </h2>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button
                  variant={filterCategory === "all" ? "default" : "outline"}
                  onClick={() => setFilterCategory("all")}
                  className={`${filterCategory === "all" ? "bg-[#49ce71] text-black" : "bg-transparent text-[#49ce71] border-[#49ce71]"} hover:bg-[#49ce71] hover:text-black smooth-transition`}
                >
                  All
                </Button>
                <Button
                  variant={filterCategory === "visit" ? "default" : "outline"}
                  onClick={() => setFilterCategory("visit")}
                  className={`${filterCategory === "visit" ? "bg-[#49ce71] text-black" : "bg-transparent text-[#49ce71] border-[#49ce71]"} hover:bg-[#49ce71] hover:text-black smooth-transition`}
                >
                  Visit
                </Button>
                <Button
                  variant={filterCategory === "stay" ? "default" : "outline"}
                  onClick={() => setFilterCategory("stay")}
                  className={`${filterCategory === "stay" ? "bg-[#49ce71] text-black" : "bg-transparent text-[#49ce71] border-[#49ce71]"} hover:bg-[#49ce71] hover:text-black smooth-transition`}
                >
                  Stay
                </Button>
                <Button
                  variant={filterCategory === "dine" ? "default" : "outline"}
                  onClick={() => setFilterCategory("dine")}
                  className={`${filterCategory === "dine" ? "bg-[#49ce71] text-black" : "bg-transparent text-[#49ce71] border-[#49ce71]"} hover:bg-[#49ce71] hover:text-black smooth-transition`}
                >
                  Dine
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHavelis.map((haveli, index) => (
                <Card
                  key={haveli.id}
                  className="overflow-hidden hover:shadow-xl smooth-transition hover:-translate-y-2 bg-black/40 border-[#49ce71] group backdrop-blur-sm"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={haveli.image || "/placeholder.svg"}
                      alt={haveli.name}
                      className="w-full h-48 object-cover group-hover:scale-105 smooth-transition"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#49ce71] text-black">{haveli.era}</Badge>
                    <Badge className="absolute top-4 right-4 bg-black/40 text-[#49ce71] border-[#49ce71]">
                      {haveli.category}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 font-playfair text-white">{haveli.name}</h3>
                    <p className="text-sm text-gray-300 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[#49ce71]" />
                      {haveli.location}
                    </p>
                    <p className="text-[#49ce71] font-medium mb-3">{haveli.highlight}</p>
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">{haveli.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-medium text-white">{haveli.rating}</span>
                        <span className="ml-1 text-sm text-gray-400">({haveli.reviews})</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {haveli.timings.split(" ")[0]}
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#e6b619] hover:bg-[#b68c1d] text-black group-hover:bg-[#49ce71] smooth-transition"
                      onClick={() => (window.location.href = `/havelis/${haveli.id}`)}
                    >
                      Explore Details
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/havelis">
                <Button size="lg" className="bg-[#49ce71] hover:bg-[#3ba55c] text-black px-8 py-3 smooth-transition">
                  {t("viewAllHavelis")}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#49ce71] mb-6 font-playfair">
                {t("interactiveMap")}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover the locations of historic Havelis across Lucknow and plan your heritage journey.
              </p>
            </div>

            <div className="bg-black/60 rounded-lg border border-[#49ce71] shadow-lg overflow-hidden backdrop-blur-sm hover:shadow-xl smooth-transition">
              <div className="relative">
                <img
                  src="/images/map-image.jpg"
                  alt="Interactive Heritage Map of Lucknow showing locations of historic Havelis and monuments"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
              <div className="p-6 bg-black/40">
                <div className="flex flex-wrap gap-4 justify-center">
                  <Badge className="bg-[#49ce71]/20 text-[#49ce71] border-[#49ce71]">
                    <MapPin className="h-3 w-3 mr-1" />
                    15+ Heritage Sites
                  </Badge>
                  <Badge className="bg-[#49ce71]/20 text-[#49ce71] border-[#49ce71]">
                    <Clock className="h-3 w-3 mr-1" />
                    Walking Distance
                  </Badge>
                  <Badge className="bg-[#49ce71]/20 text-[#49ce71] border-[#49ce71]">
                    <Camera className="h-3 w-3 mr-1" />
                    Photo Opportunities
                  </Badge>
                </div>
                <p className="text-center text-gray-300 mt-4 text-sm">
                  Explore the stunning Havelis in Lucknow and nearby areas
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <section className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#49ce71] mb-6 font-playfair">{t("photoGallery")}</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Captured moments from visitors exploring the magnificent heritage of Lucknow.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-lg border border-[#49ce71] hover:-translate-y-1 smooth-transition"
                >
                  <img
                    loading="lazy"
                    src={`/gallery/${index + 1}.jpg`}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 object-cover smooth-transition group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 smooth-transition flex items-center justify-center">
                    <Camera className="h-8 w-8 text-[#49ce71]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Guide */}
        <section id="travel-guide" className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#49ce71] mb-6 font-playfair">{t("travelGuide")}</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Essential information for planning your heritage tour of Lucknow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-black/40 border-[#49ce71] shadow-lg backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 smooth-transition">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-12 w-12 text-[#49ce71] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">{t("bestTime")}</h3>
                  <p className="text-sm text-gray-300">October to March</p>
                  <p className="text-xs text-gray-400 mt-2">Pleasant weather for sightseeing</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#49ce71] shadow-lg backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 smooth-transition">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-[#49ce71] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">{t("dressCode")}</h3>
                  <p className="text-sm text-gray-300">Modest Attire</p>
                  <p className="text-xs text-gray-400 mt-2">Respect cultural sensitivities</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#49ce71] shadow-lg backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 smooth-transition">
                <CardContent className="p-6 text-center">
                  <Phone className="h-12 w-12 text-[#49ce71] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">{t("localGuides")}</h3>
                  <p className="text-sm text-gray-300">Available</p>
                  <p className="text-xs text-gray-400 mt-2">Professional guides available</p>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-[#49ce71] shadow-lg backdrop-blur-sm hover:shadow-xl hover:-translate-y-2 smooth-transition">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-12 w-12 text-[#49ce71] mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-white">{t("nearbyAttractions")}</h3>
                  <p className="text-sm text-gray-300">Multiple Sites</p>
                  <p className="text-xs text-gray-400 mt-2">Walking distance from each other</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Events & Experiences */}
        <section id="events" className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#49ce71] mb-6 font-playfair">{t("eventsTitle")}</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Immerse yourself in cultural events and unique experiences at historic Havelis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <Card
                  key={event.id}
                  className="overflow-hidden hover:shadow-xl smooth-transition bg-black/40 border-[#49ce71] backdrop-blur-sm hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-[#49ce71] mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {event.date}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 font-playfair text-white">{event.title}</h3>
                    <p className="text-sm text-gray-300 mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-[#49ce71]" />
                      {event.location}
                    </p>
                    <p className="text-sm text-gray-300 mb-4">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-black/40 backdrop-blur-sm fade-in-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#49ce71] mb-6 font-playfair">{t("testimonials")}</h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <Card className="bg-black/40 border-[#49ce71] shadow-lg backdrop-blur-sm smooth-transition">
                <CardContent className="p-8 text-center">
                  <Quote className="h-12 w-12 text-[#49ce71] mx-auto mb-6" />
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                    "{testimonials[currentTestimonial].comment}"
                  </p>
                  <div className="flex items-center justify-center mb-4">
                    <img
                      src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-white">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-gray-400">{testimonials[currentTestimonial].location}</p>
                    </div>
                    {testimonials[currentTestimonial].verified && (
                      <Badge className="ml-2 bg-[#49ce71]/20 text-[#49ce71]">Verified</Badge>
                    )}
                  </div>
                  <div className="flex justify-center">
                    {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 border-[#49ce71] text-[#49ce71] bg-black/40 backdrop-blur-sm smooth-transition hover:bg-[#49ce71] hover:text-black"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 border-[#49ce71] text-[#49ce71] bg-black/40 backdrop-blur-sm smooth-transition hover:bg-[#49ce71] hover:text-black"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-black/40 backdrop-blur-sm fade-in-section relative">
          {/* Overlay */}
          <div className="absolute inset-0" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-playfair drop-shadow-lg">
              {t("newsletter")}
            </h2>
            <p className="text-lg text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
              Stay updated with the latest heritage tours, cultural events, and exclusive experiences.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/90 border-white text-black placeholder-gray-600 smooth-transition backdrop-blur-sm"
                required
              />
              <Button
                type="submit"
                className="bg-[#121212] hover:bg-[#222222] text-[#49ce71] smooth-transition shadow-lg"
              >
                {t("subscribe")}
              </Button>
            </form>
            {subscribed && (
              <div className="mt-4 text-green-400 font-semibold flex justify-center items-center animate-fade-in-down">
                <CheckCircle className="h-5 w-5 mr-2" />
                Subscribed!
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="bg-[#121212] text-white py-16 border-t border-[#49ce71]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 font-playfair text-[#49ce71]">{t("siteTitle")}</h3>
                <p className="text-gray-300 mb-4">{t("footerAbout")}</p>
                <div className="flex space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20 smooth-transition"
                  >
                    <Facebook className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20 smooth-transition"
                  >
                    <Instagram className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-[#49ce71] hover:text-white hover:bg-[#49ce71]/20 smooth-transition"
                  >
                    <Twitter className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#home" className="text-gray-300 hover:text-[#49ce71] smooth-transition">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="text-gray-300 hover:text-[#49ce71] smooth-transition">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#havelis" className="text-gray-300 hover:text-[#49ce71] smooth-transition">
                      Havelis
                    </a>
                  </li>
                  <li>
                    <a href="#events" className="text-gray-300 hover:text-[#49ce71] smooth-transition">
                      Events
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">Heritage Sites</h4>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/havelis/bara-imambara"
                      className="text-gray-300 hover:text-[#49ce71] smooth-transition"
                    >
                      Bara Imambara
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/havelis/chhota-imambara"
                      className="text-gray-300 hover:text-[#49ce71] smooth-transition"
                    >
                      Chhota Imambara
                    </Link>
                  </li>
                  <li>
                    <Link href="/havelis/rumi-darwaza" className="text-gray-300 hover:text-[#49ce71] smooth-transition">
                      Rumi Darwaza
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/havelis/dilkusha-kothi"
                      className="text-gray-300 hover:text-[#49ce71] smooth-transition"
                    >
                      Dilkusha Kothi
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-4 text-[#49ce71]">{t("contact")}</h4>
                <div className="space-y-2">
                  <p className="text-gray-300 flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-[#49ce71]" />
                    +91 97581 86377
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-[#49ce71]" />
                    info@heritagehavenslucknow.com
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-[#49ce71]" />
                    Lucknow, Uttar Pradesh, India
                  </p>
                </div>
              </div>
            </div>

            <Separator className="my-8 bg-[#49ce71]/30" />

            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2024 Heritage Havens Lucknow. {t("allRights")}</p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a href="/team" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                  Heritage Havens Team
                </a>
                <a href="/privacy-policy" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-300 hover:text-[#49ce71] text-sm smooth-transition">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to Top Button */}
        <Button
          onClick={scrollToTop}
          className={`back-to-top ${showBackToTop ? "visible" : ""} bg-[#49ce71] hover:bg-[#3ba55c] text-black shadow-lg`}
          size="icon"
          aria-label={t("backToTop")}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
