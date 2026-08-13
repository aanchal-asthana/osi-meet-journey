import { layer, PHASE_LABEL, STEPS, type Step } from "@/lib/osi";
import { cn } from "@/lib/utils";

const JOURNEY = [
  { id: "video", label: "Video frame" },
  { id: "encap", label: "Encapsulation" },
  { id: "net", label: "Network" },
  { id: "decap", label: "Decapsulation" },
  { id: "display", label: "Video display" },
] as const;

function journeyStage(step: Step, started: boolean) {
  if (!started) return -1;
  if (step.phase === "network") return 2;
  if (step.phase === "sender") return step.packet === "none" ? 0 : 1;
  return step.n === STEPS.length ? 4 : 3;
}

export function CenterPanel({ step, started }: { step: Step; started: boolean }) {
  const l = step.layer ? layer(step.layer) : null;
  const stage = journeyStage(step, started);

  return (
    <div className="space-y-3">
      {/* Data journey strip */}
      <ol className="flex items-center justify-between gap-1 border border-rule bg-surface/70 px-2 py-2">
        {JOURNEY.map((j, i) => (
          <li key={j.id} className="flex min-w-0 flex-1 items-center gap-1">
            <span
              className={cn(
                "min-w-0 flex-1 truncate rounded-sm px-1.5 py-1 text-center text-[0.66rem] font-medium uppercase tracking-wide transition-colors",
                i === stage
                  ? "bg-active text-primary-foreground"
                  : i < stage
                    ? "bg-done-soft text-done"
                    : "text-muted-foreground",
              )}
            >
              {j.label}
            </span>
            {i < JOURNEY.length - 1 && (
              <span aria-hidden className="shrink-0 text-[0.7rem] text-muted-foreground">
                →
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Current layer information */}
      <section key={step.n} className="fade-step panel p-4">
        <div className="flex items-baseline justify-between border-b border-rule pb-2">
          <span className="label-caps">Current layer information</span>
          <span
            className={cn(
              "text-[0.68rem] font-semibold uppercase tracking-wide",
              !started
                ? "text-muted-foreground"
                : step.phase === "network"
                  ? "text-net"
                  : "text-active",
            )}
          >
            {started ? PHASE_LABEL[step.phase] : "Ready"}
          </span>
        </div>

        {l ? (
          <>
            <div className="mt-3 flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-sm bg-active font-mono text-base font-bold text-primary-foreground">
                {l.n}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold uppercase tracking-tight leading-none">
                  {l.name}
                </h3>
                <p className="mt-1.5 text-[0.82rem] leading-snug text-ink-soft">{l.role}</p>
              </div>
            </div>

            <h4 className="label-caps mt-4 border-t border-rule pt-3">Protocols</h4>
            <dl className="mt-2 grid gap-2 sm:grid-cols-2">
              {l.protocols.map((p) => (
                <div key={p.abbr} className="border-l-2 border-l-rule pl-2.5">
                  <dt className="text-[0.78rem] font-semibold">
                    {p.abbr}
                    <span className="ml-1.5 font-normal text-muted-foreground">— {p.full}</span>
                  </dt>
                  <dd className="text-[0.72rem] leading-snug text-muted-foreground">{p.purpose}</dd>
                </div>
              ))}
            </dl>

            {l.n === 5 && (
              <p className="mt-3 text-[0.68rem] leading-snug text-muted-foreground">
                Academic OSI mapping; real-world Google Meet architecture does not map one-to-one to
                OSI.
              </p>
            )}
          </>
        ) : (
          <div className="mt-3">
            <h3 className="text-lg font-semibold uppercase tracking-tight">Network transmission</h3>
            <p className="mt-1.5 text-[0.82rem] leading-snug text-ink-soft">
              The encapsulated frame travels between the two OSI stacks. Intermediate devices forward
              it without inspecting the application payload.
            </p>
          </div>
        )}

        <p className="mt-3 border-t border-rule pt-2.5 text-[0.78rem] leading-relaxed text-ink-soft">
          {step.what}
        </p>
        <p className="mt-1.5 font-mono text-[0.68rem] text-muted-foreground">{step.visual}</p>
      </section>
    </div>
  );
}
