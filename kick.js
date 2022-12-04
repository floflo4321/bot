const Discord = require("discord.js");
module.exports = {
  name: "kick",
  description: "kick un membre",
  permission: Discord.PermissionFlagsBits.KickMembers,
  category: "Modération",
  dm: false,
  options: [
    {
      type: "user",
      name: "membre",
      description: "Qui tu veux kick",
      required: true,
      autocomplete: false
    },
    {
      type: "string",
      name: "raison",
      description: "Pourquoi ?",
      required: false,
      autocomplete: false
    },
  ],

  async run(bot, message, args) {
    try {
      let user = await args.getUser("membre");
      if (!user) return message.reply("Pas de membre à kick.");
      let member = message.guild.members.cache.get(user.id);
      let reason = args.getString("raison");
      if (!reason) reason = "Pas de raison fournie";
      // return console.log(reason);
      if (!member)
        return message.reply({
          content:
            "Ce gars n'existe pas chez moi... Je ne peux pas me le faire !",
          ephemeral: true,
        });
      if (!message.user.id === user.id)
        return message.reply({
          content: "C'est pas bien de vouloir se kick...",
          ephemeral: true,
        });

      if ((await message.guild.fetchOwner().id) === user.id)
        return message.reply({
          content: "C'est pas bien de vouloir kick le fonda...",
          ephemeral: true,
        });

      if (!member.bannable)
        return message.reply({
          content: "Je peux pas kick le membre",
          ephemeral: true,
        });

      if (
        member &&
        message.member.roles.highest.comparePositionTo(member.roles.highest) <=
        0
      )
        return message.reply({
          content: "Tu ne peux pas kick cette personne",
          ephemeral: true,
        });

      try {
        await user.send({
          content: `Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison \`${reason} \``,
        });
        await message.reply({
          content: "Le membre à bien été kick",
          ephemeral: true,
        });
        await member.kick(reason);
      } catch (error) {
        // console.log("OK");
        await member.kick(reason);
        await message.reply({
          content: "Le membre à bien été kick",
          ephemeral: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
