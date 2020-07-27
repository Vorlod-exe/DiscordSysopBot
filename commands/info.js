const Discord = require("discord.js");
const { nom, licenceImage, hebergement, ynInfo } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynInfo == 1){

        message.delete();

        const infoEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('ℹ️ Informations')
        .setDescription(nom + ' est un script automatisé de modération pour le serveur Discord de la communauté francophone des projets Wikimedia.')
        .addField('Auteur', '[Vorlod](https://wikitech.wikimedia.org/wiki/User:Vorlod)', true)
        .addField('Licence', '[MIT](https://github.com/Vorlod-exe/sysopBot/blob/master/LICENSE)', true)
        .addField('Hébergement', hebergement, true)
        .addField('Code source', '[GitHub](https://github.com/Vorlod-exe/DiscordSysopBot)', true)
        .addField('Credit image', licenceImage, true)

        const user = client.users.cache.get(message.author.id);
        user.send(infoEmbed);

        console.log("Informations demandées par " + message.author.tag);

    }

}

module.exports.help = {
    name: "info"
}
