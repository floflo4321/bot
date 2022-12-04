const Discord = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "warn",
    description: "Réduire au silance un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    category: "Modération",
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "Qui tu veux warn",
            required: true,
            autocomplete: false
        },
        {
            type: "string",
            name: "raison",
            description: "Pourquoi ?",
            required: true,
            autocomplete: false
        },
    ],

    async run(bot, message, args, db) {
        let user = args.getUser("membre");
        let member = message.guild.members.cache.get(user.id);
        if (!member) return message.reply({ content: "Ce gars n'existe pas chez moi... Je ne peux pas me le faire !", ephemeral: true, });
        let reason = args.getString("raison") || "Pas de raison fournie";


        if (!message.user.id === user.id) return message.reply({ content: "C'est pas bien de vouloir se warn...", ephemeral: true, });
        if ((await message.guild.fetchOwner().id) === user.id) return message.reply({ content: "C'est pas bien de vouloir warn le fonda...", ephemeral: true, });
        if (member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Tu ne peux pas warn cette personne", ephemeral: true, });
        if ((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply({ content: "Je ne peux pas warn cette personne", ephemeral: true, });

        let ID = await bot.function.createID('WARN')
        db.query(`INSERT INTO warns(user, author, warn, reason, date) VALUES ('${user.id}','${message.user.id}','${ID}','${reason.replace(/'/g, "\\'")}','${Date.now()}')`)
        try {
            await user.send({
                content: `Tu as été warn du serveur ${message.guild.name} par ${message.user.tag} pour la raison \`${reason} \``,
            });
            await message.reply({ content: "Le membre à bien été warn", ephemeral: true, });










        } catch (error) {
            await message.reply({ content: "Le membre à bien été warn", ephemeral: true, });


        }


    },
};
