"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { junkItems } from "@/components/junk-estimator/junk-items-data"

interface SearchBarProps {
  onSearch: (query: string) => void
  onItemSelect?: (item: (typeof junkItems)[0]) => void
  IconComponent?: React.ComponentType<{ itemId: string; className?: string }>
}

export function SearchBar({ onSearch, onItemSelect, IconComponent }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<typeof junkItems>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length > 0) {
      const filtered = junkItems.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5) // Show max 5 suggestions
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
    setSelectedIndex(-1)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
    setShowSuggestions(false)
  }

  const handleSuggestionClick = (suggestion: (typeof junkItems)[0]) => {
    setQuery(suggestion.name)
    onSearch(suggestion.name)
    setShowSuggestions(false)
    inputRef.current?.focus()

    // Auto-add the item if onItemSelect is provided
    if (onItemSelect) {
      onItemSelect(suggestion)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSuggestionClick(suggestions[selectedIndex])
        } else {
          handleSubmit(e)
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false)
      }
    }, 150)
  }

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Start Typing Here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => query.length > 0 && setSuggestions.length > 0 && setShowSuggestions(true)}
          className="pl-10 pr-4 py-2 h-12 border-gray-200"
        />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search size={18} />
        </div>
        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </form>

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-sm max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                index === selectedIndex
                  ? "bg-primary-50 text-primary-700 !text-primary-700"
                  : "text-gray-800 !text-gray-800"
              } ${index === 0 ? "rounded-t-lg" : ""} ${
                index === suggestions.length - 1 ? "rounded-b-lg" : "border-b border-gray-100"
              }`}
            >
              {IconComponent ? (
                <IconComponent itemId={suggestion.id} className="w-5 h-5" />
              ) : (
                <span className="text-lg" dangerouslySetInnerHTML={{ __html: suggestion.icon }} />
              )}
              <span className="text-sm sm:text-base font-medium text-inherit">{suggestion.name}</span>
              <span className="ml-auto text-xs sm:text-sm text-gray-600 !text-gray-600">${suggestion.price}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
