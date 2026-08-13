import { LAYERS } from "@/lib/osi";

export function LayerTable() {
  return (
    <section>
      <h2 className="border-b border-rule pb-2 text-sm font-semibold tracking-tight">
        The 7 OSI layers at a glance
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[0.76rem]">
          <thead>
            <tr className="border-b border-border">
              <th className="label-caps py-2 pr-3">Layer</th>
              <th className="label-caps py-2 pr-3">Name</th>
              <th className="label-caps py-2 pr-3">Role</th>
              <th className="label-caps py-2">Protocols</th>
            </tr>
          </thead>
          <tbody>
            {LAYERS.map((l) => (
              <tr key={l.n} className="border-b border-rule align-top">
                <td className="py-2 pr-3 font-mono text-[0.7rem] text-muted-foreground">{l.n}</td>
                <td className="py-2 pr-3 font-semibold">{l.name}</td>
                <td className="max-w-[26rem] py-2 pr-3 text-muted-foreground">{l.role}</td>
                <td className="py-2 font-mono text-[0.7rem] text-ink-soft">
                  {l.protocols.map((p) => p.abbr).join(" · ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}