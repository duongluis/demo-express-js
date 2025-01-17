const express = require('express')
const expressApp = express()
const axios = require("axios");
const path = require("path")
const port = process.env.PORT || 3000;
expressApp.use(express.static('static'))
expressApp.use(express.json());
require('dotenv').config();

const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

expressApp.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

bot.command('start', ctx => {
  console.log(ctx.from)
  bot.telegram.sendMessage(ctx.chat.id, 'Hello there! Welcome to the Code Capsules telegram bot.\nI respond to /ethereum. Please try it', {
  })
})

bot.command('ethereum', ctx => {
  var rate;
  console.log(ctx.from)
  axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
  .then(response => {
    console.log(response.data)
    rate = response.data.ethereum
    const message = `Hello, today the ethereum price is ${rate.usd}USD`
    bot.telegram.sendMessage(ctx.chat.id, message, {
    })
  })
})

bot.command('https...', ctx => {
  console.log(ctx.from)
  var id = JSON.parse(link)
  var array = id.split('/')
  var max = array.length 
  var message = `${array[max - 1]}`
  bot.telegram.sendMessage(ctx.chat.id, message, {
  })
})



bot.launch()