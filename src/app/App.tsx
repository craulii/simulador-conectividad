import { CanvasRoot } from "@/renderer/CanvasRoot";
import { SceneRoot } from "@/scene/SceneRoot";
import { AppHeader } from "@/ui/panels/AppHeader";
import { ElementInspector } from "@/ui/panels/ElementInspector";
import { LayersPanel } from "@/ui/panels/LayersPanel";
import { Toolbar } from "@/ui/panels/Toolbar";

export function App() {
  return (
    <div className="relative h-full w-full bg-black">
      <CanvasRoot>
        <SceneRoot />
      </CanvasRoot>

      <div className="pointer-events-none absolute inset-0">
        <div className="pointer-events-auto">
          <AppHeader />
          <Toolbar />
          <LayersPanel />
          <ElementInspector />
        </div>
      </div>
    </div>
  );
}
