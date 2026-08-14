import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Check } from "lucide-react";
import { FrameTravel } from "@/components/sim/FrameTravel";
import { LayerDialog } from "@/components/sim/LayerDialog";
import { MeetStage } from "@/components/sim/MeetStage";
import { OsiStack } from "@/components/sim/OsiStack";
import { STEPS } from "@/lib/osi";
import { cn } from "@/lib/utils";

const TITLE = "Google Meet – OSI Model Simulation";
const DESC =
  "Interactive OSI simulation: watch a single video frame travel down User A's 7 OSI layers and back up User B's 7 layers.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SENDER = [7, 6, 5, 4, 3, 2, 1];
const RECEIVER = [1, 2, 3, 4, 5, 6, 7];
const TOTAL = 15; // 0-6 sender, 7 transmission, 8-14 receiver

/** Reused Meet visuals: camera-ready step for the journey, delivered step at the end. */
const STEP_LIVE = STEPS[5]!;
const STEP_DONE = STEPS[18]!;

function Index() {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState(false);
  const [dialogLayer, setDialogLayer] = useState<number | null>(null);

  const isLast = i === TOTAL - 1;
  const next = useCallback(() => setI((v) => Math.min(v + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  useEffect(() => {
    if (!auto) return;
    if (isLast) {
      setAuto(false);
      return;
    }
    const t = setTimeout(next, i === 7 ? 1600 : 1100);
    return () => clearTimeout(t);
  }, [auto, isLast, i, next]);

  const transmitting = started && i === 7;
  const phase: "sender" | "transmission" | "receiver" = !started
    ? "sender"
    : i < 7
      ? "sender"
      : i === 7
        ? "transmission"
        : "receiver";

  const senderPos = started ? Math.min(i, 6) : -1;
  const receiverPos = started && i > 7 ? i - 8 : -1;

  const senderActive = started && i < 7 ? SENDER[i]! : null;
  const receiverActive = receiverPos >= 0 ? RECEIVER[receiverPos]! : null;
  const senderDone = started ? SENDER.slice(0, Math.max(0, Math.min(i, 7))) : [];
  const receiverDone = receiverPos > 0 ? RECEIVER.slice(0, receiverPos) : [];

  const activeLayer = senderActive ?? receiverActive ?? (transmitting ? 1 : 7);
  const delivered = started && isLast;

  const status =
    !started
      ? "Ready"
      : phase === "sender"
        ? "Sender — Encapsulation"
        : phase === "transmission"
          ? "Transmission"
          : "Receiver — Decapsulation";

  const meetStep = delivered ? STEP_DONE : STEP_LIVE;

  const reset = () => {
    setStarted(false);
    setAuto(false);
    setI(0);
  };

  return (
    <main className="mx-auto max-w-[1180px] px-4 pb-14 pt-7 sm:px-6">
      <header className="border-b border-border pb-4">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{TITLE}</h1>
        <p className="mt-1.5 text-[0.82rem] text-muted-foreground">
          One video frame travels down User A&apos;s OSI stack and up User B&apos;s stack.
        </p>
      </header>

      <div className="mb-6 mt-4 flex flex-wrap items-center gap-2">
        {!started ? (
          <button
            type="button"
            onClick={() => {
              setStarted(true);
              setI(0);
              setAuto(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[0.78rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Play className="size-3.5" /> Start
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setAuto((a) => !a)}
              disabled={isLast}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[0.78rem] font-medium transition-colors disabled:opacity-45",
                auto
                  ? "border-active bg-active-soft text-active"
                  : "border-border bg-card hover:bg-secondary",
              )}
            >
              {auto ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {auto ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={prev}
              disabled={i === 0}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[0.78rem] font-medium transition-colors hover:bg-secondary disabled:opacity-45"
            >
              <SkipBack className="size-3.5" /> Previous
            </button>
            <button
              type="button"
              onClick={next}
              disabled={isLast}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[0.78rem] font-medium transition-colors hover:bg-secondary disabled:opacity-45"
            >
              Next <SkipForward className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[0.78rem] font-medium transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </>
        )}
        <span
          className={cn(
            "ml-auto text-[0.7rem] font-semibold uppercase tracking-wide",
            !started
              ? "text-muted-foreground"
              : phase === "transmission"
                ? "text-net"
                : delivered
                  ? "text-done"
                  : "text-active",
          )}
        >
          {delivered ? "Video received" : status}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)]">
        <MeetStage step={meetStep} started={started} side="a" />
        <div className="hidden lg:block" />
        <MeetStage step={meetStep} started={started} side="b" />
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1fr)_200px_minmax(0,1fr)] lg:items-start">
        <OsiStack
          side="sender"
          activeLayer={senderActive}
          completed={senderDone}
          onLayerClick={setDialogLayer}
        />

        <div>
          {/* spacer matching the stack headers so the frame aligns with layer rows */}
          <div className="hidden pb-2 text-[0.8rem] font-semibold lg:block" aria-hidden>
            &nbsp;
          </div>
          <div className="mt-3">
            <FrameTravel
              activeLayer={activeLayer}
              sideOfFrame={phase === "receiver" ? "receiver" : "sender"}
              started={started}
              transmitting={transmitting}
              delivered={delivered}
            />
          </div>
          <p
            className={cn(
              "mt-2 text-center text-[0.68rem] font-medium",
              transmitting ? "text-net" : delivered ? "text-done" : "text-muted-foreground",
            )}
          >
            {transmitting ? (
              "Transmission complete — frame received"
            ) : delivered ? (
              <span className="inline-flex items-center gap-1">
                <Check className="size-3" /> Video received
              </span>
            ) : started ? (
              phase === "sender" ? "Moving down: L7 → L1" : "Moving up: L1 → L7"
            ) : (
              "Press Start"
            )}
          </p>
        </div>

        <OsiStack
          side="receiver"
          activeLayer={receiverActive}
          subLayers={[]}
          completed={receiverDone}
          onLayerClick={setDialogLayer}
        />
      </div>

      <LayerDialog layerNumber={dialogLayer} onClose={() => setDialogLayer(null)} />
    </main>
  );
}
