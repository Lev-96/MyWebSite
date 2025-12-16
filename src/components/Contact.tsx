import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { Github, Linkedin, Phone } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { NotificationPopup } from "./NotificationPopup";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    isOpen: boolean;
    type: "success" | "error";
    message: string;
  }>({
    isOpen: false,
    type: "success",
    message: "",
  });

  useEffect(() => {
    console.log("📊 Notification state changed:", notification);
    if (notification.isOpen) {
      console.log("✅ Notification is OPEN - popup should be visible!");
    }
  }, [notification]);

  const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      fill="#229ED9"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Telegram"
      {...props}
    >
      <path d="M12 0C5.372 0 .001 5.372.001 12c0 6.627 5.371 12 11.999 12 6.628 0 12-5.373 12-12C24 5.372 18.628 0 12 0zm5.535 7.57l-1.806 8.53c-.137.593-.495.738-1 .46l-2.77-2.043-1.337 1.29c-.148.147-.274.272-.563.272l.201-2.843 5.175-4.69c.225-.198-.05-.309-.35-.11l-6.401 4.025-2.755-.86c-.597-.185-.607-.597.124-.825l10.764-3.305c.5-.146.938.12.779.814z" />
    </svg>
  );

  const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Discord"
      {...props}
    >
      <path
        d="M2 11.6C2 8.23969 2 6.55953 2.65396 5.27606C3.2292 4.14708 4.14708 3.2292 5.27606 2.65396C6.55953 2 8.23969 2 11.6 2H20.4C23.7603 2 25.4405 2 26.7239 2.65396C27.8529 3.2292 28.7708 4.14708 29.346 5.27606C30 6.55953 30 8.23969 30 11.6V20.4C30 23.7603 30 25.4405 29.346 26.7239C28.7708 27.8529 27.8529 28.7708 26.7239 29.346C25.4405 30 23.7603 30 20.4 30H11.6C8.23969 30 6.55953 30 5.27606 29.346C4.14708 28.7708 3.2292 27.8529 2.65396 26.7239C2 25.4405 2 23.7603 2 20.4V11.6Z"
        fill="white"
      />
      <path
        d="M23.6361 9.33998C22.212 8.71399 20.6892 8.25903 19.0973 8C18.9018 8.33209 18.6734 8.77875 18.5159 9.13408C16.8236 8.89498 15.1469 8.89498 13.4857 9.13408C13.3283 8.77875 13.0946 8.33209 12.8974 8C11.3037 8.25903 9.77927 8.71565 8.35518 9.3433C5.48276 13.4213 4.70409 17.3981 5.09342 21.3184C6.99856 22.6551 8.84487 23.467 10.66 23.9983C11.1082 23.4189 11.5079 22.8029 11.8523 22.1536C11.1964 21.9195 10.5683 21.6306 9.9748 21.2951C10.1323 21.1856 10.2863 21.071 10.4351 20.9531C14.0551 22.5438 17.9881 22.5438 21.5649 20.9531C21.7154 21.071 21.8694 21.1856 22.0251 21.2951C21.4299 21.6322 20.8 21.9211 20.1442 22.1553C20.4885 22.8029 20.8865 23.4205 21.3364 24C23.1533 23.4687 25.0013 22.6567 26.9065 21.3184C27.3633 16.7738 26.1261 12.8335 23.6361 9.33998ZM12.3454 18.9075C11.2587 18.9075 10.3676 17.9543 10.3676 16.7937C10.3676 15.6331 11.2397 14.6783 12.3454 14.6783C13.4511 14.6783 14.3422 15.6314 14.3232 16.7937C14.325 17.9543 13.4511 18.9075 12.3454 18.9075ZM19.6545 18.9075C18.5678 18.9075 17.6767 17.9543 17.6767 16.7937C17.6767 15.6331 18.5488 14.6783 19.6545 14.6783C20.7602 14.6783 21.6514 15.6314 21.6323 16.7937C21.6323 17.9543 20.7602 18.9075 19.6545 18.9075Z"
        fill="#5865F2"
      />
    </svg>
  );

  const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
      {...props}
    >
      <rect x="0" fill="none" width="20" height="20" />
      <g>
        <path
          d="M16.8 5.7C14.4 2 9.5.9 5.7 3.2 2 5.5.8 10.5 3.2 14.2l.2.3-.8 3 3-.8.3.2c1.3.7 2.7 1.1 4.1 1.1 1.5 0 3-.4 4.3-1.2 3.7-2.4 4.8-7.3 2.5-11.1zm-2.1 7.7c-.4.6-.9 1-1.6 1.1-.4 0-.9.2-2.9-.6-1.7-.8-3.1-2.1-4.1-3.6-.6-.7-.9-1.6-1-2.5 0-.8.3-1.5.8-2 .2-.2.4-.3.6-.3H7c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.1.1.3 0 .4.1.2 0 .4-.1.5-.1.1-.2.3-.3.4-.2.1-.3.3-.2.5.4.6.9 1.2 1.4 1.7.6.5 1.2.9 1.9 1.2.2.1.4.1.5-.1s.6-.7.8-.9c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.5.3.1.3.1.7-.1 1z"
          fill="#25D366"
        />
      </g>
    </svg>
  );

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/Lev-96",
      color: "#333",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/levon-bakunts-406816218/",
      color: "#0A66C2",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      url: "https://discord.com/users/lux_01001100",
      color: "#5865F2",
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      url: "https://t.me/Levon_1396",
      color: "#229ED9",
    },
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      url: "https://wa.me/37433733633",
      color: "#25D366",
    },
  ];

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (notification.isOpen) {
    setNotification({ isOpen: false, type: "", message: "" });
  }

  const isDev = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const functionUrl = isDev
    ? "http://localhost:3000/.netlify/functions/send-mail"
    : "/.netlify/functions/send-mail";

  try {
    const response = await fetch(functionUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data: any;
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      if (!text) throw new Error("Empty response from server");
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (response.ok) {
      const successMessage = data.message || "Message sent successfully! I'll get back to you soon.";

      setFormData({ name: "", email: "", message: "", service: "" });

      setTimeout(() => {
        setNotification({ isOpen: true, type: "success", message: successMessage });
      }, 50);

    } else {
      let errorMsg = data.error || data.message || "Failed to send message";

      if (data.details) {
        if (data.details.includes("API key")) errorMsg = "Email service configuration error. Contact admin.";
        else if (data.details.includes("Domain")) errorMsg = "Email domain not verified. Contact admin.";
        else errorMsg = `${errorMsg}: ${data.details}`;
      }

      throw new Error(errorMsg);
    }

  } catch (error: any) {
    const isNetworkError = (err: any) =>
      err.message?.includes("fetch") ||
      err.message?.includes("network") ||
      err.message?.includes("Failed to fetch");

    const errorMessage = isNetworkError(error)
      ? "Network error. Check your connection and try again."
      : error.message || "Something went wrong. Please try again later.";

    setNotification({ isOpen: true, type: "error", message: errorMessage });

  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      <section
        id="contact"
        ref={ref}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0d0f16]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 text-gray-900 dark:text-white"
          >
            Contact Me
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-gray-900 dark:text-white mb-6">Get In Touch</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-gray-900 dark:text-white mb-4">
                    Connect With Me
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {socialLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#6c93ec] hover:shadow-md transition-all"
                        >
                          <Icon
                            className="w-5 h-5"
                            style={{ color: link.color }}
                          />
                          <span className="text-gray-700 dark:text-gray-300">
                            {link.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                     Full Name
                    </label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                      Service
                    </label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="border-gray-300 dark:border-gray-600">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="backend">
                          Backend Developer
                        </SelectItem>
                        <SelectItem value="backend-server">
                          Backend/Server Engineer
                        </SelectItem>
                        <SelectItem value="sre">
                          Site Reliability Engineer (SRE)
                        </SelectItem>
                        <SelectItem value="fullstack">
                          Full-Stack Developer
                        </SelectItem>
                        <SelectItem value="frontend">
                          Frontend Developer
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell me about your project..."
                      required
                      rows={5}
                      disabled={isSubmitting}
                      className="border-gray-300 dark:border-gray-600"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#6c93ec] hover:bg-[#5a7fdb] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <NotificationPopup
        isOpen={notification.isOpen}
        type={notification.type}
        message={notification.message}
        onClose={() => {
          console.log("🔴 Closing popup manually");
          setNotification((prev) => ({ ...prev, isOpen: false }));
        }}
      />
    </>
  );
}