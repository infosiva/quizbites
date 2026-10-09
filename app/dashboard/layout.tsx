import { DashboardShell } from "@/components/DashboardShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ ["--bg" as string]: "#fffbf5", ["--fg" as string]: "#1c1917", ["--accent" as string]: "#ea580c" }}>
      <DashboardShell
        brand={<span className="font-semibold">QuizBites</span>}
        nav={[{ href: "/dashboard", label: "Dashboard" }, { href: "/", label: "Play" }]}
      >
        {children}
      </DashboardShell>
    </div>
  );
}
