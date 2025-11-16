import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect } from "react";

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
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Автоматически закрывается через 5 секунд

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-md"
          >
            <div
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 overflow-hidden ${
                type === "success"
                  ? "border-green-500/50"
                  : "border-red-500/50"
              }`}
            >
              {/* Decorative gradient */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  type === "success"
                    ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                }`}
              />

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      delay: 0.2,
                      stiffness: 200,
                      damping: 15,
                    }}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      type === "success"
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-red-100 dark:bg-red-900/30"
                    }`}
                  >
                    {type === "success" ? (
                      <CheckCircle2 className="w-7 h-7 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="w-7 h-7 text-red-600 dark:text-red-400" />
                    )}
                  </motion.div>

                  {/* Message */}
                  <div className="flex-1 pt-1">
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`text-lg font-semibold mb-1 ${
                        type === "success"
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {type === "success" ? "Success!" : "Error"}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                    >
                      {message}
                    </motion.p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    aria-label="Close notification"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`h-1 ${
                  type === "success"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

