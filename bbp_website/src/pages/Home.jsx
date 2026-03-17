import React, { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const popularDestinations = [
  "Japan",
  "South Korea",
  "France",
  "UAE",
  "Singapore",
  "Australia",
];

const browseVisaTypes = [
  { name: "Tourist Visa", icon: "ri-plane-fill" },
  { name: "Student Visa", icon: "ri-graduation-cap-line" },
  { name: "Digital Nomad Visa", icon: "ri-macbook-line" },
  { name: "Family Reunification Visa", icon: "ri-group-line" },
  { name: "Retirement", icon: "ri-home-5-line" },
];

const popularGuides = [
  { country: "Japan", passport: "PH Passport" },
  { country: "Schengen", passport: null },
  { country: "South Korea", passport: "PH Passport" },
  { country: "Canada", passport: null },
  { country: "Australia", passport: null },
  { country: "USA", passport: null },
];

const recentUpdates = [
  {
    title: "Japan visa processing delays – Feb 2026",
    date: "Feb 2, 2026",
    desc: "Embassy announces extended processing times due to increased applications.",
  },
  {
    title: "Schengen appointment backlog update",
    date: "Jan 30, 2026",
    desc: "VFS Global implements new scheduling system to reduce wait times.",
  },
  {
    title: "PH immigration advisory – new rules",
    date: "Jan 28, 2026",
    desc: "BI announces updated travel requirements for Filipino citizens.",
  },
];

const servicesList = [
  { name: "Tourist Visa Assistance", note: "Category level only", icon: "ri-flight-takeoff-line" },
  { name: "Student Visa Assistance", note: "Category level only", icon: "ri-graduation-cap-line" },
  { name: "Document Review", note: "Category level only", icon: "ri-file-search-line" },
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

export default function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/visas?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="bg-[#f8fbfe] text-dark font-manrope min-h-screen selection:bg-primary-light selection:text-white">
      <SiteHeader variant="light" />

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden flex flex-col items-center text-center">
        {/* Abstract Background Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#59b9f6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[#1f4e79]/10 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-poppins font-extrabold text-5xl md:text-7xl tracking-tight text-[#1f4e79] mb-6 leading-tight">
            Explore the World with a <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#59b9f6] to-[#1f4e79]">
              Philippine Passport
            </span>
          </h1>
          <p className="text-lg md:text-xl text-dark/70 max-w-2xl mx-auto mb-10 font-medium">
            Your definitive guide to tourist visas, digital nomad routes, and documentation required for Filipinos.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#59b9f6] to-[#1f4e79] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-full shadow-lg p-2 md:p-3 border border-white flex items-center transition-all focus-within:ring-4 focus-within:ring-[#59b9f6]/20">
              <i className="ri-search-line text-[#59b9f6] text-2xl ml-4 mr-3"></i>
              <input
                type="text"
                placeholder="Search destination, visa type, or country..."
                className="w-full bg-transparent outline-none text-dark placeholder-muted/60 text-lg py-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="hidden md:block bg-[#1f4e79] hover:bg-[#153a5b] text-white px-8 py-3 rounded-full font-poppins font-bold transition-transform hover:scale-105 active:scale-95">
                Search
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Popular Destinations */}
      <motion.section 
        className="px-6 py-12 max-w-7xl mx-auto relative z-10"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="font-poppins font-extrabold text-3xl text-dark mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#59b9f6]/10 flex items-center justify-center text-[#59b9f6]">
            <i className="ri-flight-takeoff-line"></i>
          </span>
          Top Destinations
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
          {popularDestinations.map((place) => (
            <Link
              to={`/destinations/${encodeURIComponent(place)}`}
              key={place}
              className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm text-dark font-semibold hover:border-[#59b9f6] hover:shadow-md hover:text-[#1f4e79] hover:-translate-y-1 transition-all duration-300"
            >
              {place}
            </Link>
          ))}
        </motion.div>
      </motion.section>

      {/* Browse by Visa Type */}
      <motion.section 
        className="px-6 py-16 max-w-7xl mx-auto"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
           <h2 className="font-poppins font-extrabold text-3xl text-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#59b9f6]/10 flex items-center justify-center text-[#59b9f6]">
              <i className="ri-passport-line"></i>
            </span>
             Visa Types
           </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {browseVisaTypes.map((visa, idx) => (
            <motion.div key={visa.name} variants={itemVariants}>
              <Link
                to={`/visas/${encodeURIComponent(visa.name)}`}
                className="group bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#59b9f6]/30 flex flex-col items-center justify-center text-center h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(89,185,246,0.12)] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f0f7fb] group-hover:bg-[#59b9f6] group-hover:text-white text-[#1f4e79] flex items-center justify-center mb-5 transition-colors duration-300">
                  <i className={`${visa.icon} text-3xl`}></i>
                </div>
                <span className="font-poppins font-bold text-[15px] text-dark leading-tight">{visa.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Unang Lipad – First Time Travelers */}
      <motion.section 
        className="px-6 py-12 max-w-7xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden bg-[#1f4e79] rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-[#59b9f6] to-transparent opacity-20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-6">
                <i className="ri-plane-line text-[#59b9f6]"></i> New to traveling?
              </div>
              <h2 className="font-poppins font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
                Unang Lipad
              </h2>
              <p className="text-lg text-white/80 font-medium mb-8 leading-relaxed">
                Step-by-step guidance for first-time Filipino travelers. Clear Immigration basics, required documents, and what to expect at the airport.
              </p>
              <Link to="/articles" className="inline-flex items-center justify-center bg-white text-[#1f4e79] hover:bg-[#59b9f6] hover:text-white px-8 py-3.5 rounded-full font-poppins font-bold transition-colors">
                Start Reading <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
            
            <div className="hidden md:flex w-48 h-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] items-center justify-center -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <i className="ri-passport-fill text-[6rem] text-white opacity-90 drop-shadow-xl"></i>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Two-Column Guides & Updates */}
      <section className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Popular Tourist Visa Guides */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}>
          <h2 className="font-poppins font-extrabold text-2xl text-dark mb-6 flex items-center gap-3">
            <i className="ri-guide-fill text-[#59b9f6]"></i> Top Visa Guides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularGuides.map((guide) => (
              <motion.div key={guide.country} variants={itemVariants}>
                <Link
                  to={`/destinations/${encodeURIComponent(guide.country)}`}
                  className="group block bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:border-[#59b9f6]/40 hover:shadow-lg transition-all"
                >
                  <h3 className="font-poppins font-bold text-lg text-dark flex items-center justify-between">
                    <span className="flex items-center gap-2 group-hover:text-[#1f4e79] transition-colors">
                      <i className="ri-map-pin-2-fill text-[#59b9f6]"></i> {guide.country}
                    </span>
                    <i className="ri-arrow-right-line opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#59b9f6]"></i>
                  </h3>
                  {guide.passport && (
                    <p className="text-sm font-medium text-muted mt-2 ml-7 bg-gray-50 inline-block px-2 py-0.5 rounded-md">
                      {guide.passport}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Updates */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}>
          <h2 className="font-poppins font-extrabold text-2xl text-dark mb-6 flex items-center gap-3">
            <i className="ri-notification-3-fill text-[#59b9f6]"></i> Recent Updates
          </h2>
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 md:p-8">
            <div className="space-y-6">
              {recentUpdates.map((update, idx) => (
                <motion.div key={idx} variants={itemVariants} className="group relative pl-6 border-l-2 border-gray-100 hover:border-[#59b9f6] transition-colors">
                  <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gray-200 group-hover:bg-[#59b9f6] transition-colors" />
                  <p className="text-xs font-bold text-[#59b9f6] tracking-wider uppercase mb-1">{update.date}</p>
                  <h4 className="font-poppins font-bold text-lg text-[#1f4e79] leading-snug mb-2 group-hover:underline decoration-[#59b9f6]/30 underline-offset-4">{update.title}</h4>
                  <p className="text-[15px] text-muted leading-relaxed line-clamp-2">{update.desc}</p>
                </motion.div>
              ))}
            </div>
            <Link to="/news" className="block mt-6 text-center text-sm font-bold text-[#59b9f6] hover:text-[#1f4e79] transition-colors">
              View all updates &rarr;
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <motion.section 
        className="px-6 py-16 max-w-7xl mx-auto"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}
      >
        <h2 className="font-poppins font-extrabold text-3xl text-dark text-center mb-10">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesList.map((service, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <div className="group bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#1f4e79]/20 transition-all flex flex-col items-center text-center hover:-translate-y-2">
                <div className="w-16 h-16 bg-[#f0f7fb] group-hover:bg-[#1f4e79] rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                  <i className={`${service.icon} text-3xl text-[#1f4e79] group-hover:text-white`}></i>
                </div>
                <h3 className="font-poppins font-bold text-xl text-dark mb-3">{service.name}</h3>
                <p className="text-sm font-medium text-muted bg-gray-50 px-3 py-1 rounded-full">{service.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Modern Footer */}
      <footer className="bg-[#1f4e79] mt-12 py-12 rounded-t-[3rem] text-white/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-poppins font-extrabold text-2xl tracking-tighter text-white">
            BYEBYEPINAS
          </div>
          <p className="font-manrope font-medium text-sm text-center">
            © {new Date().getFullYear()} BYEBYEPINAS. Visa guidance for Filipinos.
          </p>
          <div className="flex gap-4">
             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#59b9f6] hover:text-white transition-colors"><i className="ri-facebook-fill text-xl"></i></a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#59b9f6] hover:text-white transition-colors"><i className="ri-instagram-line text-xl"></i></a>
             <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#59b9f6] hover:text-white transition-colors"><i className="ri-twitter-x-line text-xl"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

