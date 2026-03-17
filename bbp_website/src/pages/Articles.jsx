import React, { useState } from "react";
import { motion } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import articlesData from "../data/articles.json";

const categories = [
  { name: "All Categories", count: 24 },
  { name: "Unang Lipad", count: 8 },
  { name: "Visa Guides", count: 16 },
  { name: "Travel Tips", count: 6 },
  { name: "Destination Guides", count: 10 },
  { name: "Requirements", count: 5 },
];

const Articles = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const filteredArticles = articlesData.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
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
              <i className="ri-article-line text-3xl"></i>
            </div>
            <div>
              <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl text-[#1f4e79] mb-2 tracking-tight">
                All Articles
              </h1>
              <p className="text-lg text-dark/70 font-medium">
                Browse our latest guides, travel tips, and resources.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mb-10"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl flex items-center px-6 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white focus-within:ring-4 focus-within:ring-[#59b9f6]/20 focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-[#59b9f6] text-xl mr-3"></i>
            <input
              type="text"
              placeholder="Search Articles"
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Layout */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Articles List */}
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
            className="flex-1 space-y-6"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                  key={article.id}
                  className="group relative bg-white/60 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_20px_40px_rgba(89,185,246,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 overflow-hidden"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary-light to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="w-full md:w-[240px] h-[180px] md:h-auto rounded-xl bg-gray-100/50 flex-shrink-0 flex items-center justify-center border border-gray-200/50">
                    <i className="ri-image-line text-5xl text-gray-300"></i>
                  </div>

                  <div className="flex flex-col flex-1 py-1">
                    <h2 className="font-poppins font-extrabold text-2xl text-dark leading-snug mb-3 group-hover:text-[#1f4e79] transition-colors">
                      {article.title}
                    </h2>
                    <p className="font-manrope text-dark/70 text-sm leading-relaxed mb-4 flex-grow">
                      {article.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-4 border-t border-gray-100/50">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIdx) => (
                           <span key={tagIdx} className="px-3 py-1 bg-[#f0f7ff] text-[#1f4e79] rounded-lg text-xs font-bold font-poppins tracking-wide border border-[#e1effe]">
                             #{tag}
                           </span>
                        ))}
                      </div>

                      <a
                        href={article.link}
                        className="inline-flex items-center text-[#59b9f6] hover:text-primary-dark font-poppins font-bold text-sm transition-colors"
                      >
                        Read Post
                        <i className="ri-arrow-right-line ml-1 group-hover:translate-x-1.5 transition-transform"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
               <div className="py-16 text-center bg-white/40 rounded-3xl border border-white shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                  <i className="ri-file-search-line text-3xl text-muted"></i>
                </div>
                <h3 className="text-xl font-poppins font-bold text-dark mb-2">No articles found</h3>
                <p className="text-muted font-medium">
                  No articles matched "{searchQuery}".
                </p>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-[320px] flex-shrink-0"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white sticky top-6">
              <h3 className="font-poppins font-extrabold text-xl text-[#1f4e79] mb-5">
                Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-manrope font-semibold text-sm ${
                        activeCategory === cat.name
                          ? "bg-[#59b9f6]/10 text-[#59b9f6] ring-1 ring-[#59b9f6]/20"
                          : "text-dark/70 hover:bg-gray-50 hover:text-dark hover:shadow-sm border border-transparent"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`font-medium px-2 py-0.5 rounded-md ${activeCategory === cat.name ? "bg-white/60" : "bg-gray-100"}`}>
                        {cat.count}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
};

export default Articles;


