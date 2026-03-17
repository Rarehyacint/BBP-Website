import React, { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { motion, AnimatePresence } from "framer-motion";

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

  // Make Rest Countries' subregion labels closer to common wording.
  return v
    .replace(/^Southern\s+/i, "South ")
    .replace(/^Northern\s+/i, "North ")
    .replace(/^Eastern\s+/i, "East ")
    .replace(/^Western\s+/i, "West ");
}

export default function Visas() {
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const [codes, setCodes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const [modalCountry, setModalCountry] = useState(null); // { code, name }
  const [modalStatus, setModalStatus] = useState("idle"); // idle | loading | ready | error
  const [modalError, setModalError] = useState("");
  const [modalInfo, setModalInfo] = useState(null); // { continent, region }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const res = await fetch(FLAG_CODES_URL, { cache: "force-cache" });
        if (!res.ok) throw new Error(`Failed to load country list (${res.status})`);
        const json = await res.json();

        const entries = Object.entries(json)
          .filter(([code]) => /^[a-z]{2}$/i.test(code))
          .map(([code, name]) => ({ code: code.toLowerCase(), name }))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (cancelled) return;
        setCodes(entries);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Failed to load countries");
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return codes;
    return codes.filter((c) => c.name.toLowerCase().includes(q));
  }, [codes, query]);

  function handleSelect(country) {
    setSelectedCode(country.code);
    // Clicking a flag should not change the search input.
    // Keep selected state for visual feedback only.
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

  useEffect(() => {
    if (!modalCountry) return;

    let cancelled = false;

    async function loadCountryInfo() {
      try {
        setModalStatus("loading");
        setModalError("");
        setModalInfo(null);

        const res = await fetch(`${COUNTRY_INFO_URL}${modalCountry.code}`, {
          cache: "force-cache",
        });
        if (!res.ok) throw new Error(`Failed to load country info (${res.status})`);
        const json = await res.json();

        const item = Array.isArray(json) ? json[0] : json;
        const continent = item?.region ? String(item.region) : "";
        const region = item?.subregion ? normalizeSubregion(item.subregion) : "";

        if (cancelled) return;
        setModalInfo({ continent, region });
        setModalStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setModalStatus("error");
        setModalError(err instanceof Error ? err.message : "Failed to load country info");
      }
    }

    loadCountryInfo();

    return () => {
      cancelled = true;
    };
  }, [modalCountry]);

  useEffect(() => {
    if (!modalCountry) return;

    function onKeyDown(e) {
      if (e.key === "Escape") closeModal();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modalCountry]);

  return (
    <div className="min-h-screen bg-background-soft text-dark font-manrope">
      <SiteHeader />

      <main className="relative">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/25 via-background-soft to-background-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-8 sm:pb-12">
            <div className="flex flex-col gap-6 sm:gap-8">
              <motion.div 
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#1f4e79]">
                  Tahakin ang <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#59b9f6] to-[#1f4e79]">Mundo!</span>
                </h1>

                <div
                  className={
                    "w-full md:ml-auto transition-[width] duration-300 ease-out " +
                    (isSearchFocused ? "md:w-[32rem]" : "md:w-[24rem]")
                  }
                >
                  <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex items-center gap-3 px-6 py-4 focus-within:ring-4 focus-within:ring-[#59b9f6]/20 focus-within:border-[#59b9f6] transition-all">
                    <i className="ri-search-line text-[#59b9f6] text-2xl"></i>
                    <input
                      ref={inputRef}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      type="text"
                      placeholder="Search Destination or a Country"
                      className="w-full bg-transparent outline-none text-dark placeholder-muted/60 text-lg font-medium"
                      aria-label="Search destination or country"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="bg-white/60 backdrop-blur-3xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 sm:p-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {status === "error" ? (
                  <div className="text-sm text-muted">
                    <p className="font-bold text-red-500 mb-1">Couldn’t load flags.</p>
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
                  <p className="text-sm text-muted mt-6 text-center font-medium">No matches found for "{query}".</p>
                )}

                {status === "ready" && (
                  <p className="text-sm text-dark/50 mt-6 text-center">
                    Tip: click a flag to view more information.
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary-light mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
            <div className="space-y-3">
              <p className="font-poppins font-semibold">@ byebyepinas</p>
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-instagram-line"></i>
                <span>byebyepinas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-facebook-circle-line"></i>
                <span>byebyepinas</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-youtube-line"></i>
                <span>byebyepinas</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-poppins font-semibold">Contact</p>
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-mail-line"></i>
                <span>hello@byebyepinas.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <i className="ri-phone-line"></i>
                <span>0956 946 4527</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-poppins font-semibold">Address</p>
              <div className="flex items-start gap-3 text-sm">
                <i className="ri-map-pin-2-line mt-0.5"></i>
                <span>
                  11th Ave Cor 26th St<br />
                  Unit 1702, High Street South Corporate Plaza Tower, BGC, Taguig
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end">
            <div className="font-poppins font-extrabold tracking-tight text-white leading-none">
              BYE<br />
              BYE<br />
              PINAS
            </div>
          </div>
        </div>
      </footer>

      {/* Remove abstract blobs for now or put them globally? Let's just animate the modal */}
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
              <h2 className="font-poppins font-extrabold text-2xl text-primary-dark">
                {modalCountry.name}
              </h2>

              <div className="mt-5 space-y-3">
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


