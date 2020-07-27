const Discord = require("discord.js");
const { Permissions } = require('discord.js');
const { ynLock, modchannelid, prefixconfig, genchannelid } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynLock == 1){

        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            if (message.member.hasPermission('ADMINISTRATOR')) {

                let guild = message.member.guild;
                let eoPermsBit = guild.roles.everyone.permissions
                const eoPerms = new Permissions(eoPermsBit);
        
                if(args[0] == 'on'){
                    if(eoPerms.has('SEND_MESSAGES')){
                        
                        eoPerms.remove('SEND_MESSAGES')
                        eoPermsNew = new Permissions(eoPerms)
                        guild.roles.everyone.setPermissions(eoPermsNew)
                        message.react('✅');

                        raison = args.slice(1).join(' ');
                        if (!raison) raison = "Aucun motif n'a été fourni.";

                        const lockOnEmbed = new Discord.MessageEmbed()
                        .setColor('#FFFF00')
                        .setTitle('🔒 Serveur verrouillé')
                        .setDescription(message.author.tag + " a verrouillé le serveur. Aucun utilisateur ne peut envoyer de message.")
                        .addField('Motif', raison)
                        .addField('Déverrouillage', `La procédure ne s'arrêtera qu'après exécution de la commande **${prefixconfig}lock off**`)
            
                        var channel = client.channels.cache.get(modchannelid);
                        channel.send(lockOnEmbed);
                        var channel = client.channels.cache.get(genchannelid);
                        channel.send(lockOnEmbed);

                    } else {message.delete(); message.channel.send(":octagonal_sign: Le serveur est déjà verrouillé.").then(message => message.delete({timeout: 3000}));}
                }

                if(args[0] == 'off'){
                    if(!eoPerms.has('SEND_MESSAGES')){
                        
                        eoPerms.add('SEND_MESSAGES')
                        eoPermsNew = new Permissions(eoPerms)
                        guild.roles.everyone.setPermissions(eoPermsNew)
                        message.react('✅');

                        const lockOffEmbed = new Discord.MessageEmbed()
                        .setColor('#FFFF00')
                        .setTitle('🔒 Serveur déverrouillé')
                        .setDescription(message.author.tag + " a déverrouillé le serveur. Les utilisateurs peuvent envoyer des messages.")
            
                        var channel = client.channels.cache.get(modchannelid);
                        channel.send(lockOffEmbed);
                        var channel = client.channels.cache.get(genchannelid);
                        channel.send(lockOffEmbed);

                    } else {message.delete(); message.channel.send(":octagonal_sign: Le serveur n'est pas verrouillé.").then(message => message.delete({timeout: 3000}));}
                }

                if(args[0] == null){
                    if(eoPerms.has('SEND_MESSAGES')){
                        message.delete()
                        message.channel.send("Le serveur n'est pas verrouillé.").then(message => message.delete({timeout: 3000}))
                    } else {
                        message.delete()
                        message.channel.send("Le serveur est verrouillé.").then(message => message.delete({timeout: 3000}))  
                    }
                }

            }
            else {
                message.channel.send(":octagonal_sign: Vous n'avez pas la permission de faire ceci.").then(message => message.delete({timeout: 3000}));
            
                console.log(message.author.tag + " a essayé de /lock.")
            }

        }

    }

}

module.exports.help = {
    name: "lock"
}