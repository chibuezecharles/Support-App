import { BASE_URL } from "../config/settings";
import httpRequest from "../utils/httpRequest";

export const signIn = async (payload) => {
  return await httpRequest(`${BASE_URL}/account/login`, "post", payload);
};

export const activateAccount = async (userId) => {
  return await httpRequest(`${BASE_URL}/account/activate-account/${userId}`);
};
