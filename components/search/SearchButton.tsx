"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { SearchModal } from "./SearchModal"


export const SearchButton: React.FC = () => {
  
  
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Open search with Ctrl+K or Cmd+K
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault()
        setIsSearchOpen(true)
      }

      // Close search with Escape
      if (event.key === "Escape") {
        setIsSearchOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setIsSearchOpen(true)}
        className="bg-transparent border-[#49ce71] text-[#49ce71] hover:bg-[#49ce71] hover:text-black transition-colors"
      >
        <Search className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline-flex ml-2 pointer-events-none h-5 select-none items-center gap-1 rounded border border-[#49ce71] bg-transparent px-1.5 font-mono text-[10px] font-medium opacity-70">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
