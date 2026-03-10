import React from "react";

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
  "Tourist Visa",
  "Student Visa",
  "Digital Nomad Visa",
  "Family Reunification Visa",
  "Retirement",
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
  return (
    <div className="bg-background-soft text-dark font-manrope">
      {/* Header with dropdowns */}
      <header className="bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
          <div className="font-poppins font-extrabold text-2xl tracking-tight text-primary-dark">
            BYEBYEPINAS
          </div>
          <nav className="flex gap-6 text-dark font-medium">
            {mainNav.map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href="#"
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
                          className="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-white transition"
                        >
                          {sub}
                        </a>
                      ))
                    ) : (
                      destSubnav.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2 text-sm text-dark hover:bg-primary-light hover:text-white transition"
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

      {/* Rest of the page (same as before, but without the static subnav rows) */}
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
          <p className="text-xs text-muted mt-3 text-right italic">
            <i className="ri-information-line mr-1 text-accent"></i>
            Primary entry for users who think "Where do I want to go?"
          </p>
        </div>

        {/* Popular Destinations */}
        <div className="mt-8 text-left">
          <h3 className="font-poppins font-semibold text-dark mb-3 flex items-center gap-2">
            <i className="ri-flight-takeoff-line text-accent"></i> Popular Destinations
          </h3>
          <div className="flex flex-wrap gap-3">
            {popularDestinations.map((place) => (
              <span
                key={place}
                className="bg-white px-5 py-2 rounded-full border border-gray-200 shadow-sm text-dark hover:bg-primary-light hover:text-white transition cursor-pointer"
              >
                {place}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Visa Type */}
      <section className="px-6 py-8 bg-white/60 max-w-7xl mx-auto">
        <h2 className="font-poppins font-bold text-2xl text-dark flex items-center gap-2 mb-6">
          <i className="ri-passport-line text-accent"></i> Browse by Visa Type
        </h2>
        <div className="flex flex-wrap gap-4">
          {browseVisaTypes.map((visa) => (
            <a
              key={visa}
              href="#"
              className="bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-200 text-dark font-medium hover:bg-primary-light hover:text-white transition flex items-center gap-2"
            >
              <i className="ri-visa-line text-accent"></i> {visa}
            </a>
          ))}
        </div>
      </section>

      {/* Unang Lipad – First Time Travelers */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#59b9f6]/10 to-[#1f4e79]/10 rounded-3xl p-8 border border-[#59b9f6]/20">
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
              <p className="text-muted flex items-center gap-2 mt-1">
                <i className="ri-article-line text-accent"></i> Article Based only - No Visa
                Guides
              </p>
            </div>
            <div className="bg-accent/10 p-4 rounded-full">
              <i className="ri-flight-takeoff-line text-5xl text-accent"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tourist Visa Guides */}
      <section className="px-6 py-8 bg-white max-w-7xl mx-auto">
        <h2 className="font-poppins font-bold text-2xl text-dark flex items-center gap-2 mb-6">
          <i className="ri-guide-line text-accent"></i> Popular Tourist Visa Guides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularGuides.map((guide) => (
            <div
              key={guide.country}
              className="bg-background-soft p-5 rounded-xl border border-gray-200 hover:shadow-md transition"
            >
              <h3 className="font-poppins font-semibold text-lg text-dark flex items-center gap-2">
                <i className="ri-map-pin-line text-accent"></i> {guide.country}{" "}
                {guide.passport && (
                  <span className="text-sm font-normal text-muted">({guide.passport})</span>
                )}
              </h3>
              <a
                href="#"
                className="inline-block mt-3 text-primary-dark underline decoration-accent/30 flex items-center gap-1 text-sm"
              >
                <i className="ri-file-copy-line"></i> Visa Guide - Reference only{" "}
                <i className="ri-arrow-right-line text-accent"></i>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* USA Tourist Visa – Recent Updates + Services */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 border border-gray-200">
          <h2 className="font-poppins font-bold text-3xl text-primary-dark flex items-center gap-3 mb-6">
            <i className="ri-flag-line text-accent"></i> USA Tourist Visa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Recent Updates */}
            <div>
              <h3 className="font-poppins font-semibold text-xl text-dark flex items-center gap-2 mb-4">
                <i className="ri-calendar-event-line text-accent"></i> Recent Updates
              </h3>
              <div className="space-y-5">
                {recentUpdates.map((update, idx) => (
                  <div key={idx} className="border-l-4 border-accent pl-4">
                    <p className="font-medium text-dark">{update.title}</p>
                    <p className="text-sm text-accent">{update.date}</p>
                    <p className="text-sm text-muted mt-1">{update.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted mt-5 flex items-center gap-1 border-t pt-3 border-gray-100">
                <i className="ri-time-line"></i> Chronological, single Updates page source •
                Read inline, no separate pages
              </p>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-poppins font-semibold text-xl text-dark flex items-center gap-2 mb-4">
                <i className="ri-service-line text-accent"></i> Services
              </h3>
              <ul className="space-y-4">
                {servicesList.map((service, idx) => (
                  <li key={idx} className="bg-background-soft p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-dark">
                        {idx + 1}. {service.name}
                      </span>
                      <span className="text-xs bg-white px-3 py-1 rounded-full text-muted border">
                        {service.note}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted mt-5 text-right italic">No pricing on homepage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="text-center text-muted text-sm py-6 border-t border-gray-200 max-w-7xl mx-auto">
        <p>© BYEBYEPINAS — visa guidance for Filipinos</p>
      </footer>
    </div>
  );
};

export default App;