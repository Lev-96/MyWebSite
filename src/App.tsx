import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem('theme');
    let initialDark = true;
    if (saved === 'dark' || saved === 'light') {
      initialDark = saved === 'dark';
    } else {
      initialDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    const root = document.documentElement;
    if (initialDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    return initialDark;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d0f16] text-gray-900 dark:text-white transition-colors duration-300">
      <Navigation isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Services />
      <Contact />
      <Toaster />
    </div>
  );
}