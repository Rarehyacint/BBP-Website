import React, { useState } from "react";
import destinationsData from "./data/destinations.json";

const Destinations = ({ destinationName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  // Determine the correct grammar for the subtitle based on destination
  const getDestinationDisplay = (name) => {
    if (name === "Asia" || name === "Europe" || name === "Americas") {
      return name.endsWith("s") ? `the ${name}` : `${name}n`;
    }
    return name;
  };

  // Extract unique countries from the current destination region
  const availableCountriesInRegion = Array.from(new Set(
    destinationsData
      .filter(item => item.tags.includes(destinationName))
      // Assuming the 2nd tag or a specific tag represents the country. Let's filter out general tags like Asia, Europe, Schengen Area, Visa Free, Visa Guide
      .flatMap(item => item.tags.filter(tag => !["Asia", "Europe", "Americas", "Schengen Area", "Visa Free", "Visa Guide"].includes(tag)))
  )).sort();

  const filteredDestinations = destinationsData.filter((article) => {
    // 1. Must match the destination from navbar (e.g., Asia, Europe, Schengen Area)
    const matchesRegion = article.tags.includes(destinationName);
    
    // 2. Must match search string
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.summary.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // 3. Must match country dropdown
    const matchesCountry = selectedCountry === "All Countries" || article.tags.includes(selectedCountry);

    return matchesRegion && matchesSearch && matchesCountry;
  });

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
            <i className="ri-map-pin-line text-4xl text-dark"></i>
          </div>
          <div>
            <h1 className="font-poppins font-extrabold text-4xl text-dark mb-2 tracking-tight">
              {destinationName}
            </h1>
            <p className="text-lg text-dark/70 font-manrope">
              Guides, tips, and visa information for {getDestinationDisplay(destinationName)} destinations
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl">
          <div className="flex-1 bg-white rounded-full flex items-center px-5 py-3 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-[#59b9f6] focus-within:border-[#59b9f6] transition-all">
            <i className="ri-search-line text-muted text-xl mr-3"></i>
            <input
              type="text"
              placeholder="Search Articles about Tourist Visa"
              className="flex-1 w-full bg-transparent outline-none text-dark placeholder-muted/70 font-manrope"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-56">
            <select
              className="w-full bg-white rounded-full px-5 py-3 shadow-sm border border-gray-200 text-dark/70 font-manrope outline-none cursor-pointer appearance-none focus:ring-2 focus:ring-[#59b9f6] focus:border-[#59b9f6] transition-all"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="All Countries">All Countries</option>
              {availableCountriesInRegion.map(country => (
                 <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-5 top-1/2 -translate-y-1/2 text-dark/70 text-lg pointer-events-none"></i>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredDestinations.length > 0 ? (
            filteredDestinations.map((article) => (
              <div
                key={article.id}
              className="bg-[#fcfdfd] rounded-[20px] p-6 shadow-[0px_4px_20px_rgba(89,185,246,0.06)] border-2 border-[#59b9f6]/20 hover:shadow-[0px_8px_30px_rgba(89,185,246,0.15)] hover:border-[#59b9f6]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-0.5 bg-white text-dark/80 border border-gray-300 rounded-full text-[10px] font-bold font-poppins uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h2 className="font-poppins font-extrabold text-[22px] text-dark leading-tight mb-3 pr-4">
                {article.title}
              </h2>

              {/* Summary */}
              <p className="font-manrope text-dark/70 text-[15px] leading-relaxed mb-6 flex-grow border-b border-gray-200 pb-5">
                {article.summary}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-dark/60 text-xs font-manrope font-medium">
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
              No destinations found for {destinationName} {searchQuery && `matching "${searchQuery}"`} {selectedCountry !== "All Countries" && `in ${selectedCountry}`}.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Destinations;
