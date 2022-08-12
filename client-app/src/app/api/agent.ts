import axios, { AxiosResponse } from 'axios';
import { Issue } from '../models/issue';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete(url).then(responseBody)
}

const Issues = {
    list: () => requests.get<Issue[]>('/issues'),
    details: (id: string) => requests.get<Issue>(`/issues/${id}`),
    create: (issue: Issue) => requests.post<Issue>(`/issues`, issue),
    update: (issue: Issue) => requests.put(`issues/${issue.id}`, issue),
    delete: (id: string) => requests.del(`issues/${id}`)
}

const agent = {
    Issues
}

export default agent;