import create from "zustand";
import produce from "immer";
import { devtools } from "zustand/middleware";

export interface DatePickerWrapperStoreProps {
  from: Date | null;
  to: Date | null;
  range: Date[] | null;
  setFrom: (from: Date) => void;
  setTo: (from: Date) => void;
  setRange: (from: Date[]) => void;
}

const useStore = create<DatePickerWrapperStoreProps>(
  devtools((set) => ({
    from: null,
    to: null,
    range: null,
    setFrom: (from: Date) =>
      set(
        produce((draft) => {
          draft.from = from;
        })
      ),
    setTo: (to: Date) =>
      set(
        produce((draft) => {
          draft.to = to;
        })
      ),
    setRange: (range: Date[]) =>
      set(
        produce((draft) => {
          draft.range = range;
        })
      ),
  }))
);

export default useStore;
