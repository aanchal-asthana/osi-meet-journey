import { ArrowDown, ArrowUp } from "lucide-react";
import type { Step } from "@/lib/osi";
import { cn } from "@/lib/utils";

const ENCAP = [
  { label: "Application Data", layer: 7, atStep: 7 },
  { label: "Transport Data / UDP", layer: 4, atStep: 8 },
  { label: "IP Packet", layer: 3, atStep: 9 },
  { label: "Data-Link Frame", layer: 2, atStep: 10 },
  { label: "Bits", layer: 1, atStep: 11 },
];

const DECAP = [
  { label: "Bits", layer: 1, atStep: 15 },
  { label: "Data-Link Frame", layer: 2, atStep: 16 },
  { label: "IP Packet", layer: 3, atStep: 17 },
  { label: "Transport Data", layer: 4, atStep: 18 },
  { label: "Application Data / Video Frame", layer: 7, atStep: 19 },
];

const TRANSIT = ["Router", "ISP", "Internet", "Google Meet Infrastructure", "Internet", "ISP", "Router"];

function Row({
  label,
  layer,
  state,
  dir,
  last,
}: {
  label: string;
  layer: number;
  state: "future" | "current" | "done";
  dir: "down" | "up";
  last: boolean;
}) {
  const Arrow = dir === "down" ? ArrowDown : ArrowUp;
  return (
    <li>
      <div
        className={cn(
          "flex items-center gap-2 border px-2 py-1.5 text-[0.74rem] transition-colors",
          state === "current"
            ? "border-active bg-active-soft font-semibold"
            : state === "done"
              ? "border-rule bg-done-soft/60 text-ink-soft"
              : "border-rule bg-surface text-muted-foreground",
        )}
      >
        <span className="font-mono text-[0.62rem] opacity-70">L{layer}</span>
        <span className="min-w-0 flex-1">{label}</span>
      </div>
      {!last && (
        <div className="flex justify-center py-[3px]">
          <Arrow
            className={cn("size-3", state === "done" ? "text-done" : "text-muted-foreground/60")}
          />
        </div>
      )}
    </li>
  );
}

export function EncapDecap({ step }: { step: Step }) {
  const stateFor = (atStep: number): "future" | "current" | "done" =>
    step.n === atStep ? "current" : step.n > atStep ? "done" : "future";

  return (
    <section className="panel p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-2">
        <h2 className="text-sm font-semibold tracking-tight">Encapsulation / decapsulation</h2>
        <p className="text-[0.7rem] text-muted-foreground">
          Sender adds headers going down · receiver removes them going up
        </p>
      </div>

      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
        <div>
          <p className="label-caps">Encapsulation — User A</p>
          <ol className="mt-2">
            {ENCAP.map((r, i) => (
              <Row
                key={r.label}
                label={r.label}
                layer={r.layer}
                state={stateFor(r.atStep)}
                dir="down"
                last={i === ENCAP.length - 1}
              />
            ))}
          </ol>
          {step.n >= 11 && (
            <p className="mt-2 text-[0.7rem] font-semibold text-done">✓ Encapsulation complete</p>
          )}
        </div>

        <div className="lg:w-52">
          <p className="label-caps">Network transmission</p>
          <ol className="mt-2 space-y-[3px]">
            {TRANSIT.map((t, i) => (
              <li
                key={t + i}
                className={cn(
                  "border px-2 py-1 text-center text-[0.7rem]",
                  step.phase === "network"
                    ? "border-net bg-net-soft text-foreground"
                    : step.phase === "receiver"
                      ? "border-rule bg-done-soft/50 text-ink-soft"
                      : "border-rule bg-surface text-muted-foreground",
                )}
              >
                {t}
              </li>
            ))}
          </ol>
        </div>

        <div>
          <p className="label-caps">Decapsulation — User B</p>
          <ol className="mt-2">
            {DECAP.map((r, i) => (
              <Row
                key={r.label}
                label={r.label}
                layer={r.layer}
                state={stateFor(r.atStep)}
                dir="up"
                last={i === DECAP.length - 1}
              />
            ))}
          </ol>
          {step.n >= 19 && (
            <p className="mt-2 text-[0.7rem] font-semibold text-done">✓ Decapsulation complete</p>
          )}
        </div>
      </div>
    </section>
  );
}