// Api для работы с данными пользователя
import { AUTH_API_URL } from './constants';


interface AuthApiOptions {
  serverUrl: string;
  headers: Record<string, string>;
  credentials: RequestCredentials;
}
class AuthApi {
  private _serverUrl: string;
  private _headers: Record<string, string>;
  private _credentials: RequestCredentials;

  constructor({ serverUrl, headers, credentials }: AuthApiOptions) {
    this._serverUrl = serverUrl;
    this._headers = headers;
    this._credentials = credentials;
  }

  private _checkResponse(res: Response) {
    // функция проверки статуса ответа
    return res.ok
      ? res.json()
      : Promise.reject(`${res.status} ${res.statusText}`);
  }

  private _request(endpointUrl: string, options: RequestInit) {
    // функция отправки запроса с проверкой ответа
    return fetch(`${this._serverUrl}${endpointUrl}`, options).then(
      this._checkResponse
    );
  }

  register(name: string, email: string, password: string) {
    // функция регистрации нового пользователя
    return this._request('/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    });
  }

  authorize(email: string, password: string) {
    // функция авторизации пользователя
    return this._request('/signin', {
      method: 'POST',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({ email, password }),
    });
  }

  signout() {
    // функция выхода из системы для пользователя
    return this._request('/signout', {
      method: 'GET',
      headers: this._headers,
      credentials: this._credentials,
    });
  }
}


const authApi = new AuthApi({
  serverUrl: AUTH_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default authApi;
