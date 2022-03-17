import axios from "axios";

class AxiosService {
    constructor() {
        let service = axios.create({ baseURL: "http://127.0.0.1:8000/api/v1" });
        service.interceptors.response.use(
            this.handleResponseSuccess,
            this.handleResponseError
        );
        service.interceptors.request.use(
            this.handleRequestSuccess,
            this.handleRequestError
        );
        this.service = service;
    }

    handleRequestSuccess = (request) => {
        let accessToken = localStorage.getItem("accessToken")
            ? JSON.parse(localStorage.getItem("accessToken"))
            : null;
        request.headers.Authorization = `Bearer ${accessToken}`;
        return request;
    };

    handleResponseError = (error) => {
        return Promise.reject(error);
    };

    handleResponseSuccess = (response) => {
        return response;
    };

    handleRequestError = (error) => {
        switch (error.response.status) {
            case 401:
                this.redirectTo(document, "/");
                break;
            case 404:
                this.redirectTo(document, "/404");
                break;
            default:
                this.redirectTo(document, "/500");
                break;
        }
        return Promise.reject(error);
    };

    redirectTo = (document, path) => {
        document.location = path;
    };

    get(path) {
        return this.service.get(path);
    }

    patch(path, payload) {
        return this.service.request({
            method: "PATCH",
            url: path,
            responseType: "json",
            data: payload,
        });
    }

    post(path, payload) {
        return this.service.request({
            method: "POST",
            url: path,
            responseType: "json",
            data: payload,
        });
    }
}
export default new AxiosService();
