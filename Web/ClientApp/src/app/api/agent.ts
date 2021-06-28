import axios, { AxiosResponse } from 'axios';
import { Investment } from '../model/Investment';
import { Payload } from '../model/payload';
import { Portfolio } from '../model/Portfolio';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody)
}

const Portfolios = {
    result: () => requests.get<Portfolio>('/Portfolio')
}

const Investments = {
    list: () => requests.get<Investment[]>('/Portfolio/Investments')
}

const Projection = {
    result: (payload: Payload) => requests.post<any>('/Projection', payload)
}

const agent = {
    Portfolios,
    Investments,
    Projection
}

export default agent;