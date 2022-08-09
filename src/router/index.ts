import express from 'express';
import IQAIR from './../controller/iqair.controller'

const router = express.Router();

router.get('/air_quality', IQAIR.getAirQualityByCoordinates);
router.get("/most_poluted_time", IQAIR.getCityMostPollutedTimeForCity)

export default router;
