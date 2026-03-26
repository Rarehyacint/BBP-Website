import React, { useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import articlesData from "../data/articles.json";

const FAQItem = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-[#fcfbf6] border border-[#d7d5d0] backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_10px_30px_rgba(89,185,246,0.12)] transition-all duration-300 w-full mb-4 cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-poppins font-extrabold text-lg text-dark leading-snug group-hover:text-[#1f4e79] transition-colors pr-8">
          {item.q}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 w-8 h-8 rounded-full bg-[#f0f7ff] text-[#59b9f6] flex items-center justify-center mt-[-4px]"
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
            <div className="pt-4 mt-3 border-t border-gray-100/50">
              <p className="font-manrope text-dark/70 text-[13px] leading-relaxed">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function ArticleContent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = useMemo(() => {
    return articlesData.find((a) => a.id === id);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background-soft text-dark font-manrope">
        <SiteHeader />
        <main className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl font-poppins font-bold mb-4 text-primary-dark">Article Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#1e4a31] text-white px-8 py-3 rounded-full font-poppins font-bold hover:bg-[#133522] transition-all"
          >
            Go back Home
          </button>
        </main>
      </div>
    );
  }

  // Related articles (mock 3 items from JSON that are NOT the current one)
  const relatedArticles = articlesData.filter((a) => a.id !== id).slice(0, 3);

  const country = article.country || (article.tags && article.tags[0]) || "Philippines";
  
  const continentMap = {
    "Singapore": "Asia",
    "Japan": "Asia",
    "South Korea": "Asia",
    "USA": "North America",
    "United States": "North America",
    "UK": "Europe",
    "United Kingdom": "Europe",
    "Canada": "North America",
    "Australia": "Oceania",
    "New Zealand": "Oceania",
    "France": "Europe",
    "Germany": "Europe",
    "Italy": "Europe",
    "Spain": "Europe",
    "Schengen": "Europe",
    "UAE": "Asia"
  };
  
  const continent = article.continent || continentMap[country] || "Global";

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // 140px offset accounts for both the main SiteHeader and this sticky sub-nav
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#eef6fc] text-dark font-manrope pb-20">
      <SiteHeader />

      {/* Hero Section */}
      <div className="relative bg-[#5a8b6c] text-white pt-16 pb-20 overflow-hidden">
        {/* Placeholder for passport background map */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1f4e79] to-[#59b9f6] opacity-80"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative max-w-7xl mx-auto px-6 z-10"
        >
          <div className="flex items-center gap-2 text-sm font-semibold mb-6 flex-wrap opacity-90">
            <i className="ri-global-line"></i>
            <span>{continent}</span>
            <i className="ri-arrow-right-s-line text-xs drop-shadow-sm font-bold opacity-70"></i>
            <span className="font-bold">
              {country}
            </span>
          </div>

          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl lg:text-5xl mb-4 leading-[1.15] max-w-4xl tracking-tight">
            {article.title}
          </h1>
          <p className="text-lg text-white/90 font-medium mb-8 max-w-3xl leading-relaxed">
            {article.summary}
          </p>

          <div className="flex flex-wrap gap-3">
            {article.tags.map((tag, idx) => (
              <span key={idx} className="bg-[#fcfbf6] text-[#1e1e1e] px-4 py-1.5 rounded-full font-bold text-xs tracking-wide shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sub-Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border-b border-gray-200 bg-[#ffffff] sticky top-[72px] z-40 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-8 py-4 font-bold text-[#1e4a31] text-sm">
            <a href="#overview" onClick={(e) => scrollToSection(e, 'overview')} className="hover:text-primary-dark transition-colors cursor-pointer">About This Visa</a>
            <a href="#eligibility" onClick={(e) => scrollToSection(e, 'eligibility')} className="hover:text-primary-dark transition-colors cursor-pointer">Eligibility</a>
            <a href="#requirements" onClick={(e) => scrollToSection(e, 'requirements')} className="hover:text-primary-dark transition-colors cursor-pointer">Requirements</a>
            <a href="#step-by-step" onClick={(e) => scrollToSection(e, 'step-by-step')} className="hover:text-primary-dark transition-colors cursor-pointer">Step-by-Step Guide</a>
            <a href="#tips-mistakes" onClick={(e) => scrollToSection(e, 'tips-mistakes')} className="hover:text-primary-dark transition-colors cursor-pointer">Tips & Mistakes</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-primary-dark transition-colors cursor-pointer">FAQ</a>
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column (Main Content) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-2/3 space-y-6"
          >

            {/* 1. Overview Box */}
            <div id="overview" className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 sm:p-8 shadow-sm">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-5">Overview</h2>
              <div className="prose prose-lg max-w-none text-dark/80 font-medium leading-[1.7] text-[15px]">
                {article.content ? article.content.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-5">{para}</p>
                )) : (
                  <p className="mb-5">Welcome to this comprehensive guide. Here we cover everything you need to know about navigating the requirements, processes, and essential details to ensure a smooth journey.</p>
                )}
              </div>
            </div>

            {/* 2. Eligibility Box */}
            <div id="eligibility" className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 sm:p-8 shadow-sm">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-5">Eligibility</h2>
              <ul className="list-none space-y-4">
                <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-fill text-[#f5a623] text-xl mt-[-2px]"></i>
                  <span>Must be a citizen of an eligible country with a valid passport (at least 6 months validity).</span>
                </li>
                <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-fill text-[#f5a623] text-xl mt-[-2px]"></i>
                  <span>Must be able to provide proof of sufficient financial means to support the stay.</span>
                </li>
                <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-fill text-[#f5a623] text-xl mt-[-2px]"></i>
                  <span>{article.additionalResources || "Must have a clear purpose of travel, such as a confirmed itinerary, hotel bookings, or official invitation."}</span>
                </li>
              </ul>
            </div>

            {/* 3. Requirements Box */}
            <div id="requirements" className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 sm:p-8 shadow-sm">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-5">Requirements</h2>

              <h3 className="font-bold text-dark mb-3 text-lg">Identification Documents</h3>
              <ul className="list-disc pl-5 space-y-2 text-dark/80 font-medium text-[15px] mb-6">
                <li>Original Passport (with at least 2 blank pages)</li>
                <li>Photocopy of bio-data page and previous visas</li>
                <li>Two (2) recent colored passport-sized photos with white background</li>
              </ul>

              <h3 className="font-bold text-dark mb-3 text-lg">Travel & Financial Documents</h3>
              <ul className="list-disc pl-5 space-y-2 text-dark/80 font-medium text-[15px]">
                <li>Confirmed round-trip flight reservation</li>
                <li>Proof of accommodation (Hotel booking or host invitation)</li>
                <li>Bank certificates and statements spanning the last 6 months</li>
                <li>Certificate of Employment (COE) or Business Registration</li>
              </ul>
            </div>

            {/* 4. Step-by-Step Guide Box */}
            <div id="step-by-step" className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 sm:p-8 shadow-sm">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-5">Step-by-Step Guide</h2>
              <div className="relative pl-3">
                <div className="absolute left-[23px] top-6 bottom-4 w-px bg-[#1e4a31] z-0"></div>
                <ul className="space-y-6 relative z-10 m-0 p-0 list-none">
                  {article.keyTakeaways ? article.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                      <span className="w-6 h-6 rounded-full bg-[#f5a623] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0 shadow-sm border border-[#f5a623]">
                        {idx + 1}
                      </span>
                      <span className="bg-[#fcfbf6] pr-2 pt-0.5">{item}</span>
                    </li>
                  )) : (
                    <>
                      <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                        <span className="w-6 h-6 rounded-full bg-[#f5a623] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0 shadow-sm border border-[#f5a623]">1</span>
                        <span className="bg-[#fcfbf6] pr-2 pt-0.5">Determine your visa type and eligibility</span>
                      </li>
                      <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                        <span className="w-6 h-6 rounded-full bg-[#f5a623] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0 shadow-sm border border-[#f5a623]">2</span>
                        <span className="bg-[#fcfbf6] pr-2 pt-0.5">Gather all necessary supporting documents</span>
                      </li>
                      <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                        <span className="w-6 h-6 rounded-full bg-[#1e4a31] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0 shadow-sm border border-[#1e4a31]">3</span>
                        <span className="bg-[#fcfbf6] pr-2 pt-0.5">Submit application online and pay the processing fee</span>
                      </li>
                      <li className="flex items-start gap-4 text-dark/80 font-medium text-[15px]">
                        <span className="w-6 h-6 rounded-full bg-[#1e4a31] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0 shadow-sm border border-[#1e4a31]">4</span>
                        <span className="bg-[#fcfbf6] pr-2 pt-0.5">Schedule and attend the embassy interview or biometrics appointment</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* 5. Tips & Mistakes Box */}
            <div id="tips-mistakes" className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 sm:p-8 shadow-sm">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-5">Tips & Mistakes</h2>

              <h3 className="font-bold text-dark mb-4 text-lg">What to do?</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-line text-[#1e4a31] text-lg mt-[-1px]"></i>
                  <span>{article.proTip || "Always arrive 15 minutes early to your appointment."}</span>
                </li>
                <li className="flex items-start gap-3 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-line text-[#1e4a31] text-lg mt-[-1px]"></i>
                  <span>Double-check all documents for consistency in dates and names.</span>
                </li>
                <li className="flex items-start gap-3 text-dark/80 font-medium text-[15px]">
                  <i className="ri-checkbox-circle-line text-[#1e4a31] text-lg mt-[-1px]"></i>
                  <span>Keep your proposed itinerary realistic and matching your financial capacity.</span>
                </li>
              </ul>

              <h3 className="font-bold text-dark mb-4 text-lg">Common Mistakes</h3>
              <ul className="list-disc pl-5 space-y-2 text-dark/80 font-medium text-[15px]">
                <li>Missing signatures on application forms</li>
                <li>Booking non-refundable flights or hotels before approval</li>
                <li>Submitting irrelevant or unsolicited information</li>
                <li>Applying too close to the intended travel date</li>
              </ul>
            </div>

            {/* Frequently Asked Questions */}
            {article.faqs && article.faqs.length > 0 && (
              <div id="faq" className="mt-8 pt-6">
                <h2 className="font-poppins font-extrabold text-2xl text-dark mb-6">Frequently Asked Questions - FAQ's</h2>
                <div className="w-full">
                  {article.faqs.map((faq, idx) => (
                    <FAQItem key={idx} item={faq} />
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="mt-12 pt-6">
              <h2 className="font-poppins font-extrabold text-2xl text-dark mb-6">Comments</h2>

              <div className="space-y-5">
                <div className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-5 shadow-sm relative">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-dark text-sm">Maria Santos</h4>
                      <p className="text-[10px] text-muted">February 28, 2026</p>
                    </div>
                    <button className="text-[#136c31] text-[11px] font-bold flex items-center gap-1 hover:underline">
                      <i className="ri-reply-line"></i> Reply
                    </button>
                  </div>
                  <p className="text-[13px] text-dark/80 font-medium">
                    This guide was incredibly helpful! I just received my visa approval after following these steps. The timeline was accurate - took about 15 days. Thanks for the detailed information!
                  </p>
                </div>

                <div className="ml-10 bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-5 shadow-sm relative">
                  <div className="absolute -left-5 top-5 text-[#d7d5d0]">
                    <i className="ri-corner-down-right-line"></i>
                  </div>
                  <div className="text-[10px] text-muted mb-3 flex items-center gap-1">
                    <i className="ri-reply-fill"></i> Juan Dela Cruz replied to Maria Santos
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-bold text-dark text-sm">Juan Dela Cruz</h4>
                      <p className="text-[10px] text-muted">March 1, 2026</p>
                    </div>
                    <button className="text-[#136c31] text-[11px] font-bold flex items-center gap-1 hover:underline">
                      <i className="ri-reply-line"></i> Reply
                    </button>
                  </div>
                  <p className="text-[13px] text-dark/80 font-medium">
                    Congratulations Maria! Did you hire an agency or did you do it yourself? I'm planning to apply next month.
                  </p>
                </div>

                {/* Add a Comment */}
                <div className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-5 shadow-sm mt-6">
                  <h4 className="font-bold text-dark text-[15px] mb-3">Add a Comment</h4>
                  <textarea
                    className="w-full h-20 outline-none resize-none text-[13px] placeholder-gray-400 font-medium"
                    placeholder="Write your comment..."
                  ></textarea>
                  <div className="flex justify-end mt-2">
                    <button className="bg-[#1e4a31] text-white px-6 py-2 rounded-[4px] text-[13px] font-bold shadow-sm hover:bg-[#133522] transition-colors flex items-center gap-2">
                      <i className="ri-send-plane-fill"></i> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="mt-12 bg-gradient-to-b from-[#1f4e79] to-[#59b9f6] rounded-[15px] p-8 md:p-10 text-center text-dark shadow-sm">
              <h2 className="font-poppins font-extrabold text-3xl mb-3 text-[#ffffff]">Need Professional Help?</h2>
              <p className="font-medium text-[#ffffff] mb-6 text-sm max-w-lg mx-auto">
                Can't find the answer you're looking for? Contact our team of experts.
              </p>
              <button
                onClick={() => navigate('/services')}
                className="bg-gradient-to-b from-[#ffffff] to-[#fffce0] text-dark shadow-[0_4px_10px_rgba(0,0,0,0.15)] px-8 py-3 rounded-[2rem] font-bold text-sm hover:bg-white transition-colors"
              >
                Book a Consultation
              </button>
            </div>

          </motion.div>

          {/* Right Column (Sidebar) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/3"
          >
            <div className="sticky top-[140px] space-y-6">

              {/* Quick Facts */}
              {article.quickFacts && (
                <div className="bg-[#fcfbf6] border border-[#d7d5d0] rounded-[15px] p-6 shadow-sm">
                  <h3 className="font-poppins text-[#1e4a31] font-extrabold text-2xl text-dark mb-5">Quick Facts:</h3>

                  <div className="space-y-4">
                    {Object.entries(article.quickFacts).map(([key, value], idx) => (
                      <div key={idx}>
                        <p className="text-[12px] text-dark/60 font-medium mb-0.5">{key}</p>
                        {Array.isArray(value) ? (
                          value.map((v, i) => (
                            <p key={i} className="text-[12px] font-bold text-dark leading-tight mb-1">{v}</p>
                          ))
                        ) : (
                          <p className="text-[13px] font-bold text-dark">{value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Need Professional Help Sidebar */}
              <div className="bg-gradient-to-b from-[#1f4e79] to-[#59b9f6] rounded-[15px] p-6 shadow-sm border border-[#ceb882]">
                <h3 className="font-poppins font-extrabold text-[#ffffff] text-lg mb-2">Need Professional Help?</h3>
                <p className="text-[12px] font-medium text-[#ffffff] leading-relaxed mb-5">
                  Our visa experts can guide you through the entire application process and ensure your success.
                </p>
                <button
                  onClick={() => navigate('/services')}
                  className="w-full bg-gradient-to-b from-[#ffffff] to-[#fffce0] text-dark shadow-[0_2px_8px_rgba(0,0,0,0.1)] py-2 rounded-[2rem] font-bold text-xs hover:bg-white transition-colors mb-5 flex items-center justify-center gap-2"
                >
                  <i className="ri-user-line font-normal"></i> Contact Us
                </button>
                <div className="space-y-2 text-[11px] font-medium text-[#ffffff]">
                  <div className="flex items-start gap-1.5">
                    <i className="ri-phone-line mt-0.5"></i>
                    <span>+63 282313256 (Mon-Fri, 8:00 AM-12:00 PM, 1:30 PM-4:30 PM)</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <i className="ri-mail-line mt-0.5"></i>
                    <span>hello@byebyepinas.com</span>
                  </div>
                </div>
              </div>

              {/* Related Visa Guides */}
              <div>
                <h3 className="font-poppins font-extrabold text-xl text-dark mb-4">Related Visa Guides</h3>
                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <Link to={`/articles/${rel.id}`} key={rel.id} className="block group">
                      <div className="bg-white border border-[#d7d5d0] rounded-[15px] overflow-hidden shadow-sm hover:border-[#136c31]/50 transition-colors">
                        <div className="h-[90px] bg-gradient-to-b from-[#1f4e79] to-[#59b9f6] opacity-90 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-4">
                          <h4 className="font-bold text-[13px] text-dark mb-2 group-hover:text-[#136c31] transition-colors line-clamp-2">
                            {rel.title}
                          </h4>
                          <span className="text-[11px] text-[#136c31] font-medium flex items-center gap-1 uppercase tracking-wide">
                            Read More <i className="ri-arrow-right-line"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
