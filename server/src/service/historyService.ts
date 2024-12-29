import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private historyFilePath = path.join(__dirname, 'searchHistory.json');

  private async read(): Promise<City[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(this.historyFilePath, 'utf8', (err, data) => {
        if (err) {
          if (err.code === 'ENOENT') {
            resolve([]);
          } else {
            reject(err);
          }
        }
        resolve(JSON.parse(data));
      });
    });
  }

  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.historyFilePath, JSON.stringify(cities, null, 2), 'utf8', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  async getHistory(): Promise<City[]> {
    try {
      return await this.read();
    } catch (err) {
      return []; // Return an empty array if the file doesn't exist or is empty
    }
  }

  async addCity(cityName: string): Promise<void> {
    const cities = await this.getHistory();
    const newCity: City = { id: uuidv4(), name: cityName };
    cities.push(newCity);
    await this.write(cities);
  }

  async removeCity(id: string): Promise<void> {
    const cities = await this.getHistory();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
