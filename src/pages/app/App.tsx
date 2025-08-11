function HomePage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Dark mode grid overlay */}
      <div
        className="absolute inset-0 dark:block hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top ruler numbers */}
      <div className="absolute top-0 left-0 right-0 h-6 border-b border-gray-300 dark:border-gray-700 flex items-center text-xs text-gray-500 dark:text-gray-400">
        {Array.from(
          { length: Math.ceil(window?.innerWidth / 28) || 50 },
          (_, i) => (
            <div
              key={i}
              className="absolute text-center"
              style={{
                left: `${i * 28}px`,
                width: "28px",
                fontSize: "10px",
              }}
            >
              {i}
            </div>
          ),
        )}
      </div>

      {/* Left ruler numbers */}
      <div className="absolute top-0 left-0 bottom-0 w-6 border-r border-gray-300 dark:border-gray-700 flex flex-col items-center text-xs text-gray-500 dark:text-gray-400">
        {Array.from(
          { length: Math.ceil(window?.innerHeight / 28) || 30 },
          (_, i) => (
            <div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                top: `${i * 28}px`,
                height: "28px",
                fontSize: "10px",
                width: "100%",
              }}
            >
              {i}
            </div>
          ),
        )}
      </div>

      <div className="text-center max-w-2xl mx-auto px-4 z-10">
        <h1
          className="text-6xl text-gray-800 dark:text-gray-200 mb-6 transform -rotate-2"
          style={{
            fontFamily: "Kalam, cursive",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Welcome
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed tracking-wide">
          My personal playground for experimenting & exploring UI/UX ✨
        </p>

        <p
          className="text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 inline-block"
          style={{
            fontFamily: "Kalam, cursive",
          }}
        >
          To start, click the floating navigation menu
        </p>
      </div>

      {/* Google Fonts link for Kalam */}
      <link
        href="https://fonts.googleapis.com/css2?family=Kalam:wght@300;400;700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}

export default HomePage;
