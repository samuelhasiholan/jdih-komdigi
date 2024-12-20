import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
} from "axios";
import AuthCookie from "@/utils/cookies/auth";
import generateToken from "../token-generator";

export interface HttpConfig {
  onExpiredToken?: (originalRequest: any) => void;
}

export type HttpMethodsType = "get" | "post" | "put" | "delete" | "patch";

export type HttpRequestConfig = AxiosRequestConfig & {
  method?: HttpMethodsType;
  url: string;
  data?: any;
  headers?: any;
};

export type HttpResponse<T = any> = AxiosResponse<T>;

export type HeaderProperties = HeadersDefaults & {
  Authorization?: string;
};

export interface RequestCallback {
  onError?: (error: AxiosError) => void;
  onSuccess?: (res: AxiosResponse) => void;
}

export class Http {
  private readonly instance: AxiosInstance;
  private readonly token: string | null;

  constructor({ onExpiredToken = () => null }: HttpConfig = {}) {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": true,
      },
    });

    this.token = generateToken();

    this.instance.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = this.token;
        }
        config.headers.Accept = "application/json";
        config.headers["Content-Type"] = config.headers["Content-Type"]
          ? config.headers["Content-Type"]
          : "application/json";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          onExpiredToken !== null &&
          error.response?.status === 401 &&
          !originalRequest._retry
        ) {
          await onExpiredToken(originalRequest);

          if (this.token) {
            return axios({
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: this.token,
              },
            });
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public async request(
    config: HttpRequestConfig,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    try {
      const axiosConfig: any = {
        method: config.method,
        url: config.url,
      };
      if (config.data) {
        axiosConfig.data = config.data;
      }
      if (config.headers) {
        axiosConfig.headers = config.headers;
      }
      const response = await this.instance(axiosConfig);

      if (onSuccess) {
        onSuccess(response);
      }
      return response;
    } catch (err: unknown) {
      if (onError && err instanceof AxiosError) {
        onError(err);
      }

      throw err;
    }
  }

  public async post(
    url: string,
    data: any,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "post",
      },
      { onSuccess, onError },
    );
  }

  public async put(
    url: string,
    data: any,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "put",
      },
      { onSuccess, onError },
    );
  }

  public async patch(
    url: string,
    data: any,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    return this.request(
      {
        url: url,
        data: data,
        method: "patch",
      },
      { onSuccess, onError },
    );
  }

  public async remove(
    url: string,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    return this.request(
      {
        url: url,
        method: "delete",
      },
      { onSuccess, onError },
    );
  }

  public async get(
    url: string,
    { onSuccess = () => null, onError = () => null }: RequestCallback = {},
  ) {
    return this.request(
      {
        url: url,
        method: "get",
      },
      { onSuccess, onError },
    );
  }
}

export default new Http();
