import React, { useState } from "react";
import visasData from "./data/visas.json";

const VisaTypePage = ({ visaName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getIcon = (name) => {
    switch (name) {
      case "Tourist Visa":
        return "ri-plane-fill";
      case "Student Visa":
      case "Study Visa":
        return "ri-graduation-cap-line";
      case "Digital Nomad Visa":
        return "ri-macbook-line";
      case "Family Reunification Visa":
      case "Family Reunification Retirement":
        return "ri-group-line";
      case "Retirement":
        return "ri-home-5-line";
      default:
        return "ri-passport-line";
    }
  };

  const filteredVisas = visasData.filter((article) => {
    // Check if the article has the exact visa tag (or includes the visaName logic if needed)
    const matchesVisa = article.tags.includes(visaName);
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesVisa && matchesSearch;
  });

  return (
    <div className="bg-[#f0f7fb] min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-sm font-poppins font-semibold text-dark hover:text-accent transition-colors mb-8"
        >
          <i className="ri-arrow-left-line text-lg mr-2"></i>
          Back to Home
        </button>

        {/* Header Section */}
        <div className="flex items-start gap-4 mb-8">
          <div className="mt-1">
            <i className={`${getIcon(visaName)} text-4xl text-dark`}></i>
          </div>
          <div>
            <h1 className="font-poppins font-extrabold text-4xl text-dark mb-2 tracking-tight">
              {visaName}
            </h1>
            <p className="text-lg text-dark/70 font-manrope">
              Guides, tips, and visa information for {visaName}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mb-12">
          <div className="bg-white rounded-full flex items-center px-4 py-3 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-[#59b9f6] focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-muted text-xl mr-3"></i>
            <input
              type="text"
              placeholder={`Search Articles about ${visaName}`}
              className="flex-1 bg-transparent outline-none text-dark placeholder-muted/70 font-manrope"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVisas.length > 0 ? (
            filteredVisas.map((article) => (
              <div
                key={article.id}
              className="bg-white rounded-2xl p-6 shadow-[0px_8px_24px_rgba(89,185,246,0.15)] border-2 border-[#59b9f6]/20 hover:border-[#59b9f6]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-2.5 py-1 bg-orange-50/50 text-orange-600 border border-orange-200/60 rounded-md text-[10px] font-bold font-poppins uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-poppins font-bold text-xl text-dark leading-snug mb-3">
                {article.title}
              </h2>

              {/* Summary */}
              <p className="font-manrope text-dark/70 text-sm leading-relaxed mb-6 flex-grow">
                {article.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-muted text-xs font-manrope font-medium">
                  {article.date}
                </span>
                <a
                  href={article.link}
                  className="inline-flex items-center text-[#3b82f6] hover:text-[#2563eb] font-poppins font-semibold text-sm transition-colors group"
                >
                  <span className="italic mr-1">Read More</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-dark/60 font-manrope">
              No articles found for {visaName} {searchQuery && `matching "${searchQuery}"`}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisaTypePage;
