const axios =require('axios');
const bot = require('./app');

async function getWeatherForecast(msg, interval){
try {
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

let message = '';
forecasts.forEach(forecast => {
    message += `Date and time: ${forecast.dt_txt}\n Weather:${forecast.weather[0].main}\n Temperature: ${forecast.main.temp}°C\n\n`;
});
bot.sendMessage(msg.chat.id, message);  
} catch (error) {
   console.log(error); 
};
 
};



module.exports = getWeatherForecast;