const Discord = require("discord.js");
const { modchannelid, ynRaid, raidon, prefixconfig } = require('../config.json');

module.exports.run = async (client, message, args) => { 

    if (ynRaid == 1){

        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            const fs = require('fs');
            
            fs.readFile('./raidVar.json', function(erreur, fichier) {
                let raidVar = JSON.parse(fichier)
            
                setTimeout(() => {
                    message.delete();

                if (message.member.hasPermission('ADMINISTRATOR')) {
                    
                    raison = args.slice(1).join(' ');
                    if (!raison) raison = "Aucun motif n'a été fourni.";

                    if(args[0] == 'on'){

                        if(raidVar.RaidMemberAdd !== 999){
                        
                            fs.writeFileSync('./raidVar.json', `
{
    "ludate": 0,
    "RaidMemberAdd": 999
}
                            `, function (err) {
                            if (err) return console.log(err);
                            });

                            const onmanuraidEmbed = new Discord.MessageEmbed()
                            .setColor('#2a4b8d')
                            .setTitle(':shield: Mode anti-raid actif.')
                            .setDescription(message.author.tag + " a activé le mode anti-raid.")
                            .addField('Motif', raison)
                            .addField('Cooldown', `La procédure ne s'arrêtera qu'après exécution de la commande **${prefixconfig}raid off**.`)
                
                            const channel = client.channels.cache.get(modchannelid);
                            channel.send(onmanuraidEmbed)

                            console.log(`Mode anti-raid actif (activé par ${message.author.tag})`)
                        } else {message.reply('le mode anti-raid a déjà été activé manuellement.').then(message => message.delete({timeout: 3000}))}
                    }

                    if(args[0] == 'off'){

                        if(raidVar.RaidMemberAdd >= raidon){

                            fs.writeFileSync('./raidVar.json', `
{
    "ludate": 0,
    "RaidMemberAdd": 0
}
                            `, function (err) {
                            if (err) return console.log(err);
                            });

                            const offmanuraidEmbed = new Discord.MessageEmbed()
                            .setColor('#2a4b8d')
                            .setTitle(':shield: Mode anti-raid désactivé.')
                            .setDescription(message.author.tag + " a désactivé le mode anti-raid.")  
                            .addField('Motif', raison)

                            const channel = client.channels.cache.get(modchannelid);
                            channel.send(offmanuraidEmbed)

                            console.log(`Mode anti-raid innactif (désactivé par ${message.author.tag})`)
                        } else {message.reply(`le mode anti-raid n'est pas activé.`).then(message => message.delete({timeout: 3000}))}
                    }

                    if(args[0] == null){
                        if(raidVar.RaidMemberAdd < raidon){statutRaid = "❎ Le système n'est pas actif"}
                        else if(raidVar.RaidMemberAdd === 999){statutRaid = "⚠ Le système a été activé manuellement."}
                        else if(raidVar.RaidMemberAdd >= raidon){statutRaid = "⚠ Le système a été activé automatiquement."}

                        const inforaidEmbed = new Discord.MessageEmbed()
                        .setColor('#2a4b8d')
                        .setTitle(":shield: Aide concernant l'anti-raid.")
                        .setDescription("Ce script permet au bot d'expulser les utilisateurs arrivant en vague sur le serveur. Ces utilisateurs pouvant être des selfs bots participant à un raid.")  
                        .addField('Statut', statutRaid)
                        .addField("Activer l'anti-raid", "Utilisez **"+prefixconfig+"raid on**", true)
                        .addField("Désactiver l'anti-raid", "Utilisez **"+prefixconfig+"raid off**", true)
                        
                        const user = client.users.cache.get(message.author.id);
                        user.send(inforaidEmbed);
                
                        console.log("Aide sur l'anti-raid demandée par " + message.author.tag);
                }

                } else {
                    message.channel.send(":octagonal_sign: Vous n'avez pas la permission de faire ceci.").then(message => message.delete({timeout: 3000}));
                
                    console.log(message.author.tag + " a essayé de /raid.")
                }

                    }, 1000);

            })

        }

    }

}


module.exports.help = {
    name: "raid"
}