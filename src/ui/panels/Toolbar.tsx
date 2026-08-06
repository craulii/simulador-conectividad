import { Layers, MousePointer2, RadioTower, Satellite } from "lucide-react";

import { IconButton } from "@/components/ui/IconButton";
import { Panel } from "@/components/ui/Panel";
import { useUiStore } from "@/state/useUiStore";

export function Toolbar() {
  const interactionMode = useUiStore((state) => state.interactionMode);
  const setInteractionMode = useUiStore((state) => state.setInteractionMode);
  const layersPanelOpen = useUiStore((state) => state.layersPanelOpen);
  const toggleLayersPanel = useUiStore((state) => state.toggleLayersPanel);

  return (
    <div className="absolute top-20 left-6">
      <Panel className="flex flex-col gap-1 p-1.5">
        <IconButton
          icon={<MousePointer2 size={18} strokeWidth={1.5} />}
          label="Seleccionar"
          active={interactionMode === "idle"}
          onClick={() => setInteractionMode("idle")}
        />
        <IconButton
          icon={<RadioTower size={18} strokeWidth={1.5} />}
          label="Agregar antena"
          active={interactionMode === "place-antenna"}
          onClick={() => setInteractionMode("place-antenna")}
        />
        <IconButton
          icon={<Satellite size={18} strokeWidth={1.5} />}
          label="Agregar satelite"
          active={interactionMode === "place-satellite"}
          onClick={() => setInteractionMode("place-satellite")}
        />
        <div className="mx-1.5 my-1 h-px bg-white/10" />
        <IconButton
          icon={<Layers size={18} strokeWidth={1.5} />}
          label="Capas"
          active={layersPanelOpen}
          onClick={toggleLayersPanel}
        />
      </Panel>
    </div>
  );
}
