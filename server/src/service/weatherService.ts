import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();


// TODO: Define a class for the Weather object
interface Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

// TODO: Complete the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.WEATHER_API_KEY || ''; // Make sure to set the API key in your .env
  // TODO: Define the baseURL, API key, and city name properties
  private buildGeocodeQuery(city: string): string {
    return `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchWeatherData(query: string): Promise<any> {
    const response = await fetch(query);
    if (!response.ok) {
      throw new Error('Weather data not found');
    }
    return await response.json();
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  private parseCurrentWeather(data: any): Weather {
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  async getWeatherForCity(city: string): Promise<Weather> {
    const query = this.buildGeocodeQuery(city);
    const weatherData = await this.fetchWeatherData(query);
    return this.parseCurrentWeather(weatherData);
  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
