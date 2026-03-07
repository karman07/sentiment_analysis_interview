"use client";

import Navbar from "./components/Navbar";
import { useState } from "react";
import { Globe, Smartphone, Cloud, Palette, Wrench, TrendingUp, CheckCircle, ArrowRight, Send, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus("success");
    setIsSubmitting(false);
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-400 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-[rgb(0,122,204)]/20">
            <span className="text-[rgb(0,122,204)] dark:text-[rgb(0,122,204)] font-semibold text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Professional Digital Solutions
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgb(20,48,120)] via-[rgb(0,122,204)] to-[rgb(126,58,168)]">
              Ryntra Tech
            </span>
            <br />
            <span className="text-gray-800 dark:text-gray-100">Private Ltd</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-200 mb-6 font-semibold">
            Building Digital Excellence Through Innovation
          </p>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            We transform ideas into powerful digital solutions. From stunning websites to cutting-edge mobile applications, we deliver excellence that drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="inline-flex items-center bg-gradient-to-r from-[rgb(20,48,120)] to-[rgb(0,122,204)] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center bg-white dark:bg-gray-800 text-[rgb(20,48,120)] dark:text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-[rgb(0,122,204)] dark:border-gray-700"
            >
              Explore Services
            </a>
          </div>
        </div>
      </section>

            <section className="py-32 px-4 bg-gray-50 dark:bg-gray-800/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-4 px-6 py-2 bg-[rgb(var(--color-primary-light))]/10 rounded-full border border-[rgb(var(--color-primary-light))]/30">
              <span className="text-[rgb(var(--color-primary-light))] font-semibold text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                OUR VENTURES
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our Startups
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Innovation is in our DNA. We're building the future with our own ventures that are transforming industries.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* dine3D */}
            <div className="group relative overflow-hidden bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] hover:-translate-y-2">
              <div className="flex items-start justify-between mb-6">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center p-4">
                  <Image src="/dine3d.png" alt="dine3D" width={80} height={80} className="object-contain" />
                </div>
                <a 
                  href="https://dine3d.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[rgb(var(--color-primary-light))]/10 hover:bg-[rgb(var(--color-primary-light))]/20 rounded-xl transition-all"
                  aria-label="Visit dine3D website"
                >
                  <ExternalLink className="w-5 h-5 text-[rgb(var(--color-primary-light))]" />
                </a>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                dine3D
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Revolutionizing the dining experience with immersive 3D restaurant visualization and interactive menu exploration. Experience your meal before you order.
              </p>
              
              <a 
                href="https://labracca.dine3d.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--color-primary-light))] hover:bg-[rgb(var(--color-primary))] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg mb-6"
              >
                View Demo
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">3D Visualization</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">AR/VR</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">Food Tech</span>
              </div>
            </div>

            {/* AI for Job */}
            <div className="group relative overflow-hidden bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] hover:-translate-y-2">
              <div className="flex items-start justify-between mb-6">
                <div className="w-28 h-28 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center p-4">
                  <Image src="/aiforjob.png" alt="AI for Job" width={80} height={80} className="object-contain" />
                </div>
                <a 
                  href="https://aiforjob.ai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2.5 bg-[rgb(var(--color-primary-light))]/10 hover:bg-[rgb(var(--color-primary-light))]/20 rounded-xl transition-all"
                  aria-label="Visit AI for Job website"
                >
                  <ExternalLink className="w-5 h-5 text-[rgb(var(--color-primary-light))]" />
                </a>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                AI for Job
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Empowering job seekers with AI-driven career matching, resume optimization, and intelligent job recommendations. Your AI-powered career companion.
              </p>
              
              <a 
                href="https://aiforjob.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--color-primary-light))] hover:bg-[rgb(var(--color-primary))] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg mb-6"
              >
                Visit Website
                <ExternalLink className="w-4 h-4" />
              </a>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">AI/ML</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">Career Tech</span>
                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">Automation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Web Development */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <Globe className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Web Development
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Custom websites built with modern technologies. Responsive, fast, and SEO-optimized to help your business grow online.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">React</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Next.js</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">TypeScript</span>
              </div>
            </div>

            {/* Mobile Apps */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <Smartphone className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Mobile Apps
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Native and cross-platform mobile applications for iOS and Android. Intuitive interfaces with powerful functionality.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">React Native</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Flutter</span>
              </div>
            </div>

            {/* Cloud Solutions */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <Cloud className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Cloud Solutions
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Scalable cloud infrastructure and deployment. Secure, reliable, and optimized for performance and cost efficiency.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">AWS</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Azure</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">GCP</span>
              </div>
            </div>

            {/* UI/UX Design */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <Palette className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                UI/UX Design
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Beautiful, user-centered designs that engage and convert. From wireframes to high-fidelity prototypes.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Figma</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Adobe XD</span>
              </div>
            </div>

            {/* Maintenance & Support */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <Wrench className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Maintenance & Support
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ongoing support and maintenance to keep your applications running smoothly. Updates, bug fixes, and enhancements.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Digital Strategy */}
            <div className="group p-8 bg-white dark:bg-gray-800/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-gray-200 dark:border-gray-700 hover:border-[rgb(var(--color-primary-light))] dark:hover:border-[rgb(var(--color-primary-light))]">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <TrendingUp className="w-12 h-12 text-[rgb(var(--color-primary-light))]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Digital Strategy
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Strategic consulting to align technology with your business goals. Planning, execution, and growth optimization.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Consulting</span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Ryntra Tech?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your trusted partner in digital transformation
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Excellence in Every Project
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-lg">
                  At Ryntra Tech Private Ltd, we're passionate about creating digital solutions that make a difference. Our team of experienced developers, designers, and strategists work together to deliver projects that exceed expectations.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(var(--color-primary-light))] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Expert Team</h4>
                      <p className="text-gray-700 dark:text-gray-200">Years of industry experience across multiple domains</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(var(--color-primary-light))] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Modern Technologies</h4>
                      <p className="text-gray-700 dark:text-gray-200">Cutting-edge tools and best practices in development</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(var(--color-primary-light))] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Transparent Communication</h4>
                      <p className="text-gray-700 dark:text-gray-200">Clear updates throughout your project lifecycle</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start group">
                    <div className="flex-shrink-0 w-8 h-8 bg-[rgb(var(--color-primary-light))] rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">On-Time Delivery</h4>
                      <p className="text-gray-700 dark:text-gray-200">Budget-friendly solutions delivered when promised</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Our Approach</h3>
              <div className="space-y-6">
                <div className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[rgb(var(--color-primary-light))] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Discovery Phase</h4>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">Deep dive into your vision, requirements, and business objectives to create a solid foundation.</p>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[rgb(var(--color-primary-light))] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Design & Planning</h4>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">Creating intuitive, engaging experiences with detailed wireframes and prototypes.</p>
                </div>
                
                <div className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-600">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[rgb(var(--color-primary-light))] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Development</h4>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">Building robust, scalable solutions with clean code and best practices.</p>
                </div>
                
                <div className="relative pl-8">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-[rgb(var(--color-primary-light))] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <h4 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Launch & Support</h4>
                  <p className="text-gray-700 dark:text-gray-200 leading-relaxed">Smooth deployment and ongoing support to ensure your continued success.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-white dark:bg-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20"></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to start your project? Let's discuss how we can help bring your vision to life.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-[rgb(var(--color-success))]/10 dark:bg-[rgb(var(--color-success))]/20 border border-[rgb(var(--color-success))]/30 rounded-xl flex items-center">
                <CheckCircle className="w-6 h-6 text-[rgb(var(--color-success))] mr-3" />
                <p className="text-[rgb(var(--color-success))] dark:text-[rgb(var(--color-success))] font-medium">Thank you! We'll get back to you soon.</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 mb-2 font-semibold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-800 dark:text-gray-200 mb-2 font-semibold">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2 font-semibold">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2 font-semibold">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project and requirements..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[rgb(20,48,120)] to-[rgb(0,122,204)] hover:opacity-90 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
            
            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[rgb(var(--color-primary-light))]/10 dark:bg-[rgb(var(--color-primary-light))]/20 rounded-full flex items-center justify-center mb-3">
                    <Mail className="w-6 h-6 text-[rgb(var(--color-primary-light))]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h4>
                  <a href="mailto:karmansingharora01@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-[rgb(var(--color-primary-light))] dark:hover:text-[rgb(var(--color-primary-light))] transition-colors">karmansingharora01@gmail.com</a>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[rgb(var(--color-primary-light))]/10 dark:bg-[rgb(var(--color-primary-light))]/20 rounded-full flex items-center justify-center mb-3">
                    <Phone className="w-6 h-6 text-[rgb(var(--color-primary-light))]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Call Us</h4>
                  <a href="tel:+918813947793" className="text-gray-600 dark:text-gray-400 hover:text-[rgb(var(--color-primary-light))] dark:hover:text-[rgb(var(--color-primary-light))] transition-colors">+91 88139 47793</a>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[rgb(var(--color-primary-light))]/10 dark:bg-[rgb(var(--color-primary-light))]/20 rounded-full flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-[rgb(var(--color-primary-light))]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Visit Us</h4>
                  <p className="text-gray-600 dark:text-gray-400">Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Startups Section */}

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-black dark:from-black dark:via-gray-950 dark:to-black text-white py-16 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[rgb(0,122,204)] to-[rgb(126,58,168)]">
                Ryntra Tech
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
                Building the future, one line of code at a time. We craft digital experiences that make a difference.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all transform hover:scale-110">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-blue-400 transition">Home</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-blue-400 transition">Services</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-blue-400 transition">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-blue-400 transition">Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-3">
                <li><span className="text-gray-400">Web Development</span></li>
                <li><span className="text-gray-400">Mobile Apps</span></li>
                <li><span className="text-gray-400">Cloud Solutions</span></li>
                <li><span className="text-gray-400">UI/UX Design</span></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2026 Ryntra Tech Private Ltd. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
