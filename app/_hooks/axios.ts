import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestHeaders,
    AxiosResponse,
  } from "axios";
  
  import { getToken } from "@/app/_store/user-config";
  
  export type Response<T> = Promise<AxiosResponse<T>>;
  
  type TYPE_URL = "USUARIO" | "ORDER" ;
  
  function httpErrorHandler(error: AxiosError) {
    if (error === null) throw new Error("Unrecoverable error!! Error is null!");
    if (axios.isAxiosError(error)) {
      const response = error?.response;
      const request = error?.request;
  
      if (error.code === "ERR_NETWORK") {
        console.error("connection problems..");
      } else if (error.code === "ERR_CANCELED") {
        console.error("connection canceled..");
      }
  
      if (response) {
        const statusCode = response?.status;
        if (statusCode === 404) {
          console.error(
            "The requested resource does not exist or has been deleted"
          );
        } else if (statusCode === 401) {
          console.error("Please login to access this resource");
        }
      } else if (request) {
        console.error("Request no proccess", request);
      }
    }
    console.error("Error message", error.message);
    return error.response;
  }
  
  function createAxios() {
    const getURL = (typeURL: TYPE_URL): string | undefined => {
      if (typeURL === "USUARIO") return process.env.NEXT_PUBLIC_URL_USUARIO;
      if (typeURL === "ORDER") return process.env.NEXT_PUBLIC_URL_ORDER_KITCHEN;
  
      return "http://localhost:8000/api/user";
    };
  
    return (typeURL: TYPE_URL = "USUARIO"): AxiosInstance => {
      const baseURL = getURL(typeURL as TYPE_URL);
      const instance = axios.create({ baseURL });
  
      instance.interceptors.request.use((config) => {
        const tokenFromClient = getToken();
        const tokenFromSSR = config.headers?.Authorization;
        if (!tokenFromClient) {
          return config;
        }
  
        config.headers = {
          Authorization: !tokenFromSSR ? tokenFromClient : tokenFromSSR,
        } as AxiosRequestHeaders;
        return config;
      });
  
      instance.interceptors.response.use(
        (response) => response,
        httpErrorHandler
      );
      return instance;
    };
  }
  
  const http = createAxios();
  
  export { http };
  