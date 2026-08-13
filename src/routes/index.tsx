import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { EncapDecap } from "@/components/sim/EncapDecap";
import { LayerDialog } from "@/components/sim/LayerDialog";
import { LayerPanel } from "@/components/sim/LayerPanel";
import { LayerTable } from "@/components/sim/LayerTable";
import { MeetStage } from "@/components/sim/MeetStage";
import { NetworkJourney } from "@/components/sim/NetworkJourney";
import { OsiStack } from "@/components/sim/OsiStack";
import { PacketView } from "@/components/sim/PacketView";
import { StepList } from "@/components/sim/StepList";
import { PHASE_LABEL, STEPS } from "@/lib/osi";
import { cn } from "@/lib/utils";

const TITLE = "Google Meet – OSI Model Simulation";
const DESC =
  "Interactive Computer Networks lab simulation: follow a video frame from User A's camera to User B's screen through all 7 OSI layers.";

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

const SENDER_ORDER = [7, 6, 5, 4, 3, 2, 1];
const RECEIVER_ORDER = [1, 2, 3, 4, 5, 6, 7];

function Index() {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [auto, setAuto] = useState(false);
  const [dialogLayer, setDialogLayer] = useState<number | null>(null);

  const step = STEPS[index]!;
  const isLast = index === STEPS.length - 1;

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, STEPS.length - 1)), []);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  useEffect(() => {
    if (!auto) return;
    if (isLast) {
      setAuto(false);
      return;
    }
    const t = setTimeout(next, 2400);
    return () => clearTimeout(t);
  }, [auto, isLast, index, next]);

  const start = () => {
    setStarted(true);
    setIndex(0);
  };
  const restart = () => {
    setStarted(false);
    setAuto(false);
    setIndex(0);
  };

  const { senderActive, senderDone, receiverActive, receiverDone, receiverSubs } = useMemo(() => {
    if (!started) {
      return {
        senderActive: null as number | null,
        senderDone: [] as number[],
        receiverActive: null as number | null,
        receiverDone: [] as number[],
        receiverSubs: [] as number[],
      };
    }
    if (step.phase === "sender") {
      const pos = SENDER_ORDER.indexOf(step.layer ?? 7);
      return {
        senderActive: step.layer,
        senderDone: SENDER_ORDER.slice(0, pos),
        receiverActive: null,
        receiverDone: [],
        receiverSubs: [],
      };
    }
    if (step.phase === "network") {
      return {
        senderActive: null,
        senderDone: SENDER_ORDER,
        receiverActive: null,
        receiverDone: [],
        receiverSubs: [],
      };
    }
    const subs = step.subLayers ?? [];
    const highest = Math.max(step.layer ?? 1, ...subs, 1);
    const pos = RECEIVER_ORDER.indexOf(highest);
    return {
      senderActive: null,
      senderDone: SENDER_ORDER,
      receiverActive: step.layer,
      receiverDone: RECEIVER_ORDER.slice(0, pos),
      receiverSubs: subs,
    };
  }, [started, step]);

  return (
    <main className="mx-auto max-w-[1360px] px-4 pb-16 pt-8 sm:px-6">
      <header className="border-b border-border pb-5">
        <p className="label-caps">Computer Networks Laboratory · Case Study</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">{TITLE}</h1>
        <p className="mt-2 max-w-3xl text-[0.85rem] leading-relaxed text-muted-foreground">
          Follow a video frame from User A&apos;s camera to User B&apos;s screen through the 7-layer
          OSI model.
        </p>
      </header>

      {/* Controls */}
      <div className="sticky top-0 z-20 -mx-4 mb-6 flex flex-wrap items-center gap-2 border-b border-border bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
        {!started ? (
          <button
            type="button"
            onClick={start}
            className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[0.78rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Play className="size-3.5" /> Start simulation
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={prev}
              disabled={index === 0}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[0.78rem] font-medium transition-colors hover:bg-secondary disabled:opacity-45"
            >
              <SkipBack className="size-3.5" /> Previous
            </button>
            <button
              type="button"
              onClick={next}
              disabled={isLast}
              className="inline-flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 text-[0.78rem] font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-45"
            >
              Next step <SkipForward className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setAuto((a) => !a)}
              disabled={isLast}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-[0.78rem] font-medium transition-colors disabled:opacity-45",
                auto ? "border-active bg-active-soft text-active" : "border-border bg-card hover:bg-secondary",
              )}
            >
              {auto ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              {auto ? "Pause" : "Auto play"}
            </button>
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-3 py-1.5 text-[0.78rem] font-medium transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-3.5" /> Restart
            </button>
          </>
        )}
        <div className="ml-auto flex items-center gap-3">
          <span className="font-mono text-[0.72rem] tabular-nums text-muted-foreground">
            Step {started ? step.n : 0} of {STEPS.length}
          </span>
          <span
            className={cn(
              "text-[0.7rem] font-semibold uppercase tracking-wide",
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
      </div>

      {/* Main simulation: User A + stack | centre | stack + User B */}
      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:items-start">
        {/* Sender endpoint */}
        <section className="space-y-3">
          <MeetStage step={started ? step : STEPS[0]!} started={started} side="a" />
          <OsiStack
            side="sender"
            activeLayer={senderActive}
            completed={senderDone}
            onLayerClick={setDialogLayer}
          />
        </section>

        {/* Centre */}
        <div className="space-y-4">
          <CenterPanel step={started ? step : STEPS[0]!} started={started} />
          <NetworkJourney step={step} started={started} />
          <section className="panel p-3">
            <h3 className="label-caps">Packet at this step</h3>
            <div className="mt-2">
              <PacketView stage={started ? step.packet : "none"} />
            </div>
          </section>

          {isLast && started && (
            <div className="fade-step border-l-2 border-l-done bg-done-soft/60 px-3 py-2.5">
              <p className="text-[0.8rem] font-semibold text-foreground">
                ✓ Video frame successfully delivered from User A to User B.
              </p>
              <p className="mt-1 text-[0.75rem] leading-relaxed text-ink-soft">
                At the sender, data moves down the OSI stack through encapsulation. After
                transmission across the network, the receiver processes the data upward through
                decapsulation until the application can display the video.
              </p>
            </div>
          )}
        </div>

        {/* Receiver endpoint */}
        <section className="space-y-3">
          <MeetStage step={started ? step : STEPS[0]!} started={started} side="b" />
          <OsiStack
            side="receiver"
            activeLayer={receiverActive}
            subLayers={receiverSubs}
            completed={receiverDone}
            onLayerClick={setDialogLayer}
          />
        </section>
      </div>

      <div className="mt-8 space-y-8">
        <StepList
          current={index + 1}
          onSelect={(n) => {
            setStarted(true);
            setAuto(false);
            setIndex(n - 1);
          }}
        />
        <EncapDecap step={step} />
        <LayerTable />

        <section>
          <h2 className="border-b border-rule pb-2 text-sm font-semibold tracking-tight">
            Final takeaways
          </h2>
          <ul className="mt-3 grid gap-2 text-[0.8rem] leading-relaxed text-ink-soft sm:grid-cols-2">
            <li className="border-l-2 border-l-rule pl-3">
              User A: camera → 7 OSI layers → network → 7 OSI layers → User B: video displayed.
            </li>
            <li className="border-l-2 border-l-rule pl-3">
              Encapsulation adds a header at each layer on the way down; decapsulation removes one at
              each layer on the way up.
            </li>
            <li className="border-l-2 border-l-rule pl-3">
              Intermediate devices (routers, ISP nodes) forward the packet without ever inspecting the
              application payload.
            </li>
            <li className="border-l-2 border-l-rule pl-3">
              Real-time video prefers low-latency transport, so a lost frame is tolerated rather than
              retransmitted.
            </li>
          </ul>
          <p className="mt-4 border-t border-rule pt-3 text-[0.7rem] leading-relaxed text-muted-foreground">
            This is an educational OSI-model representation of a modern video-conferencing system.
            Real-world Google Meet networking uses modern Internet protocols and architectures that do
            not map perfectly one-to-one onto the seven OSI layers.
          </p>
        </section>
      </div>

      <LayerDialog layerNumber={dialogLayer} onClose={() => setDialogLayer(null)} />
    </main>
  );
}
