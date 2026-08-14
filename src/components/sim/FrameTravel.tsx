import { Video } from "lucide-react";
import { LAYERS } from "@/lib/osi";
import { cn } from "@/lib/utils";

const ROW = 37; // row height + gap, matches OsiStack rows

export function FrameTravel({
  activeLayer,
  sideOfFrame,
  started,
  transmitting,
  delivered,
}: {
  activeLayer: number | null;
  sideOfFrame: "sender" | "receiver";
  started: boolean;
  transmitting: boolean;
  delivered: boolean;
}) {
  const idx = activeLayer ? LAYERS.findIndex((l) => l.n === activeLayer) : 0;
  const y = transmitting ? 6 * ROW : idx * ROW;
  const x = sideOfFrame === "sender" ? -14 : 14;

  return (
    <div className="relative" style={{ height: 7 * ROW }} aria-hidden={!started}>
      {/* guide rail */}
      <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-rule" />

      <div
        className="absolute left-1/2 top-0 transition-transform duration-500 ease-in-out"
        style={{ transform: `translate(calc(-50% + ${x}px), ${y}px)` }}
      >
        <div
          className={cn(
            "flex w-[132px] flex-col items-center gap-1 rounded-md border px-2 py-1.5 shadow-sm",
            delivered
              ? "border-done bg-done-soft"
              : transmitting
                ? "border-net bg-net-soft"
                : "border-active bg-active-soft",
          )}
        >
          <span className="label-caps">Video frame</span>
          <Video
            className={cn(
              "size-4",
              delivered ? "text-done" : transmitting ? "text-net" : "text-active",
            )}
          />
        </div>
      </div>
    </div>
  );
}