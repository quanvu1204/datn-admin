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
    delCustomer: async (id: string): Promise<ResponseType<null>> => {
        const { data } = await AxiosClient.delete(`${apiUrl.delCustomer}${id}`);
        return data;
    },
    delDevice: async (id: string): Promise<ResponseType<null>> => {
        const { data } = await AxiosClient.delete(`${apiUrl.delDevice}${id}`);
        return data;
    },
};

export default services;
