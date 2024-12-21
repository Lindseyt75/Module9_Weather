import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
interface City {
  id: string;
  name: string;
}

// TODO: Complete the HistoryService class
class HistoryService {
  private historyFilePath = path.join(__dirname, 'searchHistory.json');
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
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

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.historyFilePath, JSON.stringify(cities, null, 2), 'utf8', (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getHistory(): Promise<City[]> {
    try {
      return await this.read();
    } catch (err) {
      return []; // Return an empty array if the file doesn't exist or is empty
    }
  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(cityName: string): Promise<void> {
    const cities = await this.getHistory();
    const newCity: City = { id: uuidv4(), name: cityName };
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string): Promise<void> {
    const cities = await this.getHistory();
    const updatedCities = cities.filter(city => city.id !== id);
    await this.write(updatedCities);
  }
}

export default new HistoryService();
