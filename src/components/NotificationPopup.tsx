import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NotificationPopupProps {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

export function NotificationPopup({
  isOpen,
  type,
  message,
  onClose,
}: NotificationPopupProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ 
            opacity: 0, 
            x: isMobile ? 0 : 300,
            y: isMobile ? -100 : 0,
            scale: 0.9
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0, 
            x: isMobile ? 0 : 300,
            y: isMobile ? -100 : 0,
            scale: 0.9
          }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-auto md:max-w-md z-50"
        >
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 ${
              type === "success"
                ? "border-green-500"
                : "border-red-500"
            } p-4 flex items-start gap-3`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                type === "success"
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              {type === "success" ? (
                <CheckCircle2
                  className="w-5 h-5 text-green-600 dark:text-green-400"
                  strokeWidth={2}
                />
              ) : (
                <XCircle
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  strokeWidth={2}
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${
                  type === "success"
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {type === "success" ? "Success!" : "Error"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 break-words">
                {message}
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

