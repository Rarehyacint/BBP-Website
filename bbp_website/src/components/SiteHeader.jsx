import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const mainNav = [
  { name: "Visas", dropdown: true, to: "/visas" },
  { name: "Destinations", dropdown: true },
  { name: "Articles", dropdown: false, to: "/articles" },
  { name: "News", dropdown: false, to: "/news" },
  { name: "Services", dropdown: false },
];

const visaSubnav = [
  "Tourist Visa",
  "Study Visa",
  "Digital Nomad Visa",
  "Family Reunification Retirement",
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
    `inline-flex items-center transition-colors ${
      isActive ? "text-[#59b9f6] font-bold" : "hover:text-[#59b9f6]"
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

  // Modern glassmorphism header
  const headerClass = "bg-white/80 backdrop-blur-2xl border-b border-[#59b9f6]/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]";

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${headerClass} px-4 sm:px-8 py-4`}>
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto gap-3">
        <Link
          to="/"
          className="font-poppins font-extrabold text-2xl tracking-tighter bg-gradient-to-r from-[#1f4e79] to-[#59b9f6] bg-clip-text text-transparent hover:opacity-90 transition-opacity"
          aria-label="BYEBYEPINAS Home"
        >
          BYEBYEPINAS
        </Link>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-2 font-manrope font-semibold text-sm">
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
      </div>
    </header>
  );
}

