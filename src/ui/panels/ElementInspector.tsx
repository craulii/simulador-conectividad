import { AnimatePresence, motion } from "motion/react";

import { Panel } from "@/components/ui/Panel";
import { useNetworkStore } from "@/state/useNetworkStore";

const KIND_LABELS: Record<string, string> = {
  antenna: "Antena",
  satellite: "Satelite",
  groundStation: "Estacion terrestre",
};

export function ElementInspector() {
  const selected = useNetworkStore((state) =>
    state.selectedId ? state.elements[state.selectedId] : undefined,
  );

  return (
    <AnimatePresence>
      {selected && (
        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-20 right-6 w-64"
        >
          <Panel className="p-4">
            <p className="text-[11px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              {KIND_LABELS[selected.kind]}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-100">{selected.name}</p>
          </Panel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
