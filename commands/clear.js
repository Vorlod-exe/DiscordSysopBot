const Discord = require("discord.js");
const { ynClear } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynClear == 1){

        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            message.delete();

            if (message.member.hasPermission('ADMINISTRATOR')) {

                const args = message.content.split(' ').slice(1);
                const amount = args.join(' ');
                
                if (!amount) return message.reply('merci de rentrer un nombre de messages à supprimer.').then(message => message.delete({timeout: 3000}));
                if (isNaN(amount)) return message.reply('merci de rentrer un nombre de messages à supprimer.').then(message => message.delete({timeout: 3000}));
                
                if (amount > 100) return message.reply('vous ne pouvez pas supprimer plus de 100 messages.').then(message => message.delete({timeout: 3000}));
                if (amount < 1) return message.reply('vous devez supprimer au moins un message !').then(message => message.delete({timeout: 3000}));
                
                message.channel.bulkDelete(args[0],{filterold: 1})
                    .then(console.log(message.author.tag + " a /clear " + args[0] + " messages."))
                    .catch(
                        message.channel.send(':information_source: Il est impossible de supprimer des messages vieux de plus de 14 jours.').then(message => message.delete({timeout: 3000}))
                        )

            }
            else {
                message.channel.send(":octagonal_sign: Vous n'avez pas la permission de faire ceci.").then(message => message.delete({timeout: 3000}));
            
                console.log(message.author.tag + " a essayé de /clear.")
            }

        }
    }

}

module.exports.help = {
    name: "clear"
}