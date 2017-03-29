# weatherr
This is a simple but lovely weather app demonstrating the use of browser geolocation, the Weather Underground API, and a responsive flexbox-based (Bootstrap-free!) design.

![Weatherr app](http://easycaptures.com/fs/uploaded/988/7878092824.jpg)

## Running on your own server
* Install [Node.js](https://nodejs.org/en/). 
* Clone this repository and install dependencies:
```
git clone https://github.com/jlave2/weatherr
cd weatherr
npm install
```
* Get an API key from [Weather Underground](https://www.wunderground.com/weather/api/).
* Create a file named `.env` in the root directory and write `KEY=<YOURKEY>` into it (without brackets).

Try the development server with `npm run dev` and access the page at http://localhost:3000. Alternatively, run `PORT=<YOURPORT> npm run dev` and access http://localhost:YOURPORT.
