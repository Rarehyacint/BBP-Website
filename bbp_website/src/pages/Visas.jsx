import React, { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "../components/SiteHeader";

const FLAG_CODES_URL = "https://flagcdn.com/en/codes.json";

function flagUrl(code, width) {
  const safeCode = String(code || "").toLowerCase();
  return `https://flagcdn.com/w${width}/${safeCode}.png`;
}

export default function Visas() {
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState(null);
  const [codes, setCodes] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

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
    setQuery(country.name);
    // keep keyboard flow smooth for mobile
    inputRef.current?.blur();
  }

  return (
    <div className="min-h-screen bg-background-soft text-dark font-manrope">
      <SiteHeader variant="light" />

      <main className="relative">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-light/25 via-background-soft to-background-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-8 sm:pb-12">
            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="flex items-end justify-between gap-4">
                <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl md:text-5xl tracking-tight text-primary-dark">
                  Tahakin ang <span className="text-dark">Mundo!</span>
                </h1>

                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100">
                  <span className="w-8 h-8 rounded-full bg-background-soft border border-gray-200" aria-hidden="true" />
                </div>
              </div>

              <div className="mx-auto w-full max-w-3xl">
                <div className="bg-white/95 backdrop-blur rounded-full shadow-sm border border-gray-200 flex items-center gap-3 px-4 sm:px-5 py-3">
                  <i className="ri-search-line text-muted text-xl"></i>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    type="text"
                    placeholder="Search Destination or a Country"
                    className="w-full bg-transparent outline-none text-dark placeholder-muted/70"
                    aria-label="Search destination or country"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-3 sm:p-5">
                {status === "error" ? (
                  <div className="text-sm text-muted">
                    <p className="font-medium text-dark">Couldn’t load flags.</p>
                    <p className="mt-1">{errorMessage}</p>
                    <p className="mt-1">Check your internet connection and refresh.</p>
                  </div>
                ) : (
                  <div
                    className="grid gap-2"
                    style={{ gridTemplateColumns: "repeat(auto-fill, minmax(42px, 1fr))" }}
                  >
                    {(status === "loading" ? Array.from({ length: 140 }) : filtered).map((country, idx) => {
                      if (status === "loading") {
                        return (
                          <div
                            key={idx}
                            className="h-7 sm:h-8 rounded-md bg-background-soft animate-pulse border border-gray-200"
                            aria-hidden="true"
                          />
                        );
                      }

                      const isSelected = selectedCode === country.code;
                      return (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleSelect(country)}
                          className={
                            "group relative rounded-md border bg-white overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 transition " +
                            (isSelected
                              ? "border-accent ring-2 ring-accent/60"
                              : "border-gray-200 hover:border-primary-light")
                          }
                          title={country.name}
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
                          <span className="sr-only">{country.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {status === "ready" && filtered.length === 0 && (
                  <p className="text-sm text-muted mt-4">No matches found.</p>
                )}

                {status === "ready" && (
                  <p className="text-xs text-muted mt-4">
                    Tip: click a flag to auto-fill the search.
                  </p>
                )}
              </div>
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
    </div>
  );
}
