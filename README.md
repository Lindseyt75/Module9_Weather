# Module9_Weather

Usage
To be able to pull weather information in most cities.

Open the application in your browser.
Enter the name of a city in the search field.
View the current weather and the 5-day forecast for the selected city.

How to use from the repository
copy the .env file and rename it to .env
then add your personal api key
type the following commands
npm i
npm run build
npm run start

User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city, and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, a description of the weather for the icon's `alt` tag, the temperature, the humidity, and the wind speed
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

Through the use of API to have the ability to pull up to 5 days of weather and also remove requested information as well.
