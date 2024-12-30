import { Router, Request, Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  try {
    const cityName = req.body.cityName;

    WeatherService.getWeatherForCity(cityName).then((data) => {
      HistoryService.addCity(cityName);

      res.json(data);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

  // TODO: GET weather data from city name
  // TODO: save city to search history
  router.get("/history", async (__req: Request, res: Response) => {
    try {
      const savedCity = await HistoryService.getCities();
      res.json(savedCity);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // * BONUS TODO: DELETE city from search history
  router.delete("/history/:id", async (req: Request, res: Response) => {
    try {
      if (!req.params.id) {
        res.status(400).json({ msg: "City id is required." });
      }
      await HistoryService.removeCity(req.params.id);
      res.json({ success: "City successfully removed from search history." });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  export default router;
