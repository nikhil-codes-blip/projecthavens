"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSearch } from "./SearchProvider"
import { Search, Clock, MapPin, Star, Calendar, X, Loader2 } from "lucide-react"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { searchQuery, setSearchQuery, searchResults, isSearching, clearSearch } = useSearch()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleClose = () => {
    clearSearch()
    onClose()
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "haveli":
        return "🏛️"
      case "event":
        return "🎭"
      case "guide":
        return "📖"
      case "testimonial":
        return "💬"
      default:
        return "📍"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "haveli":
        return "bg-[#49ce71] text-black"
      case "event":
        return "bg-[#e6b619] text-black"
      case "guide":
        return "bg-blue-500 text-white"
      case "testimonial":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-[#49ce71] text-black px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-[#222222] border-[#49ce71] text-white max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-[#49ce71] font-playfair">Search Heritage Havens</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search havelis, events, guides, and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-[#1a1a1a] border-[#49ce71] text-white placeholder-gray-400"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 text-gray-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto space-y-2">
            {isSearching && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-[#49ce71]" />
                <span className="ml-2 text-gray-400">Searching...</span>
              </div>
            )}

            {!isSearching && searchQuery && searchResults.length === 0 && (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">No results found for "{searchQuery}"</div>
                <div className="text-sm text-gray-500">Try searching for havelis, events, or travel guides</div>
              </div>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400 mb-3">
                  Found {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
                </div>

                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url || "/explore"}
                    onClick={handleClose}
                    className="block p-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-lg border border-gray-700 hover:border-[#49ce71] transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getCategoryIcon(result.category)}</span>
                        <h3 className="font-semibold text-white font-playfair">
                          {highlightText(result.title, searchQuery)}
                        </h3>
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(result.category)}`}>{result.category}</Badge>
                    </div>

                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {highlightText(result.description, searchQuery)}
                    </p>

                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      {result.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{result.location}</span>
                        </div>
                      )}

                      {result.era && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{result.era}</span>
                        </div>
                      )}

                      {result.date && (
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{result.date}</span>
                        </div>
                      )}

                      {result.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span>{result.rating}</span>
                        </div>
                      )}

                      {result.entryFee && <div className="text-[#49ce71] font-medium">{result.entryFee}</div>}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="space-y-4">
                <div className="text-sm text-gray-400 mb-3">Popular searches</div>
                <div className="grid grid-cols-2 gap-2">
                  {["Bara Imambara", "Heritage Walk", "Best Time", "Local Guides"].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(suggestion)}
                      className="justify-start text-left border-gray-600 text-gray-300 hover:border-[#49ce71] hover:text-[#49ce71]"
                    >
                      <Search className="h-3 w-3 mr-2" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Tips */}
          {!searchQuery && (
            <div className="border-t border-gray-700 pt-4">
              <div className="text-xs text-gray-500">
                <div className="font-medium mb-1">Search tips:</div>
                <ul className="space-y-1">
                  <li>• Try searching for specific havelis like "Bara Imambara"</li>
                  <li>• Look for events like "Heritage Walk" or "Music Evening"</li>
                  <li>• Find travel info with "Best Time" or "Local Guides"</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
