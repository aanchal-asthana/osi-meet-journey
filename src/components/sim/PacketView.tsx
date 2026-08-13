import type { PacketStage } from "@/lib/osi";
import { cn } from "@/lib/utils";

const ORDER: PacketStage[] = ["video", "udp", "ip", "frame", "bits"];

const SHELL: Record<Exclude<PacketStage, "none">, { label: string; header: string }> = {
  video: { label: "Video Frame", header: "payload" },
  udp: { label: "UDP Data", header: "transport header" },
  ip: { label: "IP Packet", header: "IP header" },
  frame: { label: "Data-Link Frame", header: "frame header / trailer" },
  bits: { label: "Bits", header: "0101 0110 1001 …" },
};

export function PacketView({ stage }: { stage: PacketStage }) {
  if (stage === "none") {
    return (
      <p className="text-[0.72rem] text-muted-foreground">
        No media payload yet — the call is still being set up.
      </p>
    );
  }

  const depth = ORDER.indexOf(stage);
  const shells = ORDER.slice(0, depth + 1).reverse();

  return (
    <div className="fade-step">
      {shells.reduce<React.ReactNode>((inner, s, idx) => {
        const info = SHELL[s as Exclude<PacketStage, "none">];
        const isCore = idx === 0;
        return (
          <div
            key={s}
            className={cn(
              "border p-1.5",
              isCore ? "border-active bg-active-soft" : "border-rule bg-surface",
            )}
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-wide text-ink-soft">
                {info.label}
              </span>
              <span className="font-mono text-[0.58rem] text-muted-foreground">{info.header}</span>
            </div>
            {isCore ? (
              <div className="bg-card px-2 py-1.5 text-center font-mono text-[0.65rem] text-active">
                {stage === "bits" ? "01001101 01100101 01100101 01110100" : info.label}
              </div>
            ) : (
              inner
            )}
          </div>
        );
      }, null)}
    </div>
  );
}