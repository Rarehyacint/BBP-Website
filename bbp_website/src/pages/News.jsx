import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import newsData from "../data/news.json";

const NewsCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(89,185,246,0.12)] transition-all duration-300 w-full mb-6 cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="font-poppins font-extrabold text-xl md:text-2xl text-dark leading-snug group-hover:text-primary-dark transition-colors pr-8">
          {item.title}
        </h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-[#f0f7ff] text-[#59b9f6] flex items-center justify-center"
        >
          <i className="ri-arrow-down-s-line text-lg"></i>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2">
              <p className="font-manrope text-dark/80 text-sm md:text-[15px] leading-relaxed">
                {item.content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-4 pt-4 border-t border-gray-100/50">
        <div className="flex items-center gap-2 text-primary-dark font-poppins font-semibold text-sm">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#10b981] flex items-center justify-center">
             <div className="w-1 h-1 bg-[#10b981] rounded-full"></div>
          </div>
          {item.status}
        </div>
        <div className="flex items-center gap-1.5 text-muted font-manrope text-sm font-medium">
          <i className="ri-map-pin-line"></i>
          {item.location}
        </div>
        <div className="flex items-center gap-1.5 text-muted font-manrope text-sm font-medium ml-auto">
          <i className="ri-calendar-line"></i>
          {item.date}
        </div>
      </div>
    </motion.div>
  );
};

const News = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = newsData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-soft text-dark font-manrope">
      <SiteHeader />
      
      <main className="relative pt-6 pb-20 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group inline-flex items-center text-sm font-poppins font-semibold text-primary-dark hover:text-[#59b9f6] transition-colors mb-8 cursor-pointer bg-white/60 backdrop-blur-xl px-4 py-2 rounded-full shadow-sm border border-white/80"
        >
          <i className="ri-arrow-left-line text-lg mr-2 group-hover:-translate-x-1 transition-transform"></i>
          Back
        </button>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-6 md:items-end justify-between mb-12"
        >
          <div className="flex items-start gap-5">
            <div className="mt-1 h-14 w-14 rounded-2xl bg-gradient-to-tr from-primary-dark to-primary-light flex items-center justify-center text-white shadow-lg shadow-primary-dark/20">
              <i className="ri-notification-3-line text-3xl"></i>
            </div>
            <div>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl text-[#1f4e79] mb-2 tracking-tight">
                News & Updates
              </h1>
              <p className="text-lg text-dark/70 font-medium">
                Latest news, policy changes, and travel advisories.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl flex items-center px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white focus-within:ring-4 focus-within:ring-[#59b9f6]/20 focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-[#59b9f6] text-xl mr-3"></i>
            <input
              type="text"
              placeholder="Search News & Advisories"
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* News List */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          className="w-full"
        >
          {filteredNews.length > 0 ? (
            filteredNews.map((item) => (
              <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <NewsCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="py-16 text-center bg-white/40 rounded-3xl border border-white shadow-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                <i className="ri-file-search-line text-3xl text-muted"></i>
              </div>
              <h3 className="text-xl font-poppins font-bold text-dark mb-2">No news found</h3>
              <p className="text-muted font-medium">
                No articles matched "{searchQuery}".
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default News;


