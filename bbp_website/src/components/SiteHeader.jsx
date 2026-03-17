import React from "react";
import { Link, NavLink } from "react-router-dom";

const mainNav = [
  { name: "Visas", dropdown: true, to: "/visas" },
  { name: "Destinations", dropdown: true, href: "#" },
  { name: "Articles", dropdown: false, href: "#" },
  { name: "News", dropdown: false, href: "#" },
  { name: "Services", dropdown: false, href: "#" },
];

const visaSubnav = [
  "Tourist Visa",
  "Study Visa",
  "Digital Nomad Visa",
  "Family Reunification Retirement",
];

const destSubnav = ["Schengen Area", "Asia", "Europe", "Americas"];

function HeaderLink({ item, variant }) {
  const baseClass =
    variant === "light"
      ? "text-primary-dark hover:text-accent"
      : "text-white hover:text-accent";

  const inner = (
    <span className={`transition inline-flex items-center gap-1 ${baseClass}`}>
      {item.name}
      {item.dropdown && <i className="ri-arrow-down-s-line text-lg"></i>}
    </span>
  );

  if (item.to) {
    return (
      <NavLink
        to={item.to}
        className={({ isActive }) =>
          `inline-flex items-center ${isActive ? "font-semibold" : ""}`
        }
      >
        {inner}
      </NavLink>
    );
  }

  return (
    <a href={item.href} className="inline-flex items-center">
      {inner}
    </a>
  );
}

export default function SiteHeader({ variant = "gradient" }) {
  const headerClass =
    variant === "light"
      ? "bg-white/95 backdrop-blur border-b border-gray-100"
      : "bg-gradient-to-r from-[#59b9f6] to-[#1f4e79] shadow-sm";

  return (
    <header className={`${headerClass} px-4 sm:px-6 py-4`}>
      <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto gap-3">
        <Link
          to="/"
          className={
            variant === "light"
              ? "font-poppins font-extrabold text-2xl tracking-tight text-primary-dark"
              : "font-poppins font-extrabold text-2xl tracking-tight text-white"
          }
          aria-label="BYEBYEPINAS Home"
        >
          BYEBYEPINAS
        </Link>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-medium">
          {mainNav.map((item) => (
            <div key={item.name} className="relative group">
              <HeaderLink item={item} variant={variant} />

              {item.dropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                  {(item.name === "Visas" ? visaSubnav : destSubnav).map((sub) => (
                    <a
                      key={sub}
                      href="#"
                      className="block px-4 py-2 text-sm text-black hover:bg-primary-light hover:text-white transition"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
