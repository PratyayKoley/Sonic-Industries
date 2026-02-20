"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`,
        formData
      );

      if (res.data.success) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("Something went wrong while sending the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const contactCards = [
    {
      id: 1,
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      content: ["+91 8010735898", "+91 9321970200"],
    },
    {
      id: 2,
      icon: <Mail className="w-6 h-6 text-purple-600" />,
      content: ["sonicindustriesofficial@gmail.com"],
    },
    {
      id: 3,
      icon: <MapPin className="w-6 h-6 text-purple-600" />,
      content: [
        "Sonic Industries, Office No. 5,6,7,8,9, Sai Shristi Apt,",
        "Opp Railway Station, Nearby Bus Stop",
        "Nallasopara West, MH-401203",
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-gray-100 py-14 sm:py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
            Contact Us
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Have questions or inquiries? We’d love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white rounded-xl shadow-md p-6 sm:p-8 text-center transition-all duration-700
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-purple-400 animate-spin animation-duration-[12s]" />
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
              </div>

              {card.content.map((line, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base text-gray-700 leading-relaxed"
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form */}
          <div
            className={`bg-white rounded-xl shadow-md p-6 sm:p-8 transition-all duration-700
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-purple-600"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-purple-600"
              />

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-purple-600"
              />

              <button
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-md transition w-full sm:w-auto"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map */}
          <div
            className={`bg-white rounded-xl shadow-md overflow-hidden h-75 sm:h-full transition-all duration-700
            ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6990232557923!2d72.81300262498675!3d19.425406081852454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9ef038b322f%3A0xe02b3de42dd9dc44!2sSonic%20Industries!5e0!3m2!1sen!2sin!4v1745071411343!5m2!1sen!2sin"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
