const TelegramBot = require('node-telegram-bot-api');

const axios =require('axios');
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const token = '';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Курс валют", {
        reply_markup: {
            keyboard: [[
                {text: '/Курс валют'}
            ]],
            one_time_keyboard: false
        }
    });
});
let currency='';
bot.on('message', (msg) => {
    const exchange = "/Курс валют";
    const usd = "USD";
    const eur = "EUR";
    if (msg.text==='/Курс валют') {
       bot.sendMessage(msg.chat.id, "Валюти", {
            reply_markup: {
                keyboard: [
                    [{text: 'USD'}],
                    [{text: 'EUR'}]
                ],
                one_time_keyboard: false
            }
    }   
        );
    } else if(msg.text==='USD') {
            currency='USD';
           getCurrentCurrency(msg, currency); 
        }else if(msg.text==='EUR'){
            currency='EUR';
             getCurrentCurrency(msg, currency);
        }
            
});

async function getCurrentCurrency(msg, currency){
try {
    const PRB_URL ="https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5";
    const MNB_URL = "https://api.monobank.ua/bank/currency";
   

          const responsePrb = await axios(PRB_URL);
          const responseMnb = await axios(MNB_URL);

console.log(`Privatbank:\n Buy $: ${responsePrb.data[1].buy} uah   Sale $: ${responsePrb.data[1].sale} uah\n 
 Buy €: ${responsePrb.data[0].buy} uah   Sale €: ${responsePrb.data[0].sale} uah\n\n`);
console.log(`Monobank:\n Buy $: ${responseMnb.data[0].rateBuy} uah   Sale $: ${responseMnb.data[0].rateSell} uah\n 
 Buy €: ${responseMnb.data[1].rateBuy} uah   Sale €: ${responseMnb.data[1].rateSell} uah\n\n`);

let message='';
 if (currency==='USD') {
    message=` Privatbank:\n Buy $: ${responsePrb.data[1].buy} uah\n Sale $: ${responsePrb.data[1].sale} uah\n\n Monobank:\n Buy $: ${responseMnb.data[0].rateBuy} uah\n Sale $: ${responseMnb.data[0].rateSell} uah\n\n`;
          bot.sendMessage(msg.chat.id, message);
 };
 if (currency==='EUR') {
    message=` Privatbank:\n Buy €: ${responsePrb.data[0].buy} uah\n Sale €: ${responsePrb.data[0].sale} uah\n\n Monobank:\n Buy €: ${responseMnb.data[1].rateBuy} uah\n Sale €: ${responseMnb.data[1].rateSell} uah\n\n`;
          bot.sendMessage(msg.chat.id, message);
 };

} catch (error) {
  
    console.error(error);
}
};
