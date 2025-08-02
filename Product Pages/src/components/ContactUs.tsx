import { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Contact information cards data
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
            Prepared is me marianne pleasure likewise debating. Wonder an unable
            except better stairs do ye admire. His secure called esteem praise.
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
                {/* Rotating dotted circle with icon */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Rotating outer circle */}
                  <div
                    className="absolute inset-0 rounded-full border border-dashed border-purple-400 animate-spin"
                    style={{
                      animationDuration: "12s",
                      animationDirection:
                        index % 2 === 0 ? "normal" : "reverse",
                    }}
                  ></div>
                  {/* Static inner circle with icon */}
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

        {/* Contact Form and Map Section */}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-300 uppercase cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Map Section - Updated with Google Maps iframe */}
          <div
            className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 
              ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative w-full h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6990232557923!2d72.81300262498675!3d19.425406081852454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7a9ef038b322f%3A0xe02b3de42dd9dc44!2sSonic%20Industries!5e0!3m2!1sen!2sin!4v1745071411343!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, position: "absolute", top: 0, left: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
