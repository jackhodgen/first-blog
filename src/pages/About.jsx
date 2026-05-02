import PageHeader from "../components/PageHeader.jsx";

export default function About() {
  return (
    <div>
      <PageHeader title="About" />

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="max-w-[65ch] space-y-6 text-[1.0625rem] leading-[1.85] text-ink">
          <p>
            I'm Jack, a software developer based in Pasadena, CA. I graduated
            from CU Boulder in December 2024 and I'm currently looking for my
            first full-time role in tech.
          </p>
          <p>
            This is where I document that process honestly. What I'm building,
            what I'm learning, what's not working, and what it's actually like
            trying to break into the industry in 2026.
          </p>
          <p>
            Built with React, Tailwind CSS, and Supabase. Deployed on Vercel.
          </p>
        </div>
      </div>
    </div>
  );
}
