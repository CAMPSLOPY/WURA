import {create} from 'zustand';

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  movieId: undefined,
  isOpen: false,
  openModal: (movieId: string) => set({isOpen: true , movieId}), // Reorder set parameters
  closeModal: () => set({ isOpen: false,movieId: undefined }), // Reset movieId to undefined when closing modal
}));

export default useInfoModal;
