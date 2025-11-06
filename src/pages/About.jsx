export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        About This Blog
      </h1>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Welcome to my blog! Here I share my thoughts, experiences, and what I
        have learned so far. This blog is built using React and TailwindCSS.
      </p>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        The goal of this was to make a web app project that also serves as a way
        for me to track my growth as a software developer.
      </p>

      <p className="text-lg text-gray-700 mb-4 leading-relaxed">
        Thanks for visiting! Feel free to explore or reach out through the
        contact links.
      </p>
    </div>
  );
}
