import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
      <DialogContent className="max-w-sm rounded-md">
        {l && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-base tracking-tight">
                Layer {l.n} — {l.name.toUpperCase()}
              </DialogTitle>
            </DialogHeader>
            <dl className="space-y-3 border-t border-rule pt-3">
              {l.protocols.map((p) => (
                <div key={p.abbr}>
                  <dt className="text-[0.82rem] font-semibold">{p.abbr}</dt>
                  <dd className="text-[0.75rem] text-muted-foreground">{p.full}</dd>
                </div>
              ))}
            </dl>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
