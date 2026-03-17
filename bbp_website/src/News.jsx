import React, { useState } from "react";
import newsData from "./data/news.json";

const NewsCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#fcfdfd] rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(89,185,246,0.06)] border-2 border-[#59b9f6]/20 hover:border-[#59b9f6]/40 hover:shadow-[0px_8px_30px_rgba(89,185,246,0.15)] transition-all duration-300 w-full mb-6 relative">
      <div 
        className="flex items-start justify-between gap-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="font-poppins font-extrabold text-[20px] md:text-[22px] text-dark leading-tight pr-8">
          {item.title}
        </h2>
        <span className="text-dark/60 text-xs font-manrope font-medium mt-1 shrink-0 hover:text-primary-dark transition-colors">
          {isExpanded ? "Click to Collapse" : "Click to Expand"}
        </span>
      </div>
      
      {isExpanded ? (
        <div className="mt-4 animate-fadeIn">
          <div className="flex items-center gap-2 text-dark/70 text-sm font-manrope font-medium mb-3">
            <i className="ri-calendar-line"></i>
            {item.date}
          </div>
          <p className="font-manrope text-dark/80 text-[15px] leading-relaxed mb-6">
            {item.content}
          </p>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-2 text-dark/70 text-sm font-manrope font-medium mb-3">
            <i className="ri-calendar-line"></i>
            {item.date}
        </div>
      )}
      
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-100/80">
        <div className="flex items-center gap-2 text-dark font-poppins font-semibold text-sm">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-[#10b981] flex items-center justify-center">
             <div className="w-1 h-1 bg-[#10b981] rounded-full"></div>
          </div>
          {item.status}
        </div>
        <div className="flex items-center gap-1.5 text-dark/70 font-manrope text-sm">
          <i className="ri-map-pin-line"></i>
          {item.location}
        </div>
      </div>
    </div>
  );
};

const News = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#f0f7fb] min-h-screen pb-16">
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
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
            <i className="ri-notification-3-line text-4xl text-dark"></i>
          </div>
          <div>
            <h1 className="font-poppins font-extrabold text-4xl text-dark mb-2 tracking-tight">
              News & Updates
            </h1>
            <p className="text-lg text-dark/70 font-manrope">
              Latest news, policy changes, and travel advisories for Filipino travelers
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-10">
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

        {/* News List */}
        <div className="w-full">
          {newsData.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
