import axios, { AxiosResponse } from 'axios';

enum Method {
  GET = 'get',
  DELETE = 'delete',
  POST = 'post',
  PATCH = 'patch',
}

const callApi = async (
  method: Method,
  path: string,
  data?: Record<string, string>,
  jwt?: string | null,
  params?: Record<string, string>
) => {
  const headers = {
    'Authorization': jwt != null ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json',
  };
  // const baseUrl = 'http://192.168.0.25:8000/api/v1';
  const baseUrl = 'http://172.30.1.40:8000/api/v1';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

const api = {
  token: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/token/', form),
  pw_reset: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/pw_reset/', form),
  certification: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/certification/', form),
  pw_set: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/pw_set/', form),
  getUser: (id: string | null): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/users/${id}/`),
  getBox: (id: string | null): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/boxes/${id}/`),
  boxAuthentication: (
    form: Record<string, string>,
    token: string | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, `/users/box_authentication/`, form, token),
};

export default api;
