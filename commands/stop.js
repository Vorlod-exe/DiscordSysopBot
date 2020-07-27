const Discord = require("discord.js");
const { nom, modchannelid, ynStop } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynStop == 1){

        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            if (message.member.hasPermission('ADMINISTRATOR')) {
                raison = args.slice(0).join(' ');
                if (!raison) raison = "Aucun motif n'a été fourni.";

                message.react('✅');
                
                const stopEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle(':mobile_phone_off: Bot down !')
                .setDescription(nom + " a été éteint manuellement par " + message.author.tag)
                .addField('Motif', raison)

                const channel = client.channels.cache.get(modchannelid);
                channel.send(stopEmbed);
                
                console.log(nom + " a été éteint manuellement par " + message.author.tag + ". Motif : " + raison);

                function lecoupdegrace() { process.exit() }

                setTimeout(lecoupdegrace, 1000); 

                    
            }
            else {
                message.channel.send(":octagonal_sign: Vous n'avez pas la permission de faire ceci.").then(message => message.delete({timeout: 3000}));

                console.log(message.author.tag + "a essayé d'arrêter le bot.")
            }

        }
    }

}

module.exports.help = {
    name: "stop"
}