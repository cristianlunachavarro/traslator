import axios from "axios";

export const getLanguagesList = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/languages");
    return { message: response.data.message };
  } catch (error) {
    console.error("Error fetching languages list:", error);
  }
};
