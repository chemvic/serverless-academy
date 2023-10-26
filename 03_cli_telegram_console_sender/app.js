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

const token = '';
const chatId= ;

const bot = new TelegramBot(token, {polling: false});
          


   function sendMessages({sendMessage, sendPhoto}){
        if (sendMessage) {
            bot.sendMessage(chatId, sendMessage);
            }else

        if (sendPhoto) {
            const absolutePath = path.resolve(sendPhoto);           
            const photoStream = fs.createReadStream(absolutePath);

            bot.sendPhoto(chatId, photoStream);
           
        }else{
            console.warn("\x1B[31m Unknown action type!");
        }            
    }

   sendMessages(argv);

