"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`,
        formData
      );

      if (res.data.success) {
        alert("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const contactCards = [
    {
      id: 1,
      icon: <Phone className="text-purple-600" />,
      content: ["+91 8010735898", "+333 153 4575 7893"],
    },
    {
      id: 2,
      icon: <Mail className="text-purple-600" />,
      content: ["sonicindustriesofficial@gmail.com", "anothername@name.com"],
    },
    {
      id: 3,
      icon: <MapPin className="text-purple-600" />,
      content: [
        "Sonic Industries, Gala No 05, Nityanand Bhakti,",
        "Opp Rajeev Gandhi Vidyalay, Nilemore Road,",
        "Nallasopara West, Palghar-401203",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 py-20 px-4" ref={sectionRef} id="contact">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">Contact Us</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto">
            Have questions or inquiries? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 cursor-pointer">
          {contactCards.map((card, index) => (
            <div
              key={card.id}
              className={`bg-white rounded-lg shadow-lg p-8 text-center transform transition-all duration-700 
              ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-purple-400 animate-spin"
                    style={{
                      animationDuration: "12s",
                      animationDirection:
                        index % 2 === 0 ? "normal" : "reverse",
                    }}
                  ></div>
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                    {card.icon}
                  </div>
                </div>
              </div>
              <div>
                {card.content.map((line, i) => (
                  <p key={i} className="text-gray-700 my-1">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <div
            className={`bg-white rounded-lg shadow-lg p-8 transform transition-all duration-700 
              ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            style={{ transitionDelay: "300ms" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-600"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 uppercase cursor-pointer`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Map */}
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 
              ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6990232557923!2d72.81300262498675!3d19.425406081852454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9ef038b322f%3A0xe02b3de42dd9dc44!2sSonic%20Industries!5e0!3m2!1sen!2sin!4v1745071411343!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
