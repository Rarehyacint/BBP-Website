import React, { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "../components/SiteHeader";

const servicesData = [
  {
    id: 1,
    title: "Tourist Visa Assistance",
    description: "Get guidance and support for your tourist visa application across multiple countries.",
    icon: "ri-flight-takeoff-line",
    category: "Visa Services",
  },
  {
    id: 2,
    title: "Student Visa Assistance",
    description: "Complete support for student visa applications and educational journey planning.",
    icon: "ri-graduation-cap-line",
    category: "Visa Services",
  },
  {
    id: 3,
    title: "Document Review",
    description: "Professional review and verification of your visa application documents.",
    icon: "ri-file-search-line",
    category: "Consultation",
  },
  {
    id: 4,
    title: "Visa Consultation",
    description: "Expert consultation to determine the best visa option for your travel needs.",
    icon: "ri-chat-3-line",
    category: "Consultation",
  },
  {
    id: 5,
    title: "Requirements Guide",
    description: "Complete checklist and guide for visa requirements by country and visa type.",
    icon: "ri-list-check-line",
    category: "Resources",
  },
  {
    id: 6,
    title: "Travel Planning",
    description: "Plan your journey with destination guides and travel tips from experts.",
    icon: "ri-map-pin-line",
    category: "Resources",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Services({ onBack }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const categories = [
    "All Services",
    "Visa Services",
    "Consultation",
    "Resources"
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Services" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background-soft text-dark font-manrope">
      <SiteHeader />
      
      <main className="relative pt-6 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="group inline-flex items-center text-sm font-poppins font-semibold text-primary-dark hover:text-[#59b9f6] transition-colors mb-8 cursor-pointer bg-white/60 backdrop-blur-xl px-4 py-2 rounded-full shadow-sm border border-white/80"
          >
            <i className="ri-arrow-left-line text-lg mr-2 group-hover:-translate-x-1 transition-transform"></i>
            Back
          </button>
        )}

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6 md:items-end justify-between mb-12"
        >
          <div className="flex items-start gap-5">
            <div className="mt-1 h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary-dark to-primary-light flex items-center justify-center text-white shadow-lg shadow-primary-dark/20">
              <i className="ri-service-line text-3xl"></i>
            </div>
            <div>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl text-[#1f4e79] mb-2 tracking-tight">
                Our Services
              </h1>
              <p className="text-lg text-dark/70 font-medium">
                Explore our comprehensive visa and travel services.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl"
        >
          <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl flex items-center px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white focus-within:ring-4 focus-within:ring-[#59b9f6]/20 focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-[#59b9f6] text-xl mr-3"></i>
            <input
              type="text"
              placeholder="Search services..."
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-64">
            <select
              className="w-full h-full bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white text-dark font-medium outline-none cursor-pointer appearance-none hover:border-[#59b9f6]/50 focus:ring-4 focus:ring-[#59b9f6]/20 focus:border-[#59b9f6] transition-all"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-5 top-1/2 -translate-y-1/2 text-[#59b9f6] text-xl pointer-events-none"></i>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <motion.div
                variants={itemVariants}
                key={service.id}
                className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(89,185,246,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-light to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-[#59b9f6]/20 to-[#1f4e79]/20 flex items-center justify-center text-primary-dark mb-6 group-hover:bg-gradient-to-tr group-hover:from-[#59b9f6]/30 group-hover:to-[#1f4e79]/30 transition-all">
                  <i className={`${service.icon} text-3xl`}></i>
                </div>

                <h3 className="font-poppins font-extrabold text-xl text-dark leading-snug mb-3 group-hover:text-[#1f4e79] transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-manrope text-dark/70 text-sm leading-relaxed flex-grow mb-4">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100/50">
                  <span className="text-xs font-poppins font-bold text-[#59b9f6] bg-[#f0f7ff] px-3 py-1 rounded-lg border border-[#e1effe]">
                    {service.category}
                  </span>
                  <button className="inline-flex items-center text-[#59b9f6] hover:text-primary-dark font-poppins font-bold text-sm transition-colors group-hover:translate-x-1.5 transition-transform">
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>

                <div className="absolute top-0 right-0 -z-10 w-24 h-24 rounded-full bg-primary-light/5 blur-2xl group-hover:bg-primary-light/10 transition-all"></div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white/40 rounded-3xl border border-white shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                <i className="ri-search-eye-off-line text-3xl text-muted"></i>
              </div>
              <h3 className="text-xl font-poppins font-bold text-dark mb-2">No services found</h3>
              <p className="text-muted font-medium">
                No services matched your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
