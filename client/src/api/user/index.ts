import axios from "axios";

import type {
  AuthResponse,
  AuthToken,
  LoginPayload,
  RegisterPayload,
} from "../../types/user";
import { getAuthToken } from "../../utils/auth";

export const registerUser = async (
  payload: RegisterPayload
): Promise<AuthResponse> => {
  try {
    const { username, password, email } = payload;
    const response = await axios.post(
      "http://localhost:3000/api/user/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return error.response.data;
  }
};

export const loginUser = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  try {
    const { username, password } = payload;
    const response = await axios.post("http://localhost:3000/api/user/login", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error login user:", error);
    return error.response.data;
  }
};

export const logoutUser = async () => {
  const token = getAuthToken();
  const response = await axios.post(
    "http://localhost:3000/api/user/logout",
    {},
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  const { data } = response;
  if (!data.error) {
    return data;
  }
};

export const getMe = async (token: AuthToken) => {
  if (!token) throw new Error("No token provided");
  try {
    const response = await axios.get("http://localhost:3000/api/user/me", {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return error.response.data;
  }
};
