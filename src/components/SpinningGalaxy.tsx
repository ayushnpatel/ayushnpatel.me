export function SpinningGalaxy() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 animate-spin-slow">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="galaxy-gradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Central core */}
          <circle
            cx="50"
            cy="50"
            r="8"
            fill="currentColor"
            className="text-celadon dark:text-powder-blush"
            opacity="0.9"
          />

          {/* Spiral arms with rough edges */}
          <path
            d="M 50 50 Q 65 35 75 30 Q 80 28 82 25"
            stroke="url(#galaxy-gradient)"
            strokeWidth="3"
            fill="none"
            className="text-celadon dark:text-powder-blush"
            strokeLinecap="round"
          />
          <path
            d="M 50 50 Q 35 65 25 70 Q 20 72 18 75"
            stroke="url(#galaxy-gradient)"
            strokeWidth="3"
            fill="none"
            className="text-celadon dark:text-powder-blush"
            strokeLinecap="round"
          />
          <path
            d="M 50 50 Q 65 65 70 75 Q 72 80 75 82"
            stroke="url(#galaxy-gradient)"
            strokeWidth="2.5"
            fill="none"
            className="text-powder-blush dark:text-celadon"
            strokeLinecap="round"
          />
          <path
            d="M 50 50 Q 35 35 30 25 Q 28 20 25 18"
            stroke="url(#galaxy-gradient)"
            strokeWidth="2.5"
            fill="none"
            className="text-powder-blush dark:text-celadon"
            strokeLinecap="round"
          />

          {/* Scattered stars */}
          <circle cx="70" cy="25" r="1.5" fill="currentColor" className="text-celadon dark:text-powder-blush" />
          <circle cx="30" cy="75" r="1.5" fill="currentColor" className="text-celadon dark:text-powder-blush" />
          <circle cx="80" cy="50" r="1" fill="currentColor" className="text-powder-blush dark:text-celadon" />
          <circle cx="20" cy="50" r="1" fill="currentColor" className="text-powder-blush dark:text-celadon" />
          <circle cx="60" cy="70" r="1.2" fill="currentColor" className="text-celadon dark:text-powder-blush" />
          <circle cx="40" cy="30" r="1.2" fill="currentColor" className="text-celadon dark:text-powder-blush" />
        </svg>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
