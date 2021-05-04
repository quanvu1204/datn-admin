import { AxiosClient } from '../utils/axiosClient';

import { CustomerDTO, ResponseType } from './apiTypes';
import { apiUrl } from './apiUrls';

const services = {
    login: async (params: { email: string; password: string }): Promise<ResponseType<{ token: string } | null>> => {
        const { data } = await AxiosClient.post(apiUrl.login, params);
        return data;
    },
    getCustomer: async (): Promise<ResponseType<{ count: number; rows: CustomerDTO[] }>> => {
        const { data } = await AxiosClient.get(apiUrl.listCustomer);
        return data;
    },
};

export default services;
