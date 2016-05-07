var TelegramBot = require('node-telegram-bot-api');

var token = '223485578:AAFGD2p5a6lbkLZz5JhZh6Kip6gDTRKzI_c';
var my_id = '193931395';
// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Matches /echo [whatever]
bot.onText(/\/echo (.+)/, function (msg, match) {
  var fromId = msg.from.id;
  console.log(msg);
  var resp = match[1];
  bot.sendMessage(fromId, resp);
});

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
  if (msg.from.id === my_id) {
    
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
