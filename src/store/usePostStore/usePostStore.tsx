import create from "zustand";
import { persist } from "zustand/middleware";

interface PostErrorState {
  errorTitle: string | null;
  setErrorTitle: (item: string | null) => void;
}


interface EveryCashState {
  everyCash: string | null;
  setEveryCash: (item: string | null) => void;
}

export const usePostStore = create(
  persist(
    (set) => ({
      services: null,
      serviceDetail: null,
      setServiceDetail: (item: any) => set({ serviceDetail: item }),
      setServices: (item: any) => set({ services: item }),
    }),
    {
      name: "services",
    }
  )
);

export const stepOneStore = create(
  persist(
    (set) => ({
      stepOneData: null,
      setStepOneData: (item: any) => set({ stepOneData: item }),
      // clearStepOneData: () => set({ stepOneData: null }), 
    }),
    { name: "data",  }
  )
);


export const insuranceValueStore = create(
  persist(
    (set) => ({

      insuranceData: null,
      setStepInsuranceData: (item: any) => set({ insuranceData: item}),
      clearStepOneData: () => set({ insuranceData: null }), 
    }),
    { name: "data",  }
  )
);


export const stepOneAttributes = create(
  persist(
    (set) => ({
      stepOneAttributesData: null,
      setStepOneAttributesData: (item: any) => set({ stepOneAttributesData: item }),
    }),
    { name: "attributes",  }
  )
);

export const usePostError = create<PostErrorState>((set) => ({
  errorTitle: null,
  setErrorTitle: (item: any) => set({ errorTitle: item }),
}));


export const setCash = create<EveryCashState>((set) => ({
  everyCash: null,
  setEveryCash: (item: any) => set({ everyCash: item }),
}));

