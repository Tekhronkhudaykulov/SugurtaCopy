import clientAuthStore from "./clientAuth";
import vendorStore from "./vendor";
import appStore from "./app";
import modalsStore from "./modals";
import companyStore from "./company/companySlice";
import stepsStore from "./steps/stepsSlice";
import socketValueStore from "./socketResult/socketResultSlice";
import { usePostStore } from "./usePostStore/usePostStore";
import activeStore from "./active/activeSlice";
import { otherStore } from "./other";

export {
  clientAuthStore,
  vendorStore,
  appStore,
  modalsStore,
  companyStore,
  stepsStore,
  socketValueStore,
  usePostStore,
  activeStore,
  otherStore
};
