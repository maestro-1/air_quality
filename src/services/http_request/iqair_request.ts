import { AxiosInstance } from 'axios';

const requests = {
    getByCoodinates: async (request: AxiosInstance, lon:string, lat: string) => {
        const params = {key: process.env.IQAIR_SECRET, lon, lat }
        const configuration = { params };
        try {
            const response = await request.get(`/nearest_city`, configuration);
            return response.data
        } catch (error) {
            return error.response.data;
        }
    }
};

export default requests;
