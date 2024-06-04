const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const CoinAPIKey = "f7dae119-b1b7-424a-8b8f-2086c3a95537";

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
  headers: {
    Accept: "text/plain",
    "X-CoinAPI-Key": CoinAPIKey,
  },
};

// replace the value below with the Telegram token you receive from @BotFather
const token = "7421963412:AAF20A7pCqMbQwGvkLynyuuHugyVcTjTjWI";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

//utilts
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  console.log("resp>>", resp);
  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Matches "/echo [whatever]"
bot.onText(/\/data (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const message = msg.text;
  axios(config)
    .then((response) => {
      //   console.log(response);
      bot.sendMessage(
        chatId,
        `BTC rate as per 👉 *${formatDate(
          response.data.time
        )}* is *${response.data.rate.toFixed(2)}*`,
        { parse_mode: "Markdown" }
      );
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("message>>", message);

  // send back the matched "whatever" to the chat
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, "Received your message");
});
