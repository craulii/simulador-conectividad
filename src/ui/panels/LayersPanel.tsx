import { AnimatePresence, motion } from "motion/react";

import { Panel } from "@/components/ui/Panel";
import { Toggle } from "@/components/ui/Toggle";
import { LAYER_DEFINITIONS } from "@/domain/layer";
import { useLayerStore } from "@/state/useLayerStore";
import { useUiStore } from "@/state/useUiStore";

export function LayersPanel() {
  const open = useUiStore((state) => state.layersPanelOpen);
  const layers = useLayerStore((state) => state.layers);
  const toggleLayer = useLayerStore((state) => state.toggleLayer);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute top-20 left-20 w-56"
        >
          <Panel className="p-3">
            <p className="mb-2 px-1 text-[11px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
              Capas
            </p>
            <div className="flex flex-col divide-y divide-white/5">
              {LAYER_DEFINITIONS.map((layer) => (
                <Toggle
                  key={layer.id}
                  label={layer.label}
                  checked={layers[layer.id]}
                  onChange={() => toggleLayer(layer.id)}
                />
              ))}
            </div>
          </Panel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
