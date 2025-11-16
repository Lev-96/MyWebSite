import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X, Sparkles } from "lucide-react";
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
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    console.log("🎯 NotificationPopup - Props changed:", { isOpen, type, message });
    if (isOpen) {
      console.log("✅ NotificationPopup is OPEN and should be visible!");
    } else {
      console.log("❌ NotificationPopup is CLOSED");
    }
  }, [isOpen, type, message]);

  useEffect(() => {
    if (isOpen) {
      setProgress(100);
      
      const closeDelay = 5000;
      const updateInterval = 50;
      const totalSteps = closeDelay / updateInterval;
      const stepDecrement = 100 / totalSteps;
      
      const timer = setTimeout(() => {
        onClose();
      }, closeDelay);

      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - stepDecrement;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, updateInterval);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      setProgress(100);
    }
  }, [isOpen, onClose]);

  console.log("🎨 NotificationPopup rendering, isOpen:", isOpen, "type:", type, "message:", message);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 99998 }}
            onClick={onClose}
          />

          <motion.div
            key="popup-content"
            initial={{ 
              opacity: 0, 
              scale: 0.7, 
              y: 100,
              rotateX: -15
            }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              rotateX: 0
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: -30,
              rotateX: 10
            }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              mass: 0.8,
              duration: 0.5,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md pointer-events-auto"
            style={{ 
              zIndex: 99999,
              transformStyle: "preserve-3d",
            }}
          >
            <div className="pointer-events-auto">
              <div
                className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden ${
                  type === "success"
                    ? "border-2 border-green-500/30 dark:border-green-500/20"
                    : "border-2 border-red-500/30 dark:border-red-500/20"
                }`}
                style={{
                  boxShadow: type === "success"
                    ? "0 20px 60px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1)"
                    : "0 20px 60px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.1)",
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className={`absolute inset-0 ${
                    type === "success"
                      ? "bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/20 dark:from-green-900/10 dark:via-emerald-900/5 dark:to-teal-900/5"
                      : "bg-gradient-to-br from-red-50/50 via-rose-50/30 to-pink-50/20 dark:from-red-900/10 dark:via-rose-900/5 dark:to-pink-900/5"
                  }`}
                />

                {type === "success" && (
                  <>
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: [0, 1, 0], rotate: 360 }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full opacity-60"
                    />
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: [0, 1, 0], rotate: -360 }}
                      transition={{ 
                        duration: 2.5, 
                        repeat: Infinity,
                        delay: 0.5,
                        ease: "easeInOut"
                      }}
                      className="absolute top-6 right-8 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-50"
                    />
                  </>
                )}

                <div className="relative p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        delay: 0.3,
                        stiffness: 200,
                        damping: 15,
                      }}
                      className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                        type === "success"
                          ? "bg-gradient-to-br from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600"
                          : "bg-gradient-to-br from-red-400 to-rose-500 dark:from-red-500 dark:to-rose-600"
                      }`}
                    >
                      {type === "success" ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
                        >
                          <XCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </motion.div>
                      )}
                    </motion.div>

                    <div className="flex-1 pt-1">
                      <motion.h3
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className={`text-xl font-bold mb-2 ${
                          type === "success"
                            ? "text-green-700 dark:text-green-300"
                            : "text-red-700 dark:text-red-300"
                        }`}
                      >
                        {type === "success" ? (
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Success!
                          </span>
                        ) : (
                          "Error"
                        )}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed"
                      >
                        {message}
                      </motion.p>
                    </div>

                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                      aria-label="Close notification"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                <div className="relative h-1.5 bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden">
                  <motion.div
                    initial={{ width: "100%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: "linear" }}
                    className={`h-full ${
                      type === "success"
                        ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
                        : "bg-gradient-to-r from-red-400 via-rose-500 to-pink-500"
                    }`}
                    style={{
                      boxShadow: type === "success"
                        ? "0 0 10px rgba(34, 197, 94, 0.5)"
                        : "0 0 10px rgba(239, 68, 68, 0.5)",
                      transition: "width 0.1s linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

