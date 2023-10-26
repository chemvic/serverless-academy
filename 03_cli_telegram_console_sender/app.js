const { Command } = require('commander');
const fs = require('fs');
const path = require('path')
const TelegramBot = require('node-telegram-bot-api');

const program = new Command();

program
  .option("-m, --send-message <message>", "Send message to Telegram bot")
  .option("-p, --send-photo <photoPath>", "Send photo to Telegram bot")
  .on("-h, --help",  () => {})
  .addHelpText('after', `
  Example call:
  To send message:
    $ node app.js -m "your_message" 
    or
    $ node app.js --send-message "your_message"

  To send photo just drag and drop file from your PC or insert html link  after $ node app.js -p:
    $ node app.js -p "/path/to/photo.jpg"
    or
    $ node app.js --send-photo "https://some_cloud.com/some_picture.jpg"`);

program.parse(process.argv);
const argv =program.opts();

// const envFilePath = path.join(__dirname, '.env');
// try {
//     const data = fs.readFileSync(envFilePath, 'utf8');
//     const envVariables = data.split('\n');
  
//     envVariables.forEach((envVariable) => {
//       const [name, value] = envVariable.split('=');
//       process.env[name] = value;
//     });
//   } catch (err) {
//     console.error('Ошибка при чтении файла .env:', err);
//   }
//  const token = process.env.TOKEN;
//   const chatId = process.env.CHAT_ID;
//   console.log(token);
//   console.log(chatId);

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

