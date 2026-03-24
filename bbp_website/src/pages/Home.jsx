import React, { useEffect, useMemo, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ContentData } from "../data/DataContext";

const FLAG_CODES_URL = "https://flagcdn.com/en/codes.json";
const COUNTRY_INFO_URL = "https://restcountries.com/v3.1/alpha/";

function flagUrl(code, width) {
  const safeCode = String(code || "").toLowerCase();
  return `https://flagcdn.com/w${width}/${safeCode}.png`;
}

function slugify(text) {
  return String(text || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function normalizeSubregion(value) {
  const v = String(value || "").trim();
  if (!v) return "";
  return v
    .replace(/^Southern\s+/i, "South ")
    .replace(/^Northern\s+/i, "North ")
    .replace(/^Eastern\s+/i, "East ")
    .replace(/^Western\s+/i, "West ");
}

const popularDestinations = [
  "Japan",
  "South Korea",
  "France",
  "UAE",
  "Singapore",
  "Australia",
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
const { VisaTypes, SetVisaTypes, SetVisaCategory, SetArticles } = ContentData();

const [selectedCode, setSelectedCode] = useState(null);
const [codes, setCodes] = useState([]);
const [status, setStatus] = useState("loading");
const [errorMessage, setErrorMessage] = useState("");

const [modalCountry, setModalCountry] = useState(null);
const [modalStatus, setModalStatus] = useState("idle");
const [modalError, setModalError] = useState("");
const [modalInfo, setModalInfo] = useState(null);

useEffect(() => {
  let cancelled = false;

  async function load() {
    try {
      if (!modalCountry) {
        setStatus("loading");
        setErrorMessage("");

        const [visaTypesRes, visaCategoryRes, visaArticlesRes, flagsRes] = await Promise.all([
          fetch("http://localhost:1337/api/visa-types"),
          fetch("http://localhost:1337/api/visa-categories"),
          fetch("http://localhost:1337/api/articles?populate=tags&populate=takeaway"),
          fetch("https://flagcdn.com/en/codes.json", { cache: "force-cache" })
        ]);

        if (!visaTypesRes.ok || !flagsRes.ok) {
          throw new Error("Failed to load data");
        }

        const [visaTypesJson, visaCategoryJson, visaArticlesJson, flagsJson] = await Promise.all([
          visaTypesRes.json(),
          visaCategoryRes.json(),
          visaArticlesRes.json(),
          flagsRes.json()
        ]);

        if (cancelled) return;

        SetVisaTypes(visaTypesJson.data);
        SetVisaCategory(visaCategoryJson.data);
        SetArticles(visaArticlesJson.data);

        const entries = Object.entries(flagsJson)
          .filter(([code]) => /^[a-z]{2}$/i.test(code))
          .map(([code, name]) => ({ code: code.toLowerCase(), name }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCodes(entries);
        setStatus("ready");
      }

      if (modalCountry) {
        setModalStatus("loading");
        setModalError("");

        const res = await fetch(`https://restcountries.com/v3.1/alpha/${modalCountry.code}`, {
          cache: "force-cache"
        });

        if (!res.ok) throw new Error("Failed to load country");

        const json = await res.json();
        const item = Array.isArray(json) ? json[0] : json;

        if (cancelled) return;

        setModalInfo({
          continent: item?.region || "",
          region: item?.subregion ? normalizeSubregion(item.subregion) : ""
        });

        setModalStatus("ready");
      }
    } catch (err) {
      if (cancelled) return;

      if (!modalCountry) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Failed to load data");
      } else {
        setModalStatus("error");
        setModalError(err instanceof Error ? err.message : "Failed to load country");
      }
    }
  }

  load();

  function onKeyDown(e) {
    if (e.key === "Escape") {
      setModalCountry(null);
      setModalStatus("idle");
      setModalError("");
      setModalInfo(null);
    }
  }

  if (modalCountry) window.addEventListener("keydown", onKeyDown);

  return () => {
    cancelled = true;
    window.removeEventListener("keydown", onKeyDown);
  };
}, [modalCountry]);

const filtered = useMemo(() => {
  const q = search.trim().toLowerCase();
  if (!q) return codes;
  return codes.filter(c => c.name.toLowerCase().includes(q));
}, [codes, search]);

function handleSelect(country) {
  setSelectedCode(country.code);
}

function openModal(country) {
  setModalCountry(country);
}

function closeModal() {
  setModalCountry(null);
  setModalStatus("idle");
  setModalError("");
  setModalInfo(null);
}

const handleSearch = (e) => {
  e.preventDefault();
};

  return (
    <div className="bg-[#f8fbfe] text-dark font-manrope min-h-screen selection:bg-primary-light selection:text-white">
      <SiteHeader variant="light" />

      <section className="relative px-6 pt-20 pb-24 md:pt-32 md:pb-32 overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#59b9f6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-[#1f4e79]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          className="relative z-10 max-w-4xl mx-auto w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-7xl tracking-tight text-[#1f4e79] mb-6 leading-[1.1]">
            Explore the World with a <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#59b9f6] to-[#1f4e79]">
              Philippine Passport
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-dark/70 max-w-2xl mx-auto mb-10 font-medium px-4">
            Your definitive guide to tourist visas, digital nomad routes, and documentation required for Filipinos.
          </p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-[#59b9f6] to-[#1f4e79] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white rounded-3xl md:rounded-full shadow-lg p-2 flex flex-col md:flex-row items-center transition-all focus-within:ring-4 focus-within:ring-[#59b9f6]/20 border border-gray-100">
              <div className="flex items-center w-full px-2">
                <i className="ri-search-line text-[#59b9f6] text-xl md:text-2xl mr-3"></i>
                <input
                  type="text"
                  placeholder="Search destination or visa..."
                  className="w-full bg-transparent outline-none text-dark placeholder-muted/60 text-base md:text-lg py-3"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full md:w-auto bg-[#1f4e79] hover:bg-[#153a5b] text-white px-8 py-3.5 rounded-2xl md:rounded-full font-poppins font-bold transition-all hover:scale-[1.02] active:scale-95 mt-2 md:mt-0 shadow-lg shadow-[#1f4e79]/20">
                Search
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-3xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8 text-left w-full max-w-7xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {status === "error" ? (
            <div className="text-sm text-muted text-center">
              <p className="font-bold text-red-500 mb-1">Couldn't load flags.</p>
              <p className="mb-2">{errorMessage}</p>
              <p>Check your internet connection and refresh.</p>
            </div>
          ) : (
            <motion.div
              className="grid gap-3"
              style={{ gridTemplateColumns: "repeat(auto-fill, minmax(48px, 1fr))" }}
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.015 }
                }
              }}
            >
              {(status === "loading" ? Array.from({ length: 140 }) : filtered).map((country, idx) => {
                if (status === "loading") {
                  return (
                    <div
                      key={idx}
                      className="h-8 sm:h-10 rounded-xl bg-gray-100 animate-pulse border border-gray-200"
                      aria-hidden="true"
                    />
                  );
                }

                const isSelected = selectedCode === country.code;
                return (
                  <motion.button
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      show: { opacity: 1, scale: 1 }
                    }}
                    key={country.code}
                    type="button"
                    onClick={() => {
                      handleSelect(country);
                      openModal(country);
                    }}
                    title={country.code.toUpperCase()}
                    className={
                      "group relative rounded-md border bg-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#59b9f6]/70 transition " +
                      (isSelected
                        ? "border-[#59b9f6] ring-2 ring-[#59b9f6]/60"
                        : "border-gray-200 hover:border-primary-light")
                    }
                    aria-label={`${country.name} (${country.code.toUpperCase()})`}
                    aria-pressed={isSelected}
                  >
                    <img
                      src={flagUrl(country.code, 40)}
                      srcSet={`${flagUrl(country.code, 40)} 1x, ${flagUrl(country.code, 80)} 2x`}
                      width={40}
                      height={30}
                      loading="lazy"
                      className="w-full h-7 sm:h-8 object-cover"
                      alt={`${country.name} flag`}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-primary-dark/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="text-white text-xs font-poppins font-extrabold tracking-[0.2em] drop-shadow-md">
                        {country.code.toUpperCase()}
                      </span>
                    </span>
                    <span className="sr-only">{country.name}</span>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {status === "ready" && filtered.length === 0 && (
            <p className="text-sm text-muted mt-6 text-center font-medium">No matches found for "{search}".</p>
          )}

          {status === "ready" && (
            <p className="text-sm text-dark/50 mt-6 text-center">
              Tip: click a flag to view more information.
            </p>
          )}
        </motion.div>
      </section>

      <motion.section
        className="px-6 py-12 max-w-7xl mx-auto relative z-10"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="font-poppins font-extrabold text-2xl sm:text-3xl text-dark mb-8 flex items-center gap-3">
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

      <motion.section
        className="px-6 py-16 max-w-7xl mx-auto"
        initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
          <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-dark flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#59b9f6]/10 flex items-center justify-center text-[#59b9f6]">
              <i className="ri-passport-line"></i>
            </span>
            Visa Types
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {VisaTypes.map((visa, index) => (
              <Link
              key={visa.id}
                to={`/visas/${visa.title}`}
                className="group bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:border-[#59b9f6]/30 flex flex-col items-center justify-center text-center h-full hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(89,185,246,0.12)] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#f0f7fb] group-hover:bg-[#59b9f6] group-hover:text-white text-[#1f4e79] flex items-center justify-center mb-5 transition-colors duration-300">
                  <i className={`ri-${visa.logo}-fill text-3xl`}></i>
                </div>
                <span className="font-poppins font-bold text-[15px] text-dark leading-tight">{visa.title}</span>
              </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="px-6 py-12 max-w-7xl mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden bg-[#1f4e79] rounded-[2.5rem] p-10 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-[#59b9f6] to-transparent opacity-20 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold mb-6">
                <i className="ri-plane-line text-[#59b9f6]"></i> New to traveling?
              </div>
              <h2 className="font-poppins font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
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

      <section className="px-6 py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
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

      <motion.section
        className="px-6 py-16 max-w-7xl mx-auto"
        initial="hidden" whileInView="show" viewport={{ once: true }} variants={containerVariants}
      >
        <h2 className="font-poppins font-extrabold text-2xl sm:text-3xl text-dark text-center mb-10">Our Services</h2>
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

      <AnimatePresence>
        {modalCountry && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Visa information for ${modalCountry.name}`}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-[#1f4e79]/60 backdrop-blur-sm pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
            >
              <div className="relative">
                <img
                  src={flagUrl(modalCountry.code, 320)}
                  srcSet={`${flagUrl(modalCountry.code, 320)} 1x, ${flagUrl(modalCountry.code, 640)} 2x`}
                  alt={`${modalCountry.name} flag`}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur border border-gray-200 flex items-center justify-center text-primary-dark hover:border-primary-light transition"
                  aria-label="Close"
                >
                  <i className="ri-close-line text-xl" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="font-poppins font-extrabold text-2xl text-primary-dark mb-4 text-left">
                  {modalCountry.name}
                </h2>

                <div className="mt-5 space-y-3 text-left">
                  {modalStatus === "error" ? (
                    <p className="text-sm text-muted">{modalError}</p>
                  ) : (
                    <>
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark text-xs font-poppins font-semibold">
                          Continent
                        </span>
                        <span className="text-sm font-manrope text-dark">
                          {modalInfo?.continent || (modalStatus === "loading" ? "Loading…" : "—")}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark text-xs font-poppins font-semibold">
                          Region
                        </span>
                        <span className="text-sm font-manrope text-dark">
                          {modalInfo?.region || (modalStatus === "loading" ? "Loading…" : "—")}
                        </span>
                      </div>
                    </>
                  )}

                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark text-xs font-poppins font-semibold">
                      Visa Type
                    </span>
                    <span className="text-sm font-manrope text-dark">Tourist Visa</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark text-xs font-poppins font-semibold">
                      Visa Category
                    </span>
                    <span className="text-sm font-manrope text-dark">Regular Visa</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light/20 text-primary-dark text-xs font-poppins font-semibold">
                      URL Slug
                    </span>
                    <span className="text-sm font-manrope text-dark break-all text-right">
                      {`${slugify(modalCountry.name)}-visa-for-filipinos`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}