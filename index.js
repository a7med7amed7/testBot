const express = require('express')
const telegraf = require('telegraf')
const tokenRoute = require('./router/token')
const Token = require('./models/token')
// const bot = require('./bot')

// const SmeeClient = require('smee-client')

// const smee = new SmeeClient({
//     source: 'https://smee.io/8L9uPgp6EqbHsPOz',
//     target: 'http://localhost:8000',
//     logger: console
// })

// const events = smee.start()

// // Stop forwarding events
// events.close()

const redis = require('redis');
const mongoose = require('mongoose')
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);
client.on('error', err => console.log("An error occured"))

function dbConnection() {

    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://ahmed:ahmed@cluster0.dv3incj.mongodb.net/?retryWrites=true&w=majority', () => {
        console.log("Connected to database...")
    })

}
dbConnection();
async function main() {


    const app = express();
    const data = await Token.find();
    const composer = new telegraf.Composer();
    composer.command('help', ctx => {
        ctx.reply("HELP!");
    })
    // let bots = [new telegraf.Telegraf('5966411547:AAFAI3NshRP76tfa6lYBdmEM-3m9wchh8q4'), new telegraf.Telegraf('5842359549:AAGN3AjyDboQgef8nHEGcEKEf1BMS0DzGk0')];
    await data.map(item => {
        let bot = new telegraf.Telegraf(item.token);
        // bots.push(bot);
        bot.command('help', ctx => {
            ctx.reply("DB");
        })
        bot.launch();
    })
    // console.log(data)
    // bots.map(bot => {
    //     bot.use(composer);
    //     bot.startPolling();
    // })
    // bots.map(async bot => {
    //     bot.command('/help', async ctx => {
    //         ctx.telegram.sendChatAction(ctx.message.chat.id, "typing")
    //             .then(() => ctx.reply('Welcome'))
    //         await client.connect();
    //         let key = `${ctx.telegram.token}-${ctx.chat.username}`;
    //         const cart = ctx.update.message.text;
    //         let val = JSON.parse(await client.get(key));
    //         console.log("Redis Value", val)
    //         // cart.push(val);
    //         await client.set(key, JSON.stringify(cart), {
    //             EX: 90,
    //             NX: true
    //         });
    //         await client.disconnect();

    //     })
    //     app.use(await bot.launch());
    // })
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api', tokenRoute)
    const port = 8000;
    app.listen(port, () => console.log("Listening on port", port));
};
main();