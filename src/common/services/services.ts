import { AxiosClient } from '../utils/axiosClient';

import { ResponseType } from './apiTypes';
import { apiUrl } from './apiUrls';

const services = {
    login: async (params: { email: string; password: string }): Promise<ResponseType<{ token: string } | null>> => {
        const { data } = await AxiosClient.post(apiUrl.login, params);
        return data;
    },
};

export default services;
