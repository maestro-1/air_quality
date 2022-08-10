import { NextFunction, Request, Response } from 'express';
import requests from '../services/http_request/iqair_request'

import { base_request_instance } from '../services/http_request/base_request';
import { locationSVC, pollutionSVC } from '../services/pollution';


class IQAIR {
    async getAirQualityByCoordinates(req: Request, res: Response, next: NextFunction){
        const long:string = req.query.long as string;
        const lat:string = req.query.lat as string;
        const response = await requests.getByCoodinates(
            base_request_instance, long,  lat
        );

        let pollution: Object = {};
        if(response.status === "success") {
            pollution = response.data.current.pollution;

            return res.status(200).json({
                Result: pollution
            })
        }
        // log error here
        return res.status(500).json({message: "Something went wrong"})
    }

    async getCityMostPollutedTimeForCity(req: Request, res: Response, next: NextFunction){
        let city: string = req.query.city as string;
        city = city.toLowerCase()
        try {
            const location = await locationSVC.getUniqueLocation({ city });

            // error 404 if city not in database
            if(!location) return res.status(404).json({ message: "The requested city does not exist" });

            const pollution = await pollutionSVC.getPollutionBy(city);
            res.status(200).json({ pollution });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong"});
        }
    }
}


export default new IQAIR();