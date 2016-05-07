var TelegramBot = require('node-telegram-bot-api');
var mqtt = require('mqtt');
var config = require('./config');

// Setup bot
var bot = new TelegramBot(config.token, {polling: true});

var room_env = {};

// Setup MQTT Client
var mqttClient = mqtt.connect('mqtt://127.0.0.1', {port: 1883});
mqttClient.subscribe('bus-monitor');
mqttClient.subscribe('local-env');

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
    console.log('hello');
});

mqttClient.on('message', function(topic, message) {
  console.log(topic);
  console.log(message);
  if (topic === 'local-env') {
    room_env = JSON.parse(message);
  }
})

// Any kind of message
/*
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  // photo can be: a file path, a stream or a Telegram file_id
  console.log(msg);
});
*/
