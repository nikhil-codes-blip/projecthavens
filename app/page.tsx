"use client"

import { useEffect, useState } from "react"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const btn = document.getElementById("startBtn")
    const bg = document.getElementById("bgImage")

    if (btn && bg) {
      btn.addEventListener("click", () => {
        setIsLoading(true)
        bg.classList.add("zoomed")
        setTimeout(() => {
          window.location.href = "/explore"
        }, 2000)
      })
    }
  }, [])

  return (
    <section className="hero">
      <div className="bg-image animate-subtle-zoom" id="bgImage"></div>
      <div className="overlay animate-fade-in"></div>

      {/* Floating particles */}
      <div className="particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      <div className="hero-content animate-slide-up">
        <h1 className="animate-text-glow">
          <b>Step Into the Royal Past</b>
        </h1>
        <p className="animate-fade-in-delay">
          <b>Explore the timeless Havelis of Lucknow with guided audio and QR tours</b>
        </p>
        <button
          className={`cta-btn animate-pulse-glow ${isLoading ? "loading" : ""}`}
          id="startBtn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="loading-spinner"></span>
              Preparing Journey...
            </>
          ) : (
            "Start Exploring"
          )}
        </button>
        <div className="qr-icon animate-float" title="Scan QR for Audio Guide"></div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: linear-gradient(45deg, #1a1a2e, #16213e);
        }

        .bg-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 110%;
          height: 110%;
          background: url('/images/lucknow image.jpg') no-repeat center center/cover;
          z-index: 0;
          transition: transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: brightness(0.8) contrast(1.1);
        }

        .animate-subtle-zoom {
          animation: subtleZoom 20s ease-in-out infinite alternate;
        }

        .bg-image.zoomed {
          transform: scale(1.5) rotate(2deg);
          filter: brightness(0.6) blur(2px);
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 10, 0.4) 0%,
            rgba(73, 206, 113, 0.1) 50%,
            rgba(230, 182, 25, 0.1) 100%
          );
          z-index: 1;
        }

        .particles {
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .particle {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          pointer-events: none;
        }

        .particle-1 {
          width: 4px;
          height: 4px;
          top: 20%;
          left: 10%;
          animation: float1 6s ease-in-out infinite;
        }

        .particle-2 {
          width: 6px;
          height: 6px;
          top: 60%;
          left: 80%;
          animation: float2 8s ease-in-out infinite;
        }

        .particle-3 {
          width: 3px;
          height: 3px;
          top: 30%;
          left: 70%;
          animation: float3 7s ease-in-out infinite;
        }

        .particle-4 {
          width: 5px;
          height: 5px;
          top: 80%;
          left: 20%;
          animation: float1 9s ease-in-out infinite reverse;
        }

        .particle-5 {
          width: 4px;
          height: 4px;
          top: 40%;
          left: 90%;
          animation: float2 5s ease-in-out infinite;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 20px;
          max-width: 800px;
        }

        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }

        .animate-fade-in {
          animation: fadeIn 2s ease-out;
        }

        .animate-fade-in-delay {
          animation: fadeIn 1.5s ease-out 0.5s both;
        }

        .hero h1 {
          font-size: 3rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #49ce71;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .animate-text-glow {
          animation: textGlow 3s ease-in-out infinite alternate;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: white;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
        }

        .cta-btn {
          background: linear-gradient(45deg, #e6b619, #f4d03f);
          color: black;
          border: none;
          padding: 0.8rem 2rem;
          font-size: 1rem;
          border-radius: 25px;
          cursor: pointer;
          margin-left: 90px;
          margin-left: 100px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          box-shadow: 0 4px 15px rgba(230, 182, 25, 0.3);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .cta-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .cta-btn:hover::before {
          left: 100%;
        }

        .cta-btn:hover {
          background: linear-gradient(45deg, #f4d03f, #e6b619);
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(230, 182, 25, 0.5);
        }

        .cta-btn:active {
          transform: translateY(0) scale(0.98);
        }

        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .cta-btn.loading {
          background: linear-gradient(45deg, #b68c1d, #d4af37);
          cursor: not-allowed;
          transform: none;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          border-top-color: black;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }

        .qr-icon {
          display: inline-block;
          margin-top: 1.5rem;
          width: 60px;
          height: 60px;
          background-image: url('/images/qr.png');
          background-size: contain;
          background-repeat: no-repeat;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .animate-float {
          animation: floatQR 3s ease-in-out infinite;
        }

        .qr-icon:hover {
          transform: scale(1.1) rotate(5deg);
          filter: brightness(1.2);
        }

        /* Keyframe Animations */
        @keyframes subtleZoom {
          0% { transform: scale(1) rotate(0deg); }
          100% { transform: scale(1.05) rotate(1deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes textGlow {
          0% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(73, 206, 113, 0.3); }
          100% { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(73, 206, 113, 0.6); }
        }

        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 4px 15px rgba(230, 182, 25, 0.3); }
          50% { box-shadow: 0 4px 25px rgba(230, 182, 25, 0.6), 0 0 30px rgba(230, 182, 25, 0.3); }
        }

        @keyframes floatQR {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-20px) translateX(10px); }
          66% { transform: translateY(-10px) translateX(-5px); }
        }

        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-15px) translateX(-10px); }
        }

        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          75% { transform: translateY(-20px) translateX(-8px); }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }
          .hero p {
            font-size: 1rem;
          }
          .cta-btn {
            margin-left: 0;
            padding: 0.7rem 1.5rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  )
}
