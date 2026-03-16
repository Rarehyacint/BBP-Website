import React, { useState } from "react";
import articlesData from "./data/articles.json";

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

  return (
    <div className="bg-[#f0f7fb] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-sm font-poppins font-semibold text-dark hover:text-accent transition-colors mb-8 cursor-pointer"
        >
          <i className="ri-arrow-left-line text-lg mr-2"></i>
          Back to Home
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-4 mb-8">
          <div className="mt-1">
            <i className="ri-article-line text-4xl text-dark"></i>
          </div>
          <div>
            <h1 className="font-poppins font-extrabold text-4xl text-dark mb-2 tracking-tight">
              All Articles
            </h1>
            <p className="text-lg text-dark/70 font-manrope">
              Browse all articles, guides, and resources for Filipino travelers
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mb-10">
          <div className="bg-white rounded-full flex items-center px-5 py-3 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-[#59b9f6] focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-muted text-xl mr-3"></i>
            <input
              type="text"
              placeholder="Search Articles"
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-manrope"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Grid Layout: Articles List (Left) and Sidebar (Right) */}
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Articles List */}
          <div className="flex-1 space-y-6">
            {articlesData.map((article) => (
              <div
                key={article.id}
                className="bg-[#fcfdfd] rounded-[20px] p-5 shadow-[0px_4px_20px_rgba(89,185,246,0.06)] border-2 border-[#59b9f6]/20 hover:shadow-[0px_8px_30px_rgba(89,185,246,0.15)] hover:border-[#59b9f6]/40 transition-all duration-300 flex flex-col md:flex-row gap-6"
              >
                {/* Image Placeholder */}
                <div className="w-full md:w-[220px] h-[160px] md:h-auto border border-gray-200 rounded-lg flex-shrink-0 bg-white shadow-sm flex items-center justify-center overflow-hidden">
                   <i className="ri-image-line text-4xl text-gray-300"></i>
                </div>
                
                {/* Content */}
                <div className="flex flex-col flex-1 py-1">
                  <h2 className="font-poppins font-extrabold text-[22px] text-dark leading-tight mb-3">
                    {article.title}
                  </h2>
                  <p className="font-manrope text-dark/70 text-[15px] leading-relaxed mb-4 flex-grow">
                    {article.summary}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 text-dark/60 text-xs font-semibold font-poppins">
                      {article.tags.map((tag, tagIdx) => (
                        <span key={tagIdx}>#{tag}</span>
                      ))}
                    </div>
                    
                    <a
                      href={article.link}
                      className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-poppins font-bold text-sm transition-colors group"
                    >
                      <span className="italic mr-1">Read More</span>
                      <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div className="bg-[#fcfdfd] rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(89,185,246,0.06)] border-2 border-[#59b9f6]/20 sticky top-6">
              <h3 className="font-poppins font-extrabold text-[20px] text-dark mb-5 text-center">
                Filter by Category
              </h3>
              <ul className="space-y-1">
                {categories.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => setActiveCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors font-manrope font-semibold text-sm ${
                        activeCategory === cat.name
                          ? "bg-[#59b9f6]/10 text-[#2563eb]"
                          : "text-dark/80 hover:bg-gray-50 hover:text-dark"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-dark/40 font-normal">{cat.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Articles;
