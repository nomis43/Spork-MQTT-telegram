var TelegramBot = require('node-telegram-bot-api');
var mqtt = require('mqtt');
var config = require('./config');

// Setup bot
var bot = new TelegramBot(config.token, {polling: true});

// Setup MQTT Client
var mqttClient = mqtt.connect('mqtt://127.0.0.1', {port: 1883});

// Matches /start[whatever]
bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, 'Choose an option', {
    reply_markup: {
      keyboard: [
      [
        {
          'text': 'Temperature',
        }, {
          'text': 'Bus',
        }
      ]
    ],
    resize_keyboard: true
  }
  })
});

bot.onText(/Temperature/, function(msg, match) {
  // Check if the user is me
  if (msg.from.id === config.chat_id) {
    console.log('hello');
  }
});

// Any kind of message
/*
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  console.log(msg);
});
*/
