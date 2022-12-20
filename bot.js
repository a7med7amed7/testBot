const telegraf = require('telegraf')
module.exports = {
    runBot: () => {
        console.log('Bot os Running...\n');
        const bot = new telegraf.Telegraf('5842359549:AAGN3AjyDboQgef8nHEGcEKEf1BMS0DzGk0');
        bot.command('/help', ctx => {
            console.log(ctx);
        })
        return bot.createWebhook({ domain: 'https://smee.io/8L9uPgp6EqbHsPOz' });
    }
}