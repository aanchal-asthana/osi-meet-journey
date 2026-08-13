import { Mic, MicOff, Video, VideoOff, Lock, MonitorUp, PhoneOff, Users, Link2, Check } from "lucide-react";
import userA from "@/assets/user-a.jpg";
import userB from "@/assets/user-b.jpg";
import type { Step } from "@/lib/osi";
import { cn } from "@/lib/utils";

const MEET_LINK = "meet.google.com/abc-defg-hij";

function statusText(step: Step) {
  switch (step.meet) {
    case "create":
      return "Creating meeting…";
    case "link":
      return "Meeting link generated";
    case "joining":
      return "User B joining…";
    case "secure":
      return "Secure connection established";
    case "session":
      return "Session established · 2 participants";
    case "media":
      return "Camera and microphone ready";
    case "sending":
      return "Transmitting video frame";
    case "transit":
      return "Frame in transit across the network";
    case "received":
      return "Connected · video delivered";
  }
}

function Tile({
  name,
  role,
  src,
  camOn,
  micOn,
  overlay,
  pip,
  highlight,
  caption,
}: {
  name: string;
  role: string;
  src: string;
  camOn: boolean;
  micOn: boolean;
  overlay?: string | undefined;
  pip?: string | undefined;
  highlight?: boolean | undefined;
  caption?: string | undefined;
}) {
  return (
    <figure className="m-0">
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-md border bg-secondary",
          highlight ? "border-active shadow-[0_0_0_2px_var(--active-soft)]" : "border-border",
        )}
      >
        {camOn ? (
          <img
            src={src}
            alt={`${name} on the video call`}
            width={1280}
            height={720}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-surface">
            <span className="grid size-11 place-items-center rounded-full bg-border font-mono text-sm font-semibold text-ink-soft">
              {name.slice(0, 1)}
            </span>
            <span className="text-[0.7rem] text-muted-foreground">Camera off</span>
          </div>
        )}

        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/72 backdrop-blur-[1px]">
            <span className="rounded-sm border border-border bg-card px-2.5 py-1 text-[0.72rem] font-medium text-ink-soft">
              {overlay}
            </span>
          </div>
        )}

        {pip && (
          <img
            src={pip}
            alt=""
            width={1280}
            height={720}
            loading="lazy"
            className="absolute right-2 top-2 h-12 w-20 rounded border border-card/70 object-cover shadow-sm"
          />
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-foreground/70 to-transparent px-2.5 py-2">
          <span className="text-[0.72rem] font-medium text-primary-foreground">
            {name} <span className="opacity-70">· {role}</span>
          </span>
          <span className="flex items-center gap-1.5 text-primary-foreground">
            {micOn ? <Mic className="size-3.5" /> : <MicOff className="size-3.5 opacity-60" />}
            {camOn ? <Video className="size-3.5" /> : <VideoOff className="size-3.5 opacity-60" />}
          </span>
        </div>
      </div>
      {caption && (
        <figcaption className="mt-1.5 text-[0.7rem] text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}

export function MeetStage({
  step,
  started,
  side,
}: {
  step: Step;
  started: boolean;
  side?: "a" | "b";
}) {
  const aCamOn = started && step.n >= 6;
  const bJoined = step.n >= 3;
  const delivered = step.meet === "received";
  const elapsed = Math.max(0, step.n - 1) * 7;
  const timer = `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`;

  const tileA = (
    <Tile
      name="User A"
      role="Host"
      src={userA}
      camOn={aCamOn}
      micOn={step.n >= 6}
      highlight={step.phase === "sender" && step.n >= 6}
      overlay={step.n < 6 ? (step.n === 1 ? "Create a meeting" : "Preparing camera…") : undefined}
      caption={aCamOn ? "Camera ON — source of the video frame" : "Camera not yet enabled"}
    />
  );
  const tileB = (
    <Tile
      name="User B"
      role="Participant"
      src={delivered ? userA : userB}
      camOn={bJoined}
      micOn={bJoined}
      highlight={step.phase === "receiver"}
      pip={delivered ? userB : undefined}
      overlay={
        !bJoined
          ? "Waiting to join"
          : step.n === 3
            ? "Joining…"
            : delivered
              ? undefined
              : "Waiting for video…"
      }
      caption={
        delivered
          ? "Video received — frame from User A rendered on User B's screen"
          : "Waiting for the video frame from User A"
      }
    />
  );

  if (side) {
    return (
      <section className="panel overflow-hidden">
        <header className="flex items-center justify-between gap-2 border-b border-rule bg-surface px-2.5 py-1.5">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="grid size-4 shrink-0 place-items-center rounded-sm bg-primary text-[0.55rem] font-bold text-primary-foreground">
              M
            </span>
            <span className="truncate text-[0.72rem] font-semibold">
              {side === "a" ? "User A — Sender" : "User B — Receiver"}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[0.66rem] text-muted-foreground">
            <Lock className={cn("size-3", step.n >= 4 && "text-done")} />
            <span className="font-mono tabular-nums">{timer}</span>
          </span>
        </header>
        <div className="p-2.5">{side === "a" ? tileA : tileB}</div>
        <footer className="flex items-center justify-between gap-2 border-t border-rule bg-surface px-2.5 py-1.5">
          <span className="flex items-center gap-1">
            {[Mic, Video, MonitorUp].map((Icon, i) => (
              <span
                key={i}
                className="grid size-6 place-items-center rounded-sm border border-border bg-card text-ink-soft"
              >
                <Icon className="size-3" />
              </span>
            ))}
            <span className="grid size-6 place-items-center rounded-sm bg-destructive text-destructive-foreground">
              <PhoneOff className="size-3" />
            </span>
          </span>
          <span className="flex items-center gap-1 text-[0.66rem] text-ink-soft">
            <Users className="size-3" /> {bJoined ? 2 : 1}
          </span>
        </footer>
      </section>
    );
  }

  return (
    <section className="panel overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-rule bg-surface px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-sm bg-primary text-[0.6rem] font-bold text-primary-foreground">
            M
          </span>
          <span className="text-[0.8rem] font-semibold">Google Meet</span>
          <span className="flex items-center gap-1 font-mono text-[0.68rem] text-muted-foreground">
            <Link2 className="size-3" />
            {step.n >= 2 ? MEET_LINK : "generating link…"}
          </span>
        </div>
        <div className="flex items-center gap-3 text-[0.7rem] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="size-3.5" /> {bJoined ? 2 : 1}
          </span>
          <span className="flex items-center gap-1">
            <Lock className={cn("size-3.5", step.n >= 4 && "text-done")} />
            {step.n >= 4 ? "Encrypted" : "Negotiating"}
          </span>
          <span className="font-mono tabular-nums">{timer}</span>
        </div>
      </header>

      <div className="grid gap-3 p-3 sm:grid-cols-2">
        {tileA}
        {tileB}
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-rule bg-surface px-3 py-2">
        <div className="flex items-center gap-1.5">
          {[Mic, Video, MonitorUp].map((Icon, i) => (
            <span
              key={i}
              className="grid size-7 place-items-center rounded-sm border border-border bg-card text-ink-soft"
            >
              <Icon className="size-3.5" />
            </span>
          ))}
          <span className="grid size-7 place-items-center rounded-sm bg-destructive text-destructive-foreground">
            <PhoneOff className="size-3.5" />
          </span>
          {step.n === 3 && (
            <span className="ml-1 rounded-sm bg-primary px-2 py-1 text-[0.7rem] font-medium text-primary-foreground">
              Join now
            </span>
          )}
        </div>
        <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-soft">
          {delivered && <Check className="size-3.5 text-done" />}
          {statusText(step)}
        </span>
      </footer>
    </section>
  );
}