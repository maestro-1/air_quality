import cron from 'node-cron';
import { AxiosInstance } from 'axios';
import requests from '../http_request/iqair_request';
import { base_request_instance } from '../http_request/base_request';
import { pollutionSVC } from '../pollution';
import { PollutionEntry } from '../../interfaces';


const parisCron = async (request: AxiosInstance, long:string, lat: string) => {
    const response = await requests.getByCoodinates(
        request, long,  lat
    );

    let pollution: PollutionEntry;
    if(response && response.status === "success") {
        pollution = response.data.current.pollution;
        // convert city, state and country to lower case for consistency
        pollution = {
            city: response.data.city.toLowerCase(),
            state: response.data.state.toLowerCase(),
            country: response.data.country.toLowerCase(),
            pollution: response.data.current.pollution,
        }
        pollutionSVC.addPollution(pollution);
    }
}


export const parisAirQualityCron = cron.schedule('* * * * *', async () => {
    parisCron(base_request_instance, "2.352222", "48.856613");
});