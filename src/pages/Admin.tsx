import { useState, useEffect } from "react";
import { getContent, saveContent, defaultContent, type SiteContent } from "@/lib/content";

const ADMIN_PASS = "Pro76809";

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
          className="flex flex-col gap-4 w-full max-w-sm px-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (pass === ADMIN_PASS) setAuthed(true);
          }}
        >
          <h1 className="ark-display text-foreground text-2xl normal-case">Admin</h1>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            className="bg-transparent border-b border-foreground/30 pb-3 text-foreground text-base ark-mono outline-none placeholder:text-foreground/15 focus:border-foreground transition-colors"
          />
          <button
            type="submit"
            className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity self-start"
          >
            → Sign In
          </button>
          {pass && pass !== ADMIN_PASS && (
            <span className="text-destructive text-xs ark-mono">Wrong password</span>
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
  };

  const handleReset = () => {
    setContent(defaultContent);
    saveContent(defaultContent);
    setSaved(true);
  };

  const fields: { key: keyof SiteContent; label: string; multiline?: boolean }[] = [
    { key: "heroSubtitle", label: "Hero — subtitle", multiline: true },
    { key: "statementText", label: "Statement — main text", multiline: true },
    { key: "borrowDesc", label: "Borrow — description", multiline: true },
    { key: "lendDesc", label: "Lend — description", multiline: true },
    { key: "leverageDesc", label: "Leverage — description", multiline: true },
    { key: "securityText", label: "Security — description", multiline: true },
    { key: "maxLtv", label: "Max LTV" },
    { key: "projectedApy", label: "Projected APY" },
    { key: "maxLeverage", label: "Max Leverage" },
    { key: "targetTvl", label: "Target TVL" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="ark-container py-16">
        <div className="flex items-center justify-between mb-12">
          <h1 className="ark-display text-foreground text-3xl normal-case">Arkos Admin</h1>
          <a
            href="/"
            className="text-foreground/30 text-sm ark-mono uppercase tracking-widest hover:text-foreground transition-colors"
          >
            ← Site
          </a>
        </div>

        <div className="space-y-8">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="ark-mono text-xs uppercase tracking-widest text-foreground/30 block mb-3">
                {f.label}
              </label>
              {f.multiline ? (
                <textarea
                  value={content[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border border-border p-4 text-foreground text-sm ark-mono outline-none focus:border-foreground transition-colors resize-y"
                />
              ) : (
                <input
                  value={content[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="w-full bg-transparent border-b border-border pb-3 text-foreground text-lg ark-display outline-none focus:border-foreground transition-colors"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6 mt-12">
          <button
            onClick={handleSave}
            className="text-foreground text-sm ark-mono uppercase tracking-widest border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
          >
            → Сохранить
          </button>
          <button
            onClick={handleReset}
            className="text-foreground/30 text-sm ark-mono uppercase tracking-widest hover:text-foreground transition-colors"
          >
            Сбросить
          </button>
          {saved && (
            <span className="text-foreground/50 text-xs ark-mono">Сохранено ✓</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
