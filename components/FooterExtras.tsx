const TOOLS = [
  { name: "Kwizzo",       url: "https://kwizzo.app",        desc: "Family quiz game" },
  { name: "Tutiq",        url: "https://tutiq.app",         desc: "AI personal tutor" },
  { name: "QuizBites",    url: "https://quizbites.app",     desc: "Live classroom quiz" },
  { name: "ResumeVault",  url: "https://resumevault.app",   desc: "AI resume builder" },
  { name: "WanderAI",     url: "https://ai-travel-planner-vert.vercel.app", desc: "AI travel planner" },
  { name: "WealthPilot",  url: "https://ai-investment-tracker-delta.vercel.app", desc: "Investment tracker" },
  { name: "SpeakFast",    url: "https://language-learning-bot-blue.vercel.app", desc: "Language learning" },
  { name: "ComplyScan",   url: "https://complybuddy-y3lj4k0nv-infosivas-projects.vercel.app", desc: "Compliance scanner" },
];

export default function FooterExtras() {
  return (
    <div className="border-t pt-8 mt-2" style={{ borderColor: 'var(--border, #fde68a)' }}>
      {/* More AI Tools */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--text-3, #64748b)' }}>More AI Tools</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {TOOLS.map((t) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: 'var(--text-2, #475569)', opacity: 0.75 }}
              title={t.desc}
            >
              {t.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
