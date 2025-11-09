import PageHeader from "../components/PageHeader.jsx";

export default function About() {
  return (
    <div>
      <PageHeader title="About This Blog" />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Welcome to my blog! Here I share my thoughts, experiences, and what I
          have learned so far. This blog is built using React with JavaScript,
          TailwindCSS, and deployed with Vercel.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          The goal of this project was to build a web app that also serves as a
          way for me to track my growth as a software developer.
        </p>

        <p className="text-lg text-gray-700 mb-4 leading-relaxed">
          Thanks for visiting! Feel free to explore or reach out through the
          contact links.
        </p>
      </div>
    </div>
  );
}
