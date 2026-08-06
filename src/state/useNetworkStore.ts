import { create } from "zustand";

import type { Link } from "@/domain/link";
import type { NetworkElement } from "@/domain/networkElement";

interface NetworkState {
  elements: Record<string, NetworkElement>;
  links: Record<string, Link>;
  selectedId: string | null;

  addElement: (element: NetworkElement) => void;
  updateElement: (id: string, patch: Partial<NetworkElement>) => void;
  removeElement: (id: string) => void;

  addLink: (link: Link) => void;
  removeLink: (id: string) => void;

  select: (id: string | null) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  elements: {},
  links: {},
  selectedId: null,

  addElement: (element) =>
    set((state) => ({ elements: { ...state.elements, [element.id]: element } })),

  updateElement: (id, patch) =>
    set((state) => {
      const existing = state.elements[id];
      if (!existing) return state;
      // Callers only ever patch fields belonging to the element's own
      // kind, but a discriminated union can't express that constraint
      // through a generic partial without per-kind update actions that
      // nothing needs yet.
      const merged = { ...existing, ...patch } as NetworkElement;
      return { elements: { ...state.elements, [id]: merged } };
    }),

  removeElement: (id) =>
    set((state) => {
      if (!(id in state.elements)) return state;
      const elements = { ...state.elements };
      delete elements[id];
      return {
        elements,
        selectedId: state.selectedId === id ? null : state.selectedId,
      };
    }),

  addLink: (link) => set((state) => ({ links: { ...state.links, [link.id]: link } })),

  removeLink: (id) =>
    set((state) => {
      if (!(id in state.links)) return state;
      const links = { ...state.links };
      delete links[id];
      return { links };
    }),

  select: (id) => set({ selectedId: id }),
}));
