import { create } from "zustand";

import { v4 as uuid } from "uuid";

import type {
  LoginPayload,
  RegisterPayload,
  UserTypes,
} from "../../types/user";
import { getMe, loginUser, logoutUser, registerUser } from "../../api/user";
import { useErrorStore } from "../errorStore";
import type { AppError } from "../../types/error";

interface UserStoreProps {
  user: UserTypes | null;
  token: string | null;
  isHydrated: boolean;
  setAuth: (user: UserTypes, token: string) => void;
  clearAuth: () => void;
  hydrate: () => void;
}

export const useUserStore = create<UserStoreProps>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  isHydrated: false,

  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token });
  },

  clearAuth: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  hydrate: async () => {
    const token = get().token;
    if (!token) {
      set({ isHydrated: true });
      return;
    }
    try {
      const user = await getMe(token);
      set({ user, isHydrated: true });
    } catch (error) {
      useUserStore.getState().clearAuth();
      set({ isHydrated: true });
    }
  },
}));

export const handleRegister = async (payload: RegisterPayload) => {
  const result = await registerUser(payload);
  const { user, error, message, token } = result;

  if (error && message) {
    const loginError: AppError = {
      id: uuid(),
      source: "user",
      message,
    };
    return useErrorStore.getState().addError(loginError);
  }

  if (!user || !token) {
    const loginError: AppError = {
      id: uuid(),
      source: "user",
      message: "Error Login",
    };
    return useErrorStore.getState().addError(loginError);
  }
  localStorage.setItem("token", token);
  useUserStore.getState().setAuth(user, user.token);
  return true;
};

export const handleLogin = async (payload: LoginPayload) => {
  const result = await loginUser(payload);
  const { user, error, message, token } = result;

  if (error && message) {
    const loginError: AppError = {
      id: uuid(),
      source: "user",
      message,
    };
    useErrorStore.getState().addError(loginError);
    return false;
  }

  if (!user || !token) {
    const loginError: AppError = {
      id: uuid(),
      source: "user",
      message: "Error login",
    };
    useErrorStore.getState().addError(loginError);
    return false;
  }
  localStorage.setItem("token", token);
  useUserStore.getState().setAuth(user, token);
  return true;
};

export const handleLogout = async () => {
  const response = await logoutUser();
  if (!response.error) {
    localStorage.removeItem("token");
    useUserStore.getState().clearAuth();
    return true;
  }
  return false;
};
