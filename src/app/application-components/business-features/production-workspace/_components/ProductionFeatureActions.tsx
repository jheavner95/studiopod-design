import { ArrowRight, ShieldCheck, UploadCloud, Download, Trash2 } from "lucide-react";
import { ProductionActions } from "@/components/platform/production";
import { Button } from "@/components/ui";
import type { ProductionDialogType } from "../_hooks/useProductionWorkspace";

interface ProductionFeatureActionsProps {
  artworkId: string;
  onOpenDialog: (type: ProductionDialogType, artworkId: string) => void;
}

/**
 * The feature's own Commands — every button here is wired to a dialog the
 * Business Feature owns opening (Confirmation/Validation/Publish/Export/
 * Delete), composing Platform's own ProductionActions (a re-export of
 * Operational's InspectorActions) as the layout shell and Foundation's own
 * Button for each command.
 */
export function ProductionFeatureActions({ artworkId, onOpenDialog }: ProductionFeatureActionsProps) {
  return (
    <ProductionActions>
      <Button variant="secondary" size="sm" leadingIcon={<ArrowRight className="size-4" aria-hidden />} onClick={() => onOpenDialog("confirm", artworkId)}>
        Advance stage
      </Button>
      <Button variant="secondary" size="sm" leadingIcon={<ShieldCheck className="size-4" aria-hidden />} onClick={() => onOpenDialog("validation", artworkId)}>
        Advance validation
      </Button>
      <Button variant="outline" size="sm" leadingIcon={<UploadCloud className="size-4" aria-hidden />} onClick={() => onOpenDialog("publish", artworkId)}>
        Publish
      </Button>
      <Button variant="outline" size="sm" leadingIcon={<Download className="size-4" aria-hidden />} onClick={() => onOpenDialog("export", artworkId)}>
        Export
      </Button>
      <Button variant="ghost" size="sm" leadingIcon={<Trash2 className="size-4" aria-hidden />} onClick={() => onOpenDialog("delete", artworkId)}>
        Delete
      </Button>
    </ProductionActions>
  );
}
