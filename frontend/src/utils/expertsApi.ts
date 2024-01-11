import { EXPERTS_BASE_URL } from './constants';

interface ExpertsApiOptions {
    serverUrl: string;
    headers: Record<string, string>;
}

class ExpertsApi {
    private _serverUrl: string;
    private _headers: Record<string, string>;

    constructor({ serverUrl, headers }: ExpertsApiOptions) {
        this._serverUrl = serverUrl;
        this._headers = headers;
    }

    private _checkResponse(res: Response) {
        // функция проверки статуса ответа
        return res.ok
            ? res.json()
            : Promise.reject(`${res.status} ${res.statusText}`);
    }

    private _request(url: string, options: RequestInit) {
        // функция отправки запроса с проверкой ответа
        return fetch(url, options).then(this._checkResponse);
    }

    // получение данных о фильмах
    getExperts() {
        return this._request(this._serverUrl, {
            method: 'GET',
            headers: this._headers,
        });
    }
}

const expertsApi = new ExpertsApi({
    serverUrl: EXPERTS_BASE_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default expertsApi;
