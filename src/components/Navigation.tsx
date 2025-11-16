import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface NavigationProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
}

export function Navigation({ isDark, setIsDark }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: "Home", id: "hero" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Portfolio", id: "portfolio" },
    { label: "Services", id: "services" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0d0f16]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="text-[#6c93ec] cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            {"<Dev />"}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-[#6c93ec] dark:hover:text-[#6c93ec] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="ml-4"
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(!isDark)}
            >
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMenuOpen ? "auto" : 0,
          opacity: isMenuOpen ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1], // cubic-bezier для плавности
        }}
        style={{
          overflow: "hidden",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
        className="md:hidden bg-white dark:bg-[#0d0f16] border-t border-gray-200 dark:border-gray-800"
        aria-hidden={!isMenuOpen}
      >
        <motion.div
          initial={false}
          animate={{
            y: isMenuOpen ? 0 : -20,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            delay: isMenuOpen ? 0.1 : 0,
          }}
          className="px-4 py-4 space-y-3"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={false}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20,
              }}
              transition={{
                duration: 0.3,
                delay: isMenuOpen ? 0.15 + index * 0.05 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[#6c93ec] dark:hover:text-[#6c93ec] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </nav>
  );
}
