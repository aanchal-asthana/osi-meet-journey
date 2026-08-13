import { PHASE_LABEL, STEPS, type Phase } from "@/lib/osi";
import { cn } from "@/lib/utils";

const PHASES: Phase[] = ["sender", "network", "receiver"];

export function StepList({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (n: number) => void;
}) {
  return (
    <nav aria-label="Simulation steps">
      <h3 className="border-b border-rule pb-2 text-[0.8rem] font-semibold tracking-tight">
        Simulation steps
      </h3>
      <div className="mt-2 space-y-3">
        {PHASES.map((phase) => (
          <div key={phase}>
            <p className="label-caps">{PHASE_LABEL[phase]}</p>
            <ol className="mt-1">
              {STEPS.filter((s) => s.phase === phase).map((s) => {
                const isCurrent = s.n === current;
                const isDone = s.n < current;
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => onSelect(s.n)}
                      className={cn(
                        "flex w-full items-start gap-2 border-l-2 py-[5px] pl-2 pr-1 text-left text-[0.75rem] transition-colors",
                        isCurrent
                          ? "border-l-active bg-active-soft font-semibold"
                          : isDone
                            ? "border-l-done text-ink-soft hover:bg-secondary"
                            : "border-l-rule text-muted-foreground hover:bg-secondary",
                      )}
                    >
                      <span className="w-4 shrink-0 font-mono text-[0.65rem] tabular-nums opacity-70">
                        {s.n}
                      </span>
                      <span className="min-w-0 flex-1 leading-snug">{s.title}</span>
                      <span className="shrink-0 font-mono text-[0.62rem] opacity-70">
                        {s.layer ? `L${s.layer}${s.subLayers ? "–6" : ""}` : "NET"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>
    </nav>
  );
}