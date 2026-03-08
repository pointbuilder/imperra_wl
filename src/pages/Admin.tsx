import { useState, useEffect } from "react";
import { getContent, saveContent, defaultContent, type SiteContent } from "@/lib/content";

const ADMIN_PASS = "Pro76809";

const Field = ({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) => (
  <div>
    <label className="ark-mono text-[10px] uppercase tracking-widest text-foreground/25 block mb-2">
      {label}
    </label>
    {multiline ? (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full bg-secondary/50 border border-border p-4 text-foreground text-sm ark-mono outline-none focus:border-foreground/50 transition-colors resize-y"
      />
    ) : (
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-secondary/50 border border-border px-4 py-3 text-foreground text-lg ark-display outline-none focus:border-foreground/50 transition-colors"
      />
    )}
  </div>
);

const Section = ({
  title,
  num,
  children,
}: {
  title: string;
  num: string;
  children: React.ReactNode;
}) => (
  <div className="border border-border">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/30">
      <span className="ark-mono text-[10px] text-foreground/20">{num}</span>
      <span className="ark-mono text-xs uppercase tracking-widest text-foreground/60">{title}</span>
    </div>
    <div className="p-5 space-y-5">{children}</div>
  </div>
);

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContent(getContent());
  }, []);

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <form
          className="flex flex-col gap-5 w-full max-w-xs px-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === ADMIN_PASS) setAuthed(true);
          }}
        >
          <div className="text-center mb-4">
            <h1 className="ark-display text-foreground text-xl normal-case mb-1">Arkos</h1>
            <span className="ark-mono text-[10px] uppercase tracking-widest text-foreground/25">Admin Panel</span>
          </div>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            className="bg-transparent border-b border-foreground/20 pb-3 text-foreground text-base ark-mono outline-none placeholder:text-foreground/10 focus:border-foreground transition-colors text-center"
            autoFocus
          />
          <button
            type="submit"
            className="text-foreground text-sm ark-mono uppercase tracking-widest border border-foreground/30 py-3 hover:bg-foreground hover:text-background transition-all"
          >
            Enter
          </button>
          {pass && pass !== ADMIN_PASS && (
            <span className="text-destructive text-xs ark-mono text-center">Wrong password</span>
          )}
        </form>
      </div>
    );
  }

  const update = (key: keyof SiteContent, val: string) => {
    setContent((prev) => ({ ...prev, [key]: val }));
    setSaved(false);
  };

  const handleSave = () => {
    saveContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setContent(defaultContent);
    saveContent(defaultContent);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="ark-container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <span className="text-foreground font-bold uppercase tracking-wider text-sm">Arkos</span>
            <span className="ark-mono text-[10px] text-foreground/20 uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            {saved && (
              <span className="text-foreground/40 text-xs ark-mono animate-pulse">Saved ✓</span>
            )}
            <button
              onClick={handleReset}
              className="text-foreground/25 text-xs ark-mono uppercase tracking-widest hover:text-foreground transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="text-sm ark-mono uppercase tracking-widest bg-foreground text-background px-5 py-2 hover:opacity-80 transition-opacity"
            >
              Save
            </button>
            <a
              href="/"
              className="text-foreground/25 text-xs ark-mono uppercase tracking-widest hover:text-foreground transition-colors"
            >
              ← Site
            </a>
          </div>
        </div>
      </div>

      <div className="ark-container py-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <Section title="Hero" num="01">
            <Field label="Subtitle" value={content.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} multiline />
          </Section>

          <Section title="Problem" num="02">
            <Field label="Title" value={content.problemTitle} onChange={(v) => update("problemTitle", v)} />
            <Field label="Text" value={content.problemText} onChange={(v) => update("problemText", v)} multiline />
          </Section>

          <Section title="Solution" num="02b">
            <Field label="Title" value={content.solutionTitle} onChange={(v) => update("solutionTitle", v)} />
            <Field label="Text" value={content.solutionText} onChange={(v) => update("solutionText", v)} multiline />
          </Section>

          <Section title="Protocol" num="03">
            <Field label="Borrow" value={content.borrowDesc} onChange={(v) => update("borrowDesc", v)} multiline />
            <Field label="Lend" value={content.lendDesc} onChange={(v) => update("lendDesc", v)} multiline />
            <Field label="Leverage" value={content.leverageDesc} onChange={(v) => update("leverageDesc", v)} multiline />
            <Field label="Send" value={content.sendDesc} onChange={(v) => update("sendDesc", v)} multiline />
            <Field label="& More" value={content.moreDesc} onChange={(v) => update("moreDesc", v)} multiline />
          </Section>

          <div className="space-y-6">
            <Section title="Metrics" num="04">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Max LTV" value={content.maxLtv} onChange={(v) => update("maxLtv", v)} />
                <Field label="APY" value={content.projectedApy} onChange={(v) => update("projectedApy", v)} />
                <Field label="Leverage" value={content.maxLeverage} onChange={(v) => update("maxLeverage", v)} />
                <Field label="TVL" value={content.targetTvl} onChange={(v) => update("targetTvl", v)} />
              </div>
            </Section>

            <Section title="Security" num="05">
              <Field label="Description" value={content.securityText} onChange={(v) => update("securityText", v)} multiline />
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
