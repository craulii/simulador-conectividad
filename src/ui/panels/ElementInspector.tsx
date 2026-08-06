import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { FormField } from "@/components/ui/FormField";
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
  const updateElement = useNetworkStore((state) => state.updateElement);
  const removeElement = useNetworkStore((state) => state.removeElement);

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
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.15em] text-slate-500 uppercase">
                {KIND_LABELS[selected.kind]}
              </p>
              <button
                type="button"
                onClick={() => removeElement(selected.id)}
                title="Eliminar"
                className="text-slate-500 transition-colors hover:text-red-400"
              >
                <Trash2 size={15} strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-3">
              <FormField
                label="Nombre"
                value={selected.name}
                onChange={(value) => updateElement(selected.id, { name: value })}
              />

              {selected.kind === "antenna" && (
                <>
                  <FormField
                    label="Altura"
                    type="number"
                    suffix="m"
                    value={selected.data.heightMeters}
                    onChange={(value) =>
                      updateElement(selected.id, {
                        data: { ...selected.data, heightMeters: Number(value) },
                      })
                    }
                  />
                  <FormField
                    label="Potencia"
                    type="number"
                    suffix="dBm"
                    value={selected.data.powerDbm}
                    onChange={(value) =>
                      updateElement(selected.id, {
                        data: { ...selected.data, powerDbm: Number(value) },
                      })
                    }
                  />
                  <FormField
                    label="Frecuencia"
                    type="number"
                    suffix="MHz"
                    value={selected.data.frequencyMhz}
                    onChange={(value) =>
                      updateElement(selected.id, {
                        data: { ...selected.data, frequencyMhz: Number(value) },
                      })
                    }
                  />
                </>
              )}
            </div>
          </Panel>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
