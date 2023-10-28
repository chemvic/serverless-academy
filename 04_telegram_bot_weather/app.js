const TelegramBot = require('node-telegram-bot-api');
// const getWeatherForecast =require('./api');
const axios =require('axios');
const token = '';

const bot = new TelegramBot(token, {polling: true});
    
    bot.onText(/\/start/, (msg) => {
        bot.sendMessage(msg.chat.id, "Forecast", {
            reply_markup: {
                inline_keyboard: [[
                    {text: 'Forecast in Odesa', callback_data: 'forecast'}
                ]]
            }
        });
    });
    
    bot.on('callback_query', (callbackQuery) => {
        const msg = callbackQuery.message;
        if (callbackQuery.data === 'forecast') {
            bot.sendMessage(msg.chat.id, "Choose the interval:", {
                reply_markup: {
                    inline_keyboard: [
                        [{text: 'At intervals of 3 hours', callback_data: '3hours'}],
                        [{text: 'At intervals of 6 hours', callback_data: '6hours'}]
                    ]
                }
            });
        } else {
            const interval = callbackQuery.data === '3hours' ? 3 : 6;
            getWeatherForecast(msg, interval);
        }
    });

    async function getWeatherForecast(msg, interval){
        try {
            const API_KEY = '';
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
            message += `Date and time: ${forecast.dt_txt}\n Weather: ${forecast.weather[0].main}\n Temperature: ${forecast.main.temp}°C\n\n`;
        });
        bot.sendMessage(msg.chat.id, message);  
        } catch (error) {
           console.log(error); 
        };
         
        };

 