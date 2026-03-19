import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const mainNav = [
  { name: "Visas", dropdown: true },
  { name: "Destinations", dropdown: true },
  { name: "Articles", dropdown: false, to: "/articles" },
  { name: "News", dropdown: false, to: "/news" },
  { name: "Services", dropdown: false, to: "/services" },
];

const visaSubnav = [
  "Tourist Visa",
  "Study Visa",
  "Digital Nomad Visa",
  "Family Reunification",
  "Retirement",
];

const destSubnav = ["Schengen Area", "Asia", "Europe", "Americas"];

function HeaderLink({ item }) {
  const inner = (
    <span className="transition inline-flex items-center gap-1.5 focus:outline-none">
      {item.name}
      {item.dropdown && (
        <motion.i
          className="ri-arrow-down-s-line text-lg opacity-60"
          initial={false}
          transition={{ duration: 0.2 }}
        ></motion.i>
      )}
    </span>
  );

  const activeClass = ({ isActive }) =>
    `inline-flex items-center transition-colors ${isActive ? "text-[#59b9f6] font-bold" : "hover:text-[#59b9f6]"
    }`;

  if (item.to) {
    return (
      <NavLink to={item.to} className={activeClass}>
        {inner}
      </NavLink>
    );
  }

  return (
    <span className="inline-flex items-center cursor-default hover:text-[#59b9f6] transition-colors">
      {inner}
    </span>
  );
}

function slug(value) {
  return encodeURIComponent(String(value || "").trim());
}

export default function SiteHeader({ variant = "light" }) {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modern glassmorphism header
  const headerClass = "bg-white/80 backdrop-blur-2xl border-b border-[#59b9f6]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClass} px-4 sm:px-8 py-4`}>
      <div className="flex items-center justify-between max-w-7xl mx-auto gap-3">
        <Link
          to="/"
          className="font-poppins font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-[#1f4e79] to-[#59b9f6] bg-clip-text text-transparent hover:opacity-90 transition-opacity whitespace-nowrap"
          aria-label="BYEBYEPINAS Home"
        >
          BYEBYEPINAS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-x-8 font-manrope font-semibold text-sm">
          {mainNav.map((item) => (
            <div
              key={item.name}
              className="relative py-2"
              onMouseEnter={() => setHoveredNav(item.name)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <div className="text-dark/80 hover:text-dark transition-colors cursor-pointer">
                <HeaderLink item={item} />
              </div>

              {item.dropdown && (
                <AnimatePresence>
                  {hoveredNav === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 top-full mt-1 w-60 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl py-3 z-50 border border-gray-100 overflow-hidden"
                    >
                      {(item.name === "Visas" ? visaSubnav : destSubnav).map((sub) => {
                        const to =
                          item.name === "Visas"
                            ? `/visas/${slug(sub)}`
                            : `/destinations/${slug(sub)}`;

                        return (
                          <NavLink
                            key={sub}
                            to={to}
                            className="block px-5 py-2.5 text-[15px] font-medium text-dark/70 hover:text-primary-dark hover:bg-primary-light/10 transition-all"
                          >
                            {sub}
                          </NavLink>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-primary-light/10 text-primary-dark hover:bg-primary-light/20 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={isMobileMenuOpen ? "ri-close-line text-2xl" : "ri-menu-3-line text-2xl"}></i>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 mt-4 -mx-4 px-4"
          >
            <div className="py-4 space-y-2">
              {mainNav.map((item) => (
                <div key={item.name} className="flex flex-col">
                  {item.to ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `py-2 px-4 rounded-xl text-[15px] font-bold transition-all ${isActive ? "bg-primary-light/10 text-primary-dark" : "text-dark/70 hover:bg-gray-50"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  ) : (
                    <div className="py-2 px-4 font-bold text-dark/40 text-[11px] uppercase tracking-wider mt-2">
                      {item.name}
                    </div>
                  )}

                  {item.dropdown && (
                    <div className="grid grid-cols-1 gap-1 ml-4 py-1">
                      {(item.name === "Visas" ? visaSubnav : destSubnav).map((sub) => {
                        const to =
                          item.name === "Visas"
                            ? `/visas/${slug(sub)}`
                            : `/destinations/${slug(sub)}`;
                        return (
                          <NavLink
                            key={sub}
                            to={to}
                            className={({ isActive }) =>
                              `py-2 px-4 rounded-xl text-[14px] font-medium transition-all ${isActive ? "text-primary-dark font-bold bg-primary-light/5" : "text-dark/60 hover:bg-gray-50 hover:text-dark"
                              }`
                            }
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {sub}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="py-6 border-t border-gray-50">
              <Link
                to="/services"
                className="w-full bg-primary-dark text-white py-3.5 rounded-2xl font-poppins font-bold text-center block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

