import create from "zustand";

interface FXState {
  fxStack: string[];
  history: string[][];
  redoStack: string[][];
  addFX: (fx: string) => void;
  removeFX: (fx: string) => void;
  moveFX: (from: number, to: number) => void;
  undo: () => void;
  redo: () => void;
}

export const useFXStore = create<FXState>((set, get) => ({
  fxStack: ["delay", "reverb"],
  history: [],
  redoStack: [],
  addFX: (fx) => {
    const { fxStack, history } = get();
    const newStack = [...fxStack, fx];
    set({ fxStack: newStack, history: [...history, fxStack], redoStack: [] });
  },
  removeFX: (fx) => {
    const { fxStack, history } = get();
    const newStack = fxStack.filter((f) => f !== fx);
    set({ fxStack: newStack, history: [...history, fxStack], redoStack: [] });
  },
  moveFX: (from, to) => {
    const { fxStack, history } = get();
    const newStack = [...fxStack];
    const [moved] = newStack.splice(from, 1);
    newStack.splice(to, 0, moved);
    set({ fxStack: newStack, history: [...history, fxStack], redoStack: [] });
  },
  undo: () => {
    const { history, fxStack, redoStack } = get();
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    set({ fxStack: previous, history: history.slice(0, -1), redoStack: [...redoStack, fxStack] });
  },
  redo: () => {
    const { redoStack, fxStack, history } = get();
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    set({ fxStack: next, redoStack: redoStack.slice(0, -1), history: [...history, fxStack] });
  },
}));
