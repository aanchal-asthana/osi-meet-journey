import { LAYERS } from "@/lib/osi";
import { cn } from "@/lib/utils";

type Props = {
  side: "sender" | "receiver";
  activeLayer: number | null;
  subLayers?: number[];
  completed: number[];
  onLayerClick: (n: number) => void;
};

export function OsiStack({ side, activeLayer, subLayers = [], completed, onLayerClick }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between border-b border-rule pb-2">
        <h3 className="text-[0.8rem] font-semibold tracking-tight">
          {side === "sender" ? "User A — Sender" : "User B — Receiver"}
        </h3>
        <span className="label-caps">{side === "sender" ? "L7 ↓ L1" : "L1 ↑ L7"}</span>
      </div>
      <ol className="mt-3 space-y-[3px]">
        {LAYERS.map((l) => {
          const isActive = activeLayer === l.n || subLayers.includes(l.n);
          const isDone = completed.includes(l.n) && !isActive;
          return (
            <li key={l.n}>
              <button
                type="button"
                onClick={() => onLayerClick(l.n)}
                className={cn(
                  "flex w-full items-center gap-2 border-l-2 px-2 py-[7px] text-left transition-colors",
                  isActive
                    ? "border-l-active bg-active-soft"
                    : isDone
                      ? "border-l-done bg-done-soft/60"
                      : "border-l-rule bg-surface/60 hover:bg-secondary",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-sm font-mono text-[0.65rem] font-semibold",
                    isActive
                      ? "bg-active text-primary-foreground"
                      : isDone
                        ? "bg-done text-primary-foreground"
                        : "bg-border text-ink-soft",
                  )}
                >
                  {l.n}
                </span>
                <span
                  className={cn(
                    "flex-1 truncate text-[0.78rem]",
                    isActive
                      ? "font-semibold text-foreground"
                      : isDone
                        ? "text-ink-soft"
                        : "text-muted-foreground",
                  )}
                >
                  {l.name}
                </span>
                {isActive && (
                  <span className="ring-active size-[7px] shrink-0 rounded-full bg-active" aria-hidden />
                )}
                {isDone && <span className="text-[0.7rem] text-done">✓</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}