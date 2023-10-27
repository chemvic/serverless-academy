const axios =require('axios');

async function getWeatherForecast(msg, interval){

    const API_KEY = '2e7139c6a4f80c6748f001736e0d42cb';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
    const url =`${BASE_URL}?lat=46.477&lon=30.733&appid=${API_KEY}&units=metric`;

    const response = await axios(url);
    const forecasts =response.data.list.filter((_,index)=>{
if (interval===3) {
    return true;
    
} else {
    if (interval===6) {
      return   index%2===0;
    }

}});
   return forecasts; 
};


module.exports = getWeatherForecast;