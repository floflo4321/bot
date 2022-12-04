const Discord = require("Discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require("./Loaders/loadCommands");
const loadEvent = require("./Loaders/LoadEvents");
const config = require("./config");
bot.commands = new Discord.Collection();
bot.function = {
    createID: require("./Functions/createID"),
    generateCaptcha: require("./Functions/generateCaptcha"),
    searchLink: require("./Functions/searchLink"),
    searchMentions: require("./Functions/searchMentions")
}
loadCommands(bot);
loadEvent(bot);

bot.login(config.token);
