import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import { ClientType, LoginClientParamsType } from "../types";
import { message } from "antd";
import { setToken } from "../helpers/api";

interface StateAction {
  client: ClientType;
  clientLoading: boolean;
  loginLoading: boolean;
  logoutLoading: boolean;
  login: (params: LoginClientParamsType) => Promise<any>;
  getMe: () => Promise<any>;
  logout: () => Promise<any>;
}

const initialState: StateAction = {
  client: {},
  clientLoading: false,
  loginLoading: false,
  logoutLoading: false,
  login: async () => {},
  getMe: async () => {},
  logout: async () => {},
};

const clientAuthStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    login: async (params: any) => {
      set({ loginLoading: true });
      try {
        const { data } = await requests.postLoginClient(params);
        let token = data.data?.authorization?.token;
        setToken(token);

        return data;
      } catch (err) {
        const errData = err as any;
        message.error({ content: errData.response?.data?.message });
        return err;
      } finally {
        set({ loginLoading: false });
      }
    },
    getMe: async () => {
      set({ clientLoading: true });
      try {
        const data = await requests.fetchClient();
        set({
          client: data?.data?.data?.user,
          clientLoading: false,
        });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ clientLoading: false });
      }
    },
    logout: async () => {
      set({ logoutLoading: true });
    },
  }))
);

export default clientAuthStore;
