export default function PageHeader({ title, subtitle }) {
  return (
    <header className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 mb-8">
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl drop-shadow-md text-gray-100">
            {subtitle}
          </p>
        )}
      </div>
      {/* Optional overlay for depth */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
    </header>
  );
}
