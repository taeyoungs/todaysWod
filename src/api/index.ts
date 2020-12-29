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
  data?: Record<string, string> | null,
  jwt?: string | null,
  params?: Record<string, string>
) => {
  const headers = {
    'Authorization': jwt != null ? `Bearer ${jwt}` : null,
    'Content-Type': 'application/json',
  };
  // const baseUrl = 'http://192.168.0.25:8000/api/v1';
  const baseUrl = 'http://172.16.35.115:8000/api/v1';
  const fullUrl = `${baseUrl}${path}`;

  if (method === 'get' || method === 'delete') {
    return axios[method](fullUrl, { headers, params });
  } else {
    return axios[method](fullUrl, data, { headers });
  }
};

const api = {
  signUp: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/', form),
  token: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/token/', form),
  pw_reset: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/pw_reset/', form),
  certification: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/certification/', form),
  pw_set: (form: Record<string, string>): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, '/users/pw_set/', form),
  updateUser: (
    form: Record<string, string>,
    id: string | null,
    token: string | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.PATCH, `/users/${id}/`, form, token),
  revokeBox: (
    id: string | null,
    token: string | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/users/${id}/revoke/`, null, token),
  getUser: (id: string | null): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/users/${id}/`),
  getAlerts: (
    token: string | null,
    page: number
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/alerts/?page=${page}`, null, token),
  getBox: (id: string | null): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/boxes/${id}/`),
  boxAuthentication: (
    form: Record<string, string>,
    token: string | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, `/users/box_authentication/`, form, token),
  getWods: (
    token: string | null,
    param?: Record<string, string>
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/wods/`, null, token, param),
  getWod: (
    token: string | null,
    param?: Record<string, string>
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/wods/date/`, null, token, param),
  getMembership: (
    token: string | null,
    id: string | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/memberships/${id}/`, null, token),
  getMonthRecords: (
    token: string | null,
    param?: Record<string, string>
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/reservations/`, null, token, param),
  getSchedules: (
    token: string | null,
    param: Record<string, string>
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.GET, `/schedules/`, null, token, param),
  setNewReservation: (
    token: string | null,
    data: Record<string, string> | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.POST, `/reservations/`, data, token),
  updateReservation: (
    token: string | null,
    data: Record<string, string> | null,
    id: number | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.PATCH, `/reservations/${id}/`, data, token),
  deleteReservation: (
    token: string | null,
    id: number | null
  ): Promise<AxiosResponse<any>> =>
    callApi(Method.DELETE, `/reservations/${id}/`, null, token),
};

export default api;
