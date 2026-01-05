import axios from "axios";
import { getGuestId } from "../../utils/guest";
import { getAuthToken } from "../../utils/auth";

export const fetchHistories = async () => {
  const guestId = getGuestId();
  const token = getAuthToken();
  try {
    const response = await axios.get("http://localhost:3000/api/history", {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      params: token ? {} : { guestId },
    });

    return response.data;
  } catch (error) {}
};
