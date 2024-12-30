import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// Define a City class
class City{
  name: string;
  id: string;

  constructor(name: string){
    this.name = name;
    this.id = uuidv4();
  }
}

// The HistoryService class
class HistoryService {
  
  private async read() {
    return await fs.promises.readFile('db/db.json', {
      flag: 'a+',
      encoding: 'utf8',
    });
  }

  private async write(cities: City[]) {
    return await fs.promises.writeFile('db/db.json', JSON.stringify(cities), 'utf8')
  }

  async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];

      try {
        parsedCities = [].concat(JSON.parse(cities || '[]'));
      } catch (error) {
        parsedCities = [];
      }

      return parsedCities;
  })
}

async addCity(city: string) {
  if (!city){
    throw new Error('City cannot be empty');
  }
  const newCity: City = new City(city);
  return await this.getCities()
  .then((cities) => {
    if (cities.find((index: City) => index.name === city)) {
      return cities;
    }
    return [...cities, newCity];
  })
  .then((updatedCities: City[]) => this.write(updatedCities))
  .then(() => newCity);
}

// BONUS: Method to remove a city from the db.json file by id
async removeCity(id: string){
  return await this.getCities()
    .then((cities: City[]) => cities.filter((city: City) => city.id !== id))
    .then((filteredCities: City[]) => this.write(filteredCities));
}
}

export default new HistoryService();
