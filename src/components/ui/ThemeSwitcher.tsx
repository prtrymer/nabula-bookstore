'use client';

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full 
        bg-gray-200 text-gray-800
        dark:bg-gray-700 dark:text-gray-200
        transition-colors duration-300 
        hover:bg-gray-300 
        dark:hover:bg-gray-600"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </button>
  )
}