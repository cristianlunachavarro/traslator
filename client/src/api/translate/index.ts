import axios from "axios";
import type { TranslatePayload } from "../../types/translate";
import { getAuthToken } from "../../utils/auth";
import { getGuestId } from "../../utils/guest";

export const translateText = async (payload: TranslatePayload) => {
  const token = getAuthToken();

  try {
    const response = await axios.post(
      "http://localhost:3000/api/translate",
      {
        ...payload,
        guestId: token ? null : getGuestId(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};
