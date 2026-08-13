import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { layer } from "@/lib/osi";

export function LayerDialog({
  layerNumber,
  onClose,
}: {
  layerNumber: number | null;
  onClose: () => void;
}) {
  const l = layerNumber ? layer(layerNumber) : null;

  return (
    <Dialog open={l !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg rounded-md">
        {l && (
          <>
            <DialogHeader>
              <DialogTitle className="text-base">
                Layer {l.n} — {l.name.toUpperCase()}
              </DialogTitle>
              <DialogDescription className="text-[0.8rem] leading-relaxed">
                {l.role}
              </DialogDescription>
            </DialogHeader>
            <div className="border-t border-rule pt-3">
              <h4 className="label-caps">Protocols</h4>
              <dl className="mt-2 space-y-3">
                {l.protocols.map((p) => (
                  <div key={p.abbr}>
                    <dt className="text-[0.8rem] font-semibold">
                      {p.abbr}
                      <span className="ml-1.5 font-normal text-muted-foreground">{p.full}</span>
                    </dt>
                    <dd className="text-[0.75rem] leading-snug text-muted-foreground">
                      {p.purpose}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[0.68rem] text-muted-foreground">
                PDU at this layer: {l.pdu}
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}