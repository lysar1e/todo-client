import axios from "axios";
import {URL} from "../../constants/url";

export const axiosJWT = axios.create();
axiosJWT.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await axios.post(
                    `${URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                return axios.request(originalRequest);
            } catch (e) {
                console.log("НЕ АВТОРИЗОВАН", e);
            }
        }
        throw error;
    }
);