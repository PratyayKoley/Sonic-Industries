"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Package,
  Cog,
  Truck,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { CategoryBackend } from "@/types";

type Props = {
  categories: CategoryBackend[];
};

export default function HomeClient({ categories }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Packaging Solutions",
      description: "Advanced machinery for all your packaging needs",
    },
    {
      icon: <Cog className="w-8 h-8" />,
      title: "Maintenance Free",
      description: "Durable equipment requiring minimal upkeep",
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Pan India Delivery",
      description: "Fast and reliable shipping across India",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "1 Year Warranty",
      description: "Complete peace of mind with full warranty",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-12 relative mr-2">
                <Image
                  src="/Sonic Logo.png"
                  alt="Sonic Industries Logo"
                  width={40}
                  height={48}
                  className="w-10 h-12"
                />
              </div>
              <div className="text-xl font-bold">
                <div className="text-gray-800">SONIC</div>
                <div className="text-gray-800">INDUSTRIES</div>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#products"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Products
              </a>
              <a
                href="#about"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-purple-600 transition"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-50 via-white to-indigo-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Sonic Industries
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
                Leading Manufacturer of Packaging Machinery
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We specialize in manufacturing high-quality packaging machinery,
                coding solutions, and automation systems. Trusted by industries
                across India for innovation, reliability, and exceptional
                customer service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#products"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-center hover:shadow-lg"
                >
                  Explore Products
                </a>
                <a
                  href="#contact"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 text-center"
                >
                  Contact Us
                </a>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-purple-400 to-indigo-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
                <Image
                  src="https://res.cloudinary.com/drkzz6pfx/image/upload/v1768039731/Venture_by_Sapna_Group_wmum1z.png"
                  alt="Sonic Industries Packaging Machinery"
                  width={600}
                  height={400}
                  className="relative rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sonic Industries
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We deliver excellence through innovation, quality, and
              customer-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-purple-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 cursor-pointer"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Product Range
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive packaging and automation solutions for every
              industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-linear-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                  <Package className="w-20 h-20 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>

                  <Link
                    href={`/${category.slug}`}
                    prefetch
                    className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                  >
                    Learn More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? We're here to help you find the perfect solution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg text-center border border-purple-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Phone
              </h3>
              <p className="text-gray-600">+91 8010735898</p>
              <p className="text-gray-600">Mon - Fri: 10 AM - 6 PM IST</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg text-center border border-purple-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Email
              </h3>
              <p className="text-gray-600">sonicindustriesofficial@gmail.com</p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg text-center border border-purple-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Address
              </h3>
              <p className="text-gray-600">
                Nallasopara West, Palghar-401203, Maharashtra, India
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-12 relative mr-2">
                  <Image
                    src="/Sonic Logo.png"
                    alt="Sonic Industries Logo"
                    width={40}
                    height={48}
                    className="w-10 h-12"
                  />
                </div>
                <div className="text-xl font-bold">
                  <div className="text-white">SONIC</div>
                  <div className="text-white">INDUSTRIES</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Leading manufacturer of high-quality packaging machinery and
                solutions. Delivering innovation, precision, and reliability
                across industries since our inception.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/sonicpackagingindustries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/sonicpackagingindustries/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-linear-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-full flex items-center justify-center hover:opacity-80 transition"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@packagingmachinerybysonic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#FF0000] rounded-full flex items-center justify-center hover:opacity-80 transition"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://in.linkedin.com/company/sonic-industries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center hover:opacity-80 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/RazorpayPages/privacy-policy"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/RazorpayPages/terms-and-conditions"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/RazorpayPages/refund-policy"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Refund & Cancellation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/RazorpayPages/shipping-policy"
                    className="text-gray-400 hover:text-purple-400 transition"
                  >
                    Shipping & Delivery
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <span className="text-purple-400 font-semibold">
                  Sonic Industries
                </span>
                . All rights reserved.
              </p>
              <div className="flex gap-4 text-xs text-gray-400">
                <Link
                  href="/RazorpayPages/privacy-policy"
                  className="hover:text-purple-400 transition"
                >
                  Privacy
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/terms-and-conditions"
                  className="hover:text-purple-400 transition"
                >
                  Terms
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/refund-policy"
                  className="hover:text-purple-400 transition"
                >
                  Refunds
                </Link>
                <span>•</span>
                <Link
                  href="/RazorpayPages/shipping-policy"
                  className="hover:text-purple-400 transition"
                >
                  Shipping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
