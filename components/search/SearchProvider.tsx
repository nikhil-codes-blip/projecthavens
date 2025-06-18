"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface SearchItem {
  id: string
  title: string
  description: string
  category: "haveli" | "event" | "guide" | "testimonial"
  location?: string
  era?: string
  highlight?: string
  rating?: number
  entryFee?: string
  date?: string
  url?: string
}

interface SearchContextType {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: SearchItem[]
  isSearching: boolean
  clearSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const useSearch = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

// Sample data - in a real app, this would come from your API/database
const searchData: SearchItem[] = [
  // Havelis
  {
    id: "1",
    title: "Bara Imambara",
    description:
      "The Bara Imambara is an architectural wonder built by Asaf-ud-Daula. Famous for its central hall and the mysterious Bhul-bhulaiya labyrinth.",
    category: "haveli",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Architectural Marvel",
    rating: 4.8,
    entryFee: "₹25",
    url: "/explore#havelis",
  },
  {
    id: "2",
    title: "Chhota Imambara",
    description:
      "Also known as Imambara Hussainabad Mubarak, this stunning monument features beautiful chandeliers and intricate decorations.",
    category: "haveli",
    location: "Hussainabad",
    era: "1838",
    highlight: "Golden Dome Paradise",
    rating: 4.7,
    entryFee: "₹25",
    url: "/explore#havelis",
  },
  {
    id: "3",
    title: "Rumi Darwaza",
    description: "An imposing gateway that stands as a symbol of Lucknow, modeled after the Sublime Porte in Istanbul.",
    category: "haveli",
    location: "Old Lucknow",
    era: "1784",
    highlight: "Gateway to History",
    rating: 4.6,
    entryFee: "Free",
    url: "/explore#havelis",
  },
  {
    id: "4",
    title: "Dilkusha Kothi",
    description:
      "Experience royal living in this restored heritage property offering luxury accommodation with historical charm.",
    category: "haveli",
    location: "Dilkusha",
    era: "1800",
    highlight: "Heritage Stay",
    rating: 4.9,
    entryFee: "₹8000/night",
    url: "/explore#havelis",
  },
  // Events
  {
    id: "5",
    title: "Lucknow Heritage Walk",
    description: "Guided walking tour through the historic lanes of Lucknow, exploring hidden gems and local stories.",
    category: "event",
    location: "Old Lucknow",
    date: "Every Saturday",
    url: "/explore#events",
  },
  {
    id: "6",
    title: "Nawabi Cuisine Festival",
    description: "Savor authentic Awadhi cuisine in the royal ambiance of historic Havelis.",
    category: "event",
    location: "Various Havelis",
    date: "Dec 15-20, 2024",
    url: "/explore#events",
  },
  {
    id: "7",
    title: "Classical Music Evening",
    description: "Experience soul-stirring classical music performances in the acoustically perfect halls.",
    category: "event",
    location: "Bara Imambara",
    date: "Every Full Moon",
    url: "/explore#events",
  },
  // Travel Guide Content
  {
    id: "8",
    title: "Best Time to Visit",
    description:
      "October to March offers pleasant weather for sightseeing. Avoid summer months for comfortable exploration.",
    category: "guide",
    url: "/explore#travel-guide",
  },
  {
    id: "9",
    title: "Local Guides",
    description:
      "Professional local guides available for ₹500-1000 per day. They provide detailed historical insights and cultural context.",
    category: "guide",
    url: "/explore#travel-guide",
  },
  {
    id: "10",
    title: "Dress Code",
    description:
      "Modest attire recommended. Respect cultural sensitivities when visiting religious and heritage sites.",
    category: "guide",
    url: "/explore#travel-guide",
  },
  {
    id: "11",
    title: "Nearby Attractions",
    description:
      "Multiple heritage sites within walking distance. Plan a full day to explore the historic Old Lucknow area.",
    category: "guide",
    url: "/explore#travel-guide",
  },
  // Testimonials
  {
    id: "12",
    title: "Sarah Johnson Review",
    description:
      "Absolutely breathtaking! The architecture and history came alive through the excellent guides. A must-visit for anyone interested in Indian heritage.",
    category: "testimonial",
    location: "London, UK",
    rating: 5,
    url: "/explore#testimonials",
  },
  {
    id: "13",
    title: "Rajesh Kumar Review",
    description: "लखनऊ की हवेलियों का दौरा अविस्मरणीय था। इतिहास और संस्कृति का अद्भुत मिश्रण।",
    category: "testimonial",
    location: "Delhi, India",
    rating: 5,
    url: "/explore#testimonials",
  },
]

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchItem[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }

    setIsSearching(true)

    // Simulate API delay
    const searchTimeout = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim()

      const results = searchData.filter((item) => {
        const searchableText = [item.title, item.description, item.location, item.era, item.highlight, item.category]
          .join(" ")
          .toLowerCase()

        return searchableText.includes(query)
      })

      // Sort results by relevance (title matches first, then description)
      results.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(query) ? 1 : 0
        const bTitle = b.title.toLowerCase().includes(query) ? 1 : 0

        if (aTitle !== bTitle) return bTitle - aTitle

        // If both or neither match title, sort by category priority
        const categoryPriority = { haveli: 4, event: 3, guide: 2, testimonial: 1 }
        return categoryPriority[b.category] - categoryPriority[a.category]
      })

      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [searchQuery])

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    setIsSearching(false)
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearching,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
