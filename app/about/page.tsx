import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About QuizBites — Live AI Quiz Tool for Classrooms",
  description:
    "QuizBites is a free live quiz platform for teachers. AI generates all the questions — your students compete in real time on any device.",
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-16 leading-relaxed">
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold text-blue-300 uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse inline-block" />
          Free forever for teachers
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          About QuizBites
        </h1>
        <p className="text-white/60 text-lg leading-relaxed">
          QuizBites is a live AI quiz platform built for teachers who want to run engaging, zero-prep sessions that students actually enjoy.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-10 p-6 rounded-2xl border border-blue-500/10 bg-blue-500/5">
        <h2 className="text-lg font-black text-white mb-3">Our mission</h2>
        <p className="text-white/60 text-sm leading-7">
          We believe that formative assessment should take 30 seconds to set up, not 30 minutes. QuizBites uses AI to generate quiz questions on any topic instantly — with explanations baked in — so students learn from every answer, not just get marked right or wrong.
        </p>
      </section>

      {/* How it works */}
      <section className="mb-10">
        <h2 className="text-lg font-black text-white mb-4">How it works</h2>
        <div className="space-y-4">
          {[
            { step: "01", title: "Pick a topic", desc: "Type any subject — maths, science, history, coding, or something completely custom. AI handles the rest." },
            { step: "02", title: "AI generates the quiz", desc: "Full quiz with questions, multiple-choice options, and AI-written explanations — ready in seconds, no prep needed." },
            { step: "03", title: "Students join and play live", desc: "Share the 6-character session code. Students join from any browser on any device — no account, no download." },
          ].map(item => (
            <div key={item.step} className="flex gap-4">
              <span className="text-xs font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
              <div>
                <div className="font-bold text-white text-sm mb-0.5">{item.title}</div>
                <div className="text-white/50 text-sm leading-relaxed">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Built with AI */}
      <section className="mb-10">
        <h2 className="text-lg font-black text-white mb-3">Built with AI — transparently</h2>
        <p className="text-white/55 text-sm leading-7">
          We use state-of-the-art AI models (including Groq, Gemini, and Anthropic) to generate quiz content. All AI-generated content is clearly marked. Our fallback chain ensures the platform stays fast even if one provider is slow — always free-first, paid-last.
        </p>
      </section>

      {/* Privacy */}
      <section className="mb-10">
        <h2 className="text-lg font-black text-white mb-3">Privacy first</h2>
        <p className="text-white/55 text-sm leading-7">
          Students join sessions with just a code — no account, no email, no data stored beyond the session. Teachers don&apos;t need to register to host. We collect only what&apos;s strictly necessary to run the platform.
          See our <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">Privacy Policy</Link> for full details.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-10">
        <h2 className="text-lg font-black text-white mb-3">Get in touch</h2>
        <p className="text-white/55 text-sm leading-7">
          We&apos;d love to hear from you — feedback, feature requests, bug reports, or school partnership enquiries are all welcome. Reach us at{" "}
          <a href="mailto:info.siva@gmail.com" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">info.siva@gmail.com</a>{" "}
          or use our <Link href="/contact" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">contact page</Link>.
        </p>
      </section>

      <p className="text-white/20 text-xs mt-10">© 2026 QuizBites. All rights reserved.</p>
    </main>
  );
}
