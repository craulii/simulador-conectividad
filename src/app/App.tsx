import { CanvasRoot } from "@/renderer/CanvasRoot";
import { SceneRoot } from "@/scene/SceneRoot";

export function App() {
  return (
    <div className="relative h-full w-full bg-black">
      <CanvasRoot>
        <SceneRoot />
      </CanvasRoot>
      <div className="pointer-events-none absolute left-6 top-6 select-none">
        <p className="text-sm font-semibold tracking-[0.2em] text-slate-100 uppercase">
          Simulador de Conectividad
        </p>
      </div>
    </div>
  );
}
