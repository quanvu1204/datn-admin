import { AxiosClient } from '../utils/axiosClient';

import { CustomerDTO, DeviceDTO, ResponseType } from './apiTypes';
import { apiUrl } from './apiUrls';

const services = {
    login: async (params: { email: string; password: string }): Promise<ResponseType<{ token: string } | null>> => {
        const { data } = await AxiosClient.post(apiUrl.login, params);
        return data;
    },
    getCustomers: async (): Promise<ResponseType<{ count: number; rows: CustomerDTO[] }>> => {
        const { data } = await AxiosClient.get(apiUrl.listCustomers);
        return data;
    },
    getDevices: async (): Promise<ResponseType<{ count: number; rows: DeviceDTO[] }>> => {
        const { data } = await AxiosClient.get(apiUrl.listDevices);
        return data;
    },
};

export default services;
