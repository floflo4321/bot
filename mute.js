const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
  name: "mute",
  description: "Réduire au silance un membre",
  permission: Discord.PermissionFlagsBits.ModerateMembers,
  category: "Modération",
  dm: false,
  options: [
    {
      type: "user",
      name: "membre",
      description: "Qui tu veux mute",
      required: true,
      autocomplete: false
    },

    {
      type: "string",
      name: "temps",
      description: "Temps ?",
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
    let user = args.getUser("membre");
    if (!user) return message.reply("Pas de membre à mute.");
    let member = message.guild.members.cache.get(user.id);
    if (!member) return message.reply({ content: "Ce gars n'existe pas chez moi... Je ne peux pas me le faire !", ephemeral: true, });
    let reason = args.getString("raison");
    if (!reason) reason = "Pas de raison fournie";
    let time = args.getString("temps");
    const convertedTime = ms(time);
    // return message.reply(`${convertedTime} <t:${Math.floor((Date.now() + convertedTime) / 1000.0)}>`);

    if (ms(time) > 86400000)
      return message.reply({ content: "Le mute ne peux pas dépaser 28 jours", ephemeral: true, });


    if (!message.user.id === user.id) return message.reply({ content: "C'est pas bien de vouloir se mute...", ephemeral: true, });

    if ((await message.guild.fetchOwner().id) === user.id) return message.reply({ content: "C'est pas bien de vouloir mute le fonda...", ephemeral: true, });

    if (!member.moderatable) return message.reply({ content: "Je peux pas mute le membre", ephemeral: true, });

    if (message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas mute cette personne", ephemeral: true, });

    if (member.isCommunicationDisabled()) return message.reply({ content: "Ce membre est déjà mute", ephemeral: true, });

    try {
      await user.send({ content: `Tu as été mute du serveur ${message.guild.name} par ${message.user.tag} pour la raison \`${reason} \` \n Duration du mute ${time} \n Fin du mute : <t${convertedTime} <t:${Math.floor((Date.now() + convertedTime) / 1000.0)}> (<t${convertedTime} <t:${Math.floor((Date.now() + convertedTime) / 1000.0)}:R>)`, });
      await message.reply({ content: "Le membre à bien été mute", ephemeral: true, });
      await member.timeout(convertedTime, reason);
    } catch (error) {
      // console.log("OK");
      await member.timeout(convertedTime, reason);
      await message.reply({ content: "Le membre à bien été mute", ephemeral: true, });
    }
  },
};
