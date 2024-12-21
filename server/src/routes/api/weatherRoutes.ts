import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  // TODO: GET weather data from city name
  const cityName = req.body.city;
  
  try {
    // TODO: save city to search history
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    const history = await HistoryService.addCity(cityName);
    
    res.status(200).json({ weatherData, history });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data or save to history' });
  }
});

  // TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    const history = await HistoryService.getHistory();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await HistoryService.removeCity(id);
    res.status(200).json({ message: 'City removed from history' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete city from history' });
  }
});

export default router;
