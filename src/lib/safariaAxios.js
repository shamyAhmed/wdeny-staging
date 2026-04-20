// lib/safariaAxios.js
// Axios instance pointed at the Safaria API (https://portal.safaria.travel/api)
// Used exclusively for bus booking features.
import axios from "axios";
import Cookies from "js-cookie";

const safariaAxios = axios.create({
  baseURL: "https://portal.safaria.travel/api",
  headers: {
    common: {
      platform: "web",
    },
  },
});

// Request Interceptor – attach UserToken and Accept-Language
safariaAxios.interceptors.request.use(
  async (config) => {
    const isServer = typeof window === "undefined";
    let token;
    let locale;

    if (isServer) {
      try {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        locale = cookieStore.get("NEXT_LOCALE")?.value;
        token = cookieStore.get("UserToken")?.value;
      } catch {
        // ignore
      }
    } else {
      locale = Cookies.get("NEXT_LOCALE");
      token = Cookies.get("UserToken");
    }

    config.headers["Accept-Language"] = locale || "en";

    config.headers.Authorization = `Bearer 75483|O4tGHMdhLlJtv8WwXengOjX58fM1Ly1MMfGUE5nIde3bcd73`;

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor – forward errors
safariaAxios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default safariaAxios;
