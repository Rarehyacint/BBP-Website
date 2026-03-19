import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import visasData from "../data/visas.json";

const VisaTypePage = ({ visaName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getIcon = (name) => {
    switch (name) {
      case "Tourist Visa": return "ri-plane-fill";
      case "Study Visa": return "ri-graduation-cap-line";
      case "Digital Nomad Visa": return "ri-macbook-line";
      case "Family Reunification": return "ri-group-line";
      case "Retirement": return "ri-home-5-line";
      default: return "ri-passport-line";
    }
  };

  const filteredVisas = visasData.filter((article) => {
    const matchesVisa = article.tags.includes(visaName);
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVisa && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background-soft text-dark font-manrope">
      <SiteHeader />

      <main className="relative pt-6 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
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
              <i className={`${getIcon(visaName)} text-3xl`}></i>
            </div>
            <div>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl text-[#1f4e79] mb-2 tracking-tight">
                {visaName}
              </h1>
              <p className="text-lg text-dark/70 font-medium">
                Our latest guides, requirements, and tips for {visaName}.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mb-12"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl flex items-center px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white focus-within:ring-4 focus-within:ring-[#59b9f6]/20 focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-[#59b9f6] text-xl mr-3"></i>
            <input
              type="text"
              placeholder={`Search Articles about ${visaName}`}
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredVisas.length > 0 ? (
            filteredVisas.map((article) => (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                key={article.id}
                className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(89,185,246,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-light to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {article.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 bg-[#f0f7ff] text-[#1f4e79] rounded-lg text-xs font-bold font-poppins uppercase tracking-wide border border-[#e1effe]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h2 className="font-poppins font-extrabold text-xl text-dark leading-snug mb-3 group-hover:text-[#1f4e79] transition-colors">
                  {article.title}
                </h2>

                <p className="font-manrope text-dark/70 text-sm leading-relaxed mb-6 flex-grow">
                  {article.summary}
                </p>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100/50">
                  <span className="text-muted text-xs font-manrope font-semibold flex items-center gap-1.5">
                    <i className="ri-calendar-line"></i> {article.date}
                  </span>
                  <Link
                    to={`/articles/${article.id}`}
                    className="inline-flex items-center text-[#59b9f6] hover:text-primary-dark font-poppins font-bold text-sm transition-colors"
                  >
                    Read
                    <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1.5 transition-transform"></i>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                <i className="ri-file-search-line text-3xl text-muted"></i>
              </div>
              <h3 className="text-xl font-poppins font-bold text-dark mb-2">No articles found</h3>
              <p className="text-muted font-medium">
                No articles found for {visaName} {searchQuery && `matching "${searchQuery}"`}.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default VisaTypePage;


