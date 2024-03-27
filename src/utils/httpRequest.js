import axios from "axios";
import storeInit from "../redux/store";

const httpRequest = async (url, method = "get", body = null, others) => {
  const token = storeInit.store.getState()?.auth?.user?.token?.token;

  try {
    const response = await axios({
      url,
      method,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        language: "en",
      },
      ...others,
    });
    return response?.data;
  } catch (error) {
    return error;
  }
};

export default httpRequest;
