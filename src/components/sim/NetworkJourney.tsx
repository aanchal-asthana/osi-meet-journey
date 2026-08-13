import { Laptop, Router, Network, Cloud, Server } from "lucide-react";
import { NODES, PACKET_LABEL, type Step } from "@/lib/osi";
import { cn } from "@/lib/utils";

const ICONS = {
  device: Laptop,
  router: Router,
  node: Network,
  cloud: Cloud,
  server: Server,
} as const;

export function NetworkJourney({ step, started }: { step: Step; started: boolean }) {
  const activeIndex = NODES.findIndex((n) => n.id === step.node);
  const reached = step.phase === "receiver" ? NODES.length - 1 : activeIndex;

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-rule pb-2">
        <h3 className="text-[0.8rem] font-semibold tracking-tight">Network journey</h3>
        <span className="text-[0.68rem] text-muted-foreground">
          Conceptual network path for this OSI case study
        </span>
      </div>

      <ol className="mt-3 flex items-stretch gap-1 overflow-x-auto pb-1">
        {NODES.map((node, i) => {
          const Icon = ICONS[node.kind];
          const isActive = started && i === activeIndex;
          const isPast = started && i < reached;
          return (
            <li key={node.id + i} className="flex min-w-0 flex-1 items-center gap-1">
              <div
                className={cn(
                  "flex min-w-[74px] flex-1 flex-col items-center gap-1 border px-1.5 py-2 text-center transition-colors",
                  isActive
                    ? "border-net bg-net-soft"
                    : isPast
                      ? "border-rule bg-done-soft/60"
                      : "border-rule bg-surface",
                )}
              >
                <Icon
                  className={cn(
                    "size-4",
                    isActive ? "text-net" : isPast ? "text-done" : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "text-[0.63rem] leading-tight",
                    isActive ? "font-semibold text-foreground" : "text-muted-foreground",
                  )}
                >
                  {node.label}
                </span>
                {isActive && step.packet !== "none" && (
                  <span className="fade-step rounded-sm bg-net px-1.5 py-[1px] font-mono text-[0.58rem] text-primary-foreground">
                    {PACKET_LABEL[step.packet]}
                  </span>
                )}
              </div>
              {i < NODES.length - 1 && (
                <span
                  aria-hidden
                  className={cn("h-px w-2 shrink-0", isPast ? "bg-done" : "bg-rule")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}