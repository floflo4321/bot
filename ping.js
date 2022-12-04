const { ApplicationCommandOptionType } = require("discord.js");
const Discord = require("discord.js");
module.exports = {
  name: "ping",
  description: "Afficher la latence du bot",
  category: "informations",
  permission: "Aucune",
    dm: true,

  async run(bot, message) {
    await message.reply(`Ping: \`${bot.ws.ping}\``);
  },
};
