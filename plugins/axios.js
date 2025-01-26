import axios from "axios";
export default defineNuxtPlugin(nuxtApp => {
  const axiosInstance = axios.create({
    // baseURL: "http://localhost:4500/api", 
    baseURL: "https://hickdigitalmart-backend.onrender.com/api",
   
  });
  // Add a request interceptor to include the token
  axiosInstance.interceptors.request.use(
    config => {
      const userStore = useUserStore();
      let token = userStore.token;

      if (token) {
        // Add the Authorization header if the token exists
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => {
      // Handle request errors
      return Promise.reject(error);
    }
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
