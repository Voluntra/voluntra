import { create } from 'zustand';

interface NavigationState {
  homePageVisits: number;
  incrementHomePageVisits: () => void;
}

export const useNavigationStore = create<NavigationState>()((set) => ({
  homePageVisits: 0,
  incrementHomePageVisits: () =>
    set((state) => ({ homePageVisits: state.homePageVisits + 1 })),
}));
