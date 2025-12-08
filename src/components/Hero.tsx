import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -30]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white dark:from-[#0a0a0a] dark:to-[#1a1a1a] overflow-hidden"
    >
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 right-10 w-72 h-72 bg-[#6c93ec]/5 dark:bg-[#6c93ec]/10 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-[#6c93ec]/5 dark:bg-[#6c93ec]/10 rounded-full blur-3xl"
      />

      <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[#6c93ec]/20 to-transparent" />
      <div className="absolute bottom-1/3 right-0 w-1/2 h-px bg-gradient-to-l from-transparent via-[#6c93ec]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6c93ec] to-[#4a6bb8] rounded-full blur-xl opacity-30" />
              <ImageWithFallback
                style={{
                  objectPosition: "top",
                }}
                src="/img/myphoto.png"
                alt="Developer Avatar"
                className="relative w-64 h-64 sm:w-80 sm:h-80 object-cover object-top object-center rounded-full border-4 border-white dark:border-gray-800 shadow-2xl"
              />
            </div>

            <div className="text-center">
              <h1 className="text-gray-900 dark:text-white mb-3 tracking-tight">
                Levon Bakunts
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xl tracking-wide">
                Backend Developer
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center text-center lg:text-left space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 dark:text-white tracking-tight leading-tight">
              Crafting scalable{" "}
              <span className="text-[#6c93ec]">digital experiences</span>.
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              I build fast, reliable, and scalable backend systems and server infrastructure.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-[#6c93ec] hover:bg-[#5a7fdb] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#6c93ec]/25 backdrop-blur-sm text-lg"
                >
                  Work With Me
                </Button>
              </motion.div>

              <motion.button
                onClick={scrollToPortfolio}
                whileHover={{ scale: 1.03, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-[#6c93ec] dark:hover:text-[#6c93ec] transition-colors text-lg group"
              >
                View Portfolio
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
