import { layer, PHASE_LABEL, STEPS, type Step } from "@/lib/osi";
import { cn } from "@/lib/utils";

export function LayerPanel({
  step,
  onOpenLayer,
}: {
  step: Step;
  onOpenLayer: (n: number) => void;
}) {
  const l = step.layer ? layer(step.layer) : null;

  return (
    <section className="panel p-3">
      <div className="flex items-baseline justify-between border-b border-rule pb-2">
        <span className="label-caps">
          Step {step.n} of {STEPS.length}
        </span>
        <span
          className={cn(
            "text-[0.68rem] font-semibold uppercase tracking-wide",
            step.phase === "network" ? "text-net" : "text-active",
          )}
        >
          {PHASE_LABEL[step.phase]}
        </span>
      </div>

      {l ? (
        <button
          type="button"
          onClick={() => onOpenLayer(l.n)}
          className="mt-3 flex w-full items-center gap-3 border border-active bg-active-soft px-2.5 py-2 text-left transition-colors hover:bg-accent"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-active font-mono text-sm font-bold text-primary-foreground">
            {l.n}
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold uppercase tracking-wide">{l.name}</span>
            <span className="block text-[0.68rem] text-muted-foreground">
              PDU: {l.pdu} · click for protocol details
            </span>
          </span>
        </button>
      ) : (
        <div className="mt-3 border border-net bg-net-soft px-2.5 py-2">
          <span className="block text-sm font-semibold uppercase tracking-wide">
            Network transmission
          </span>
          <span className="block text-[0.68rem] text-muted-foreground">
            Between the two OSI stacks — intermediate devices forward the encapsulated frame.
          </span>
        </div>
      )}

      <div className="mt-3">
        <h4 className="label-caps">What is happening?</h4>
        <p key={step.n} className="fade-step mt-1 text-[0.8rem] leading-relaxed text-ink-soft">
          {step.what}
        </p>
        <p className="mt-2 border-l-2 border-rule pl-2 font-mono text-[0.68rem] text-muted-foreground">
          {step.visual}
        </p>
      </div>

      {l && (
        <div className="mt-3 border-t border-rule pt-3">
          <h4 className="label-caps">Protocols</h4>
          <dl className="mt-1.5 space-y-2">
            {l.protocols.map((p) => (
              <div key={p.abbr}>
                <dt className="text-[0.75rem] font-semibold">
                  {p.abbr}
                  <span className="ml-1.5 font-normal text-muted-foreground">{p.full}</span>
                </dt>
                <dd className="text-[0.72rem] leading-snug text-muted-foreground">{p.purpose}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}