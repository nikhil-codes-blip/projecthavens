// app/terms/page.tsx
import React from "react";

export default function TermsOfService() {
  return (
    <div
      className="min-h-screen bg-cover bg-center text-white px-4 py-12 flex flex-col justify-center items-center"
      style={{
        backgroundImage: "url('/images/privacy-policy.jpg')",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="bg-black/60 p-6 rounded-xl text-center max-w-4xl w-full space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#49ce71]">
          Terms of Service
        </h1>

        <p className="text-lg">
          Content owned and maintained by National Testing Agency. Designed,
          Developed and Hosted by{" "}
          <a
            href="https://www.nic.in"
            className="underline text-blue-300 hover:text-blue-400"
            target="_blank"
          >
            National Informatics Centre
          </a>
          , Ministry of Electronics & IT, Government of India.
        </p>
        <hr className="my-6 border-gray-500" />



        {/* Logos Section */}
        <div className="flex flex-col items-center space-y-4">
          <img src="/swaas-logo.png" alt="Swaas Logo" className="w-45.6" />
          <img src="/nic-logo.png" alt="NIC Logo" className="w-47" />
          <img src="/digital-india-logo.png" alt="Digital India Logo" className="w-49" />
        </div>
            <p className="font-semibold">
          Last Updated: <span className="text-white">Jun 15, 2025</span>
        </p>
        <hr className="my-6 border-gray-500" />

        {/* Tourist Links */}
        <div className="text-sm md:text-base">
          <p className="mb-2">
            © 2024 <strong>Lucknow Tourist Guide</strong> | Info sourced from
            Wikipedia and external images
          </p>

          <p className="font-semibold text-white mb-1">🔗 Quick Links:</p>
          <p className="text-yellow-400 space-x-2">
            <a
              href="https://www.uptourism.gov.in"
              className="hover:underline"
              target="_blank"
            >
              🏛 UP Tourism
            </a>{" "}
            |{" "}
            <a
              href="https://www.irctc.co.in"
              className="hover:underline"
              target="_blank"
            >
              🚉 IRCTC
            </a>{" "}
            |{" "}
            <a
              href="https://www.kayak.co.in/Lucknow.32925.guide"
              className="hover:underline"
            >
              🧭 Travel Guide
            </a>{" "}
            |{" "}
            <a
              href="https://www.mapsofindia.com/maps/uttarpradesh/lucknow-city-map.htm"
              className="hover:underline"
            >
              🗺️ Map View
            </a>
          </p>

          <p className="mt-4">
            ☎️ <strong className="text-white">Emergency:</strong>{" "}
            <span className="text-yellow-300">1800-11-1363</span> | 🌐{" "}
            <a
              href="https://www.incredibleindia.org"
              className="text-yellow-300 hover:underline"
              target="_blank"
            >
              Incredible India
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
