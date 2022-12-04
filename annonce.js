const Discord = require("discord.js")
const { EmbedBuilder, TextInputBuilder, ModalBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js")

module.exports = {

    name: "annonce",
    description: "Faire une annonce",
    type: 1,
    dm: false,
    category: "Administration",
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "Administrator"
    },
    async run(bot, message, args) {
        let Modal = new Discord.ModalBuilder()
            .setCustomId('report')
            .setTitle('Créé ton embed')

        let question1 = new Discord.TextInputBuilder()
            .setCustomId('titre')
            .setLabel('Quel titre voulez-vous mettre ?')
            .setRequired(false)
            .setPlaceholder('Ecrit ici... (facultatif)')
            .setStyle(TextInputStyle.Short)

        let question2 = new Discord.TextInputBuilder()
            .setCustomId('description')
            .setLabel("Quelle description voulez-vous mettre ?")
            .setRequired(true)
            .setPlaceholder('Ecrit ici...')
            .setStyle(TextInputStyle.Paragraph)

        let question3 = new Discord.TextInputBuilder()
            .setCustomId('couleur')
            .setLabel('Quelle couleur voulez-vous mettre ?')
            .setRequired(false)
            .setPlaceholder('Dans ce format : #3dffcc (facultatif)')
            .setStyle(TextInputStyle.Short)

        let question5 = new Discord.TextInputBuilder()
            .setCustomId('timestamp')
            .setLabel('Voulez-vous mettre le timestamp ?')
            .setRequired(false)
            .setPlaceholder('oui/non (facultatif)')
            .setStyle(TextInputStyle.Short)

        let ActionRow1 = new Discord.ActionRowBuilder().addComponents(question1);
        let ActionRow2 = new Discord.ActionRowBuilder().addComponents(question2);
        let ActionRow3 = new Discord.ActionRowBuilder().addComponents(question3);
        let ActionRow5 = new Discord.ActionRowBuilder().addComponents(question5);

        Modal.addComponents(ActionRow1, ActionRow2, ActionRow3, ActionRow5)

        await message.showModal(Modal)

        try {

            let reponse = await message.awaitModalSubmit({ time: 300000 })

            let titre = reponse.fields.getTextInputValue('titre')
            let description = reponse.fields.getTextInputValue('description')
            let couleur = reponse.fields.getTextInputValue('couleur')
            let timestamp = reponse.fields.getTextInputValue('timestamp')

            const EmbedBuilder = new Discord.EmbedBuilder()
                .setColor('#3dffcc')
                .setDescription(`✅ Votre embed à été envoyer avec succès !`)

            if (!couleur) couleur = '#000001'
            if (!titre) titre = ' '
            if (!description) description = ' '

            let EmbedBuilder1 = new Discord.EmbedBuilder()
                .setColor(`${couleur}`)
                .setTitle(`${titre}`)
                .setDescription(`${description}`)

            if (reponse.fields.getTextInputValue('timestamp') === 'oui') EmbedBuilder1.setTimestamp()
            if (!reponse.fields.getTextInputValue('timestamp') === 'oui') return;

            await message.channel.send({ content: "@everyone", embeds: [EmbedBuilder1] })

            await reponse.reply({ embeds: [EmbedBuilder], ephemeral: true })

        } catch (err) { console.log(err); }
    }
}