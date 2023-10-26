const { Command } = require('commander');
const fs = require('fs');
const path = require('path')
const TelegramBot = require('node-telegram-bot-api');

const program = new Command();

program
  .option("-m, --send-message <message>", "send-message")
  .option("-p, --send-photo <photoPath>", "send photo")
  .option("-h, --help ", "help");

program.parse(process.argv);

const argv =program.opts();

const token = '6582920769:AAEb1p8xW0Qowj1SVyoL_3q4GGHz4fiVkSI';
const chatId= 494934749;
// 
const bot = new TelegramBot(token, {polling: false});
          


   function sendMessages({sendMessage, sendPhoto}){
        if (sendMessage) {
            bot.sendMessage(chatId, sendMessage);
            }else

        if (sendPhoto) {
            const absolutePath = path.resolve(sendPhoto);
            bot.sendPhoto(chatId,sendPhoto );
// {source: fs.createReadStream(absolutePath)}
        }else{
            console.warn("\x1B[31m Unknown action type!");
        }            
    }

   sendMessages(argv);

//     const bot = new TelegramBot(token, {polling: false});
//  bot.sendMessage(chatId, `Спокойной ночи?`);

//  bot.sendMessage(chatId, `Спокойной ночи?`);
// const filePath = 'c:/Users/chemv/OneDrive/Documents/GitHub/Node/serverless-academy/03_cli_telegram_console_sender/assets/man-searching-with-magnifying-glass (1).jpg';

// bot.sendPhoto(chatId, {
//     source: fs.promises.readFile(filePath)
// });
// const photoPath = path.join(__dirname,'assets','til.jpg');
//   bot.sendPhoto(chatId,photoPath );