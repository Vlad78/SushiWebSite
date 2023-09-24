import { create } from "zustand";

interface PreviewModalStore {
  isOpen: boolean;
  data?: React.JSX.Element;
  onOpen: (data: React.JSX.Element) => void;
  closeModal: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: React.JSX.Element) => set({ isOpen: true, data }),
  closeModal: () => set({ isOpen: false }),
}));

export default usePreviewModal;
