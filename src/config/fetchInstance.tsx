import { Cookies } from "react-cookie";
import { env } from "./env";

const cookies = new Cookies();

const getAuthToken = () => cookies.get("accessToken");


interface FetchOptions extends RequestInit {
    body?: any;
}

const request = async (method: string, endpoint: string, options: FetchOptions = {}): Promise<any> => {
    const url = `${env.API_BASE_URL}${endpoint}`;

    const defaultHeaders: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(getAuthToken() ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
    };

    let config: FetchOptions = {
        method,
        ...options,
        headers: {
            ...defaultHeaders,
            ...(options.headers || {}),
        },
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        let response = await fetch(url, config);
        if (response.status === 401) {
            const refreshToken = cookies.get("refreshToken");
            if (refreshToken) {
                const refreshResponse = await fetch(`${env.API_BASE_URL}/auth/GetAccessToken?token=${refreshToken}`);
                const refreshData = await refreshResponse.json();

                if (refreshData.data?.accessToken) {
                    cookies.set("accessToken", refreshData.data.accessToken, { maxAge: 60 * 15 });
                    config.headers = {
                        ...config.headers,
                        Authorization: `Bearer ${refreshData.data.accessToken}`,
                    };

                    response = await fetch(url, config);
                }
            }
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || `HTTP Error ${response.status}: ${response.statusText}`);

        return data;
    } catch (error: any) {
        console.error(`[FETCH] ${method} ${url} - Error:`, error.message);
        throw error;
    }
};

const fetchInstance = {
    get: (endpoint: string, options?: FetchOptions) => request("GET", endpoint, options),
    post: (endpoint: string, body: any, options?: FetchOptions) => request("POST", endpoint, { ...options, body }),
    put: (endpoint: string, body: any, options?: FetchOptions) => request("PUT", endpoint, { ...options, body }),
    delete: (endpoint: string, options?: FetchOptions) => request("DELETE", endpoint, options),
    patch: (endpoint: string, body: any, options?: FetchOptions) => request("PATCH", endpoint, { ...options, body }),
};

export default fetchInstance;
