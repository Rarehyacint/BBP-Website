import React, { useState } from "react";
import VisaTypePage from "./VisaTypePage";
import Destinations from "./Destinations";
import Articles from "./Articles";
import News from "./News";

const mainNav = [
  { name: "Visas", dropdown: true },
  { name: "Destinations", dropdown: true },
  { name: "Articles", dropdown: false },
  { name: "News", dropdown: false },
  { name: "Services", dropdown: false },
];

const visaSubnav = [
  "Tourist Visa",
  "Study Visa",
  "Digital Nomad Visa",
  "Family Reunification Retirement",
];

const destSubnav = ["Schengen Area", "Asia", "Europe", "Americas"];

const popularDestinations = ["Japan", "South Korea", "France", "UAE", "Singapore", "Australia"];
const browseVisaTypes = [
  { name: "Tourist Visa", icon: "ri-plane-fill" },
  { name: "Student Visa", icon: "ri-graduation-cap-line" },
  { name: "Digital Nomad Visa", icon: "ri-macbook-line" },
  { name: "Family Reunification Visa", icon: "ri-group-line" },
  { name: "Retirement", icon: "ri-home-5-line" },
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
  { name: "Tourist Visa Assistance", note: "Category level only" },
  { name: "Student Visa Assistance", note: "Category level only" },
  { name: "Document Review", note: "Category level only" },
];

const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [activeVisa, setActiveVisa] = useState(null);
  const [activeDestination, setActiveDestination] = useState(null);

  const handleVisaClick = (visaName, e) => {
    if (e) e.preventDefault();
    setActiveVisa(visaName);
    setActivePage("visa-type");
  };

  const handleDestinationClick = (destName, e) => {
    if (e) e.preventDefault();
    setActiveDestination(destName);
    setActivePage("destinations");
  };

  const handleMainNavClick = (itemName, e) => {
    if (itemName === "Articles" || itemName === "News" || itemName === "Services") {
      if (e) e.preventDefault();
      setActivePage(itemName.toLowerCase());
      setActiveVisa(null);
      setActiveDestination(null);
    }
  };

  const handleHomeClick = (e) => {
    if (e) e.preventDefault();
    setActivePage("home");
    setActiveVisa(null);
    setActiveDestination(null);
  };

  return (
    <div className="bg-background-soft text-dark font-manrope">
      {/* Header with dropdowns */}
      <header className="bg-gradient-to-r from-[#59b9f6] to-[#1f4e79] px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
          <div
            className="font-poppins font-extrabold text-2xl tracking-tight text-white cursor-pointer"
            onClick={handleHomeClick}
          >
            BYEBYEPINAS
          </div>
          <nav className="flex gap-6 text-white font-medium">
            {mainNav.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href="#"
                  onClick={(e) => handleMainNavClick(item.name, e)}
                  className="hover:text-accent transition inline-flex items-center gap-1"
                >
                  {item.name}
                  {item.dropdown && <i className="ri-arrow-down-s-line text-lg"></i>}
                </a>
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-100">
                    {item.name === "Visas" ? (
                      visaSubnav.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          onClick={(e) => handleVisaClick(sub, e)}
                          className="block px-4 py-2 text-sm text-black hover:bg-primary-light hover:text-white transition"
                        >
                          {sub}
                        </a>
                      ))
                    ) : (
                      destSubnav.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          onClick={(e) => handleDestinationClick(sub, e)}
                          className="block px-4 py-2 text-sm text-black hover:bg-primary-light hover:text-white transition"
                        >
                          {sub}
                        </a>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>

      {activePage === "home" ? (
        <>
          {/* Hero / Destination Search */}
          <section className="px-6 py-10 md:py-14 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center bg-background-soft rounded-full px-5 py-3">
                <i className="ri-search-line text-muted text-xl mr-3"></i>
                <input
                  type="text"
                  placeholder="Search destination or select country"
                  className="w-full bg-transparent outline-none text-dark placeholder-muted/70"
                />
              </div>
            </div>
          </section>

          {/* Popular Destinations */}
          <section className="px-6 py-8 max-w-7xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl text-dark mb-4 flex items-center gap-2">
              <i className="ri-flight-takeoff-line text-accent"></i> Popular Destinations
            </h2>
            <div className="flex flex-wrap gap-3">
              {popularDestinations.map((place) => (
                <span
                  key={place}
                  className="bg-white px-15 p-5 rounded-full border border-gray-200 shadow-sm text-dark hover:bg-primary-light hover:text-white transition cursor-pointer"
                >
                  {place}
                </span>
              ))}
            </div>
          </section>

          {/* Browse by Visa Type */}
          <section className="px-6 py-8 max-w-7xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl text-dark mb-4">
              Browse by Visa Type
            </h2>
            <div className="bg-gradient-to-r from-[#59b9f6]/50 to-[#1f4e79]/100 p-4 md:p-6 rounded-2xl grid grid-cols-2 lg:grid-cols-5 gap-4">
              {browseVisaTypes.map((visa) => (
                <div
                  key={visa.name}
                  className="bg-white rounded-xl shadow-md px-15 py-8 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:shadow-lg transition-transform duration-200 aspect-square md:aspect-auto md:h-44"
                >
                  <i className={`${visa.icon} text-5xl text-dark mb-4`}></i>
                  <span className="font-poppins font-bold text-sm text-dark leading-snug">{visa.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Unang Lipad – First Time Travelers */}
          <section className="px-6 py-10 max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-[#59b9f6]/10 to-[#1f4e79]/15 rounded-3xl p-8 border border-[#59b9f6]/20">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div>
                  <span className="font-poppins font-bold text-3xl text-primary-dark">
                    Unang Lipad
                  </span>
                  <span className="ml-3 text-lg text-muted font-poppins">
                    – First Time Travelers
                  </span>
                  <h3 className="text-2xl font-poppins font-semibold mt-2 text-dark">
                    First Time Traveler? Start Here.
                  </h3>
                </div>
                <div className="bg-accent/10 p-4 rounded-full">
                  <i className="ri-flight-takeoff-line text-5xl text-accent"></i>
                </div>
              </div>
            </div>
          </section>

          {/* Popular Tourist Visa Guides */}
          <section className="px-6 py-8 max-w-7xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl text-dark flex items-center gap-2 mb-4">
              <i className="ri-guide-line text-accent"></i> Popular Tourist Visa Guides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {popularGuides.map((guide) => (
                <div
                  key={guide.country}
                  className="bg-background-soft p-5 rounded-xl border border-gray-200 hover:bg-primary-light hover:text-white transition cursor-pointer"
                >
                  <h3 className="font-poppins font-semibold text-lg text-dark flex items-center gap-2">
                    <i className="ri-map-pin-line text-accent"></i> {guide.country}{" "}
                    {guide.passport && (
                      <span className="text-sm font-normal text-muted">({guide.passport})</span>
                    )}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Updates */}
          <section className="px-6 py-8 max-w-7xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl text-dark flex items-center gap-2 mb-4">
              <i className="ri-calendar-event-line text-accent"></i> Recent Updates
            </h2>
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
              <div className="space-y-5">
                {recentUpdates.map((update, idx) => (
                  <div key={idx} className="border-l-4 border-accent pl-4">
                    <p className="font-medium text-dark">{update.title}</p>
                    <p className="text-sm text-accent">{update.date}</p>
                    <p className="text-sm text-muted mt-1">{update.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services */}
          <section className="px-6 py-8 max-w-7xl mx-auto">
            <h2 className="font-poppins font-bold text-2xl text-dark flex items-center gap-2 mb-4">
              <i className="ri-service-line text-accent"></i> Services
            </h2>
            <div className="bg-gradient-to-r from-[#59b9f6]/50 to-[#1f4e79]/100 rounded-3xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicesList.map((service, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                      <i className={`text-5xl text-primary-dark ${idx === 0 ? 'ri-flight-takeoff-line' : idx === 1 ? 'ri-graduation-cap-line' : 'ri-file-search-line'}`}></i>
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-dark">{service.name}</h3>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-dark font-medium">Category level only in services</p>
              </div>
            </div>
          </section>
        </>
      ) : activePage === "visa-type" && activeVisa ? (
        <VisaTypePage visaName={activeVisa} onBack={handleHomeClick} />
      ) : activePage === "destinations" && activeDestination ? (
        <Destinations destinationName={activeDestination} onBack={handleHomeClick} />
      ) : activePage === "articles" ? (
        <Articles onBack={handleHomeClick} />
      ) : activePage === "news" ? (
        <News onBack={handleHomeClick} />
      ) : null}

      {/* Simple Footer */}
      <footer className="bg-gradient-to-r from-[#59b9f6] to-[#1f4e79] px-6 py-6 shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)] mt-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <p className="font-poppins font-medium text-center text-white text-sm">
            © BYEBYEPINAS — visa guidance for Filipinos
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;