"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  "home",
  "about",
  "features",
  "products",
  "testimonial",
  "faq",
  "contact",
];

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (
          el &&
          scrollY >= el.offsetTop &&
          scrollY < el.offsetTop + el.offsetHeight
        ) {
          setActive(sec);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        <div className="text-xl md:text-2xl font-bold text-black flex items-center">
          <Link href="/" className="flex items-center cursor-pointer">
            <div className="w-12 h-16 relative mr-2">
              <Image
                src="/Sonic Logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="w-12 h-16"
              />
            </div>
            <div className="text-2xl font-medium tracking-wider text-purple-600">
              <div className="text-transparent bg-clip-text bg-black">
                SONIC
              </div>
              <div className="text-transparent bg-clip-text bg-black">
                INDUSTRIES
              </div>
            </div>
          </Link>
        </div>

        {/* Animated Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none relative w-12 h-12 flex items-center justify-center overflow-hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transform transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-2 lg:space-x-6 font-semibold">
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={`relative px-1 py-2 block transition-colors duration-300 ${
                  active === section
                    ? "text-purple-600"
                    : "hover:text-purple-400"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span
                  className={`absolute left-0 bottom-0 w-full h-0.5 bg-purple-600 transform transition-transform duration-300 ${
                    active === section ? "scale-x-100" : "scale-x-0"
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col font-medium">
          {sections.map((section, index) => (
            <li
              key={section}
              style={{
                transform: isMenuOpen ? "translateX(0)" : "translateX(-20px)",
                opacity: isMenuOpen ? 1 : 0,
                transition: `all 0.3s ease ${index * 0.05}s`,
              }}
            >
              <a
                href={`#${section}`}
                className={`block px-4 py-3 border-b transition-colors duration-200 ${
                  active === section
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-800 hover:bg-gray-50"
                }`}
                onClick={closeMenu}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
