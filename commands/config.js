const Discord = require("discord.js");

const { prefixconfig, guild, guildImage, invitation, modchannelid, modchannelbisid, pseudointerdit, statutinterdit, raidon, raiddelaisH, ynConfig, ynInvitation, ynRaid, ynPseudo, ynStatut, ynAide, ynInfo, ynPing, ynClear, ynStop, ynLock, ynVerif, genchannelid, verifRole } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynConfig == 1){

        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            message.delete();

            if (message.member.hasPermission('ADMINISTRATOR')) {

                if(ynInvitation == 1){eInvitation = "✅"} else{eInvitation ="❌"}
                if(ynPseudo == 1){ePseudo = "✅"} else{ePseudo ="❌"}
                if(ynRaid == 1){eRaid = "✅"} else{eRaid ="❌"}
                if(ynVerif == 1){eVerif = "✅"} else{eVerif ="❌"}
                if(ynAide == 1){eAide = "✅"} else{eAide ="❌"}
                if(ynInfo == 1){eInfo = "✅"} else{eInfo ="❌"}
                if(ynPing == 1){ePing = "✅"} else{ePing ="❌"}
                if(ynClear == 1){eClear = "✅"} else{eClear ="❌"}
                if(ynLock == 1){eLock = "✅"} else{eLock ="❌"}
                if(ynConfig == 1){eConfig = "✅"} else{eConfig ="❌"}
                if(ynStop == 1){eStop = "✅"} else{eStop ="❌"}
                if(ynConfig == 1){eConfig = "✅"} else{eConfig ="❌"}
                
                const services = `${eInvitation} - Gestion des invitations
                ${ePseudo} - Pseudos inappropriés
                ${eRaid} - Anti-raid
                ${eVerif} - Vérification des administrateurs
                ${eAide} - ${prefixconfig}aide
                ${eInfo} - ${prefixconfig}info
                ${ePing} - ${prefixconfig}ping
                ${eClear} - ${prefixconfig}clear
                ${eLock} - ${prefixconfig}lock
                ${eStop} - ${prefixconfig}stop
                ${eConfig} - ${prefixconfig}config`

                const configEmbed = new Discord.MessageEmbed()
                .setColor('#eaecf0')
                .setTitle(':tools: Configuration')
                .setDescription("Merci de ne pas publier ces informations.")
                .addField('Préfixe du bot', prefixconfig, true)
                .addField('ID du canal de modération', modchannelid, true)
                .addField('ID du 2nd canal de modération', modchannelbisid, true)
                .addField('ID du canal général', genchannelid, true)
                .addField('ID du rôle des utilisateurs confirmés', verifRole, true)
                .addField('Nom configuré du serveur', guild, true)
                .addField('Invitation principale du serveur', invitation, true)
                .addField('Image configurée du serveur', guildImage)
                .addField('Services activés', services)
                .addField('Pseudos interdits', pseudointerdit, true)
                .addField('Anti-raid', `L'anti-raid se déclanche après ${raidon} arrivées en moins de ${raiddelaisH} et se désactive après la même durée sans nouveaux arrivants.`)

                const user = client.users.cache.get(message.author.id);
                user.send(configEmbed);


                console.log(message.author.tag + " a obtenu la configuration du bot")
            } else {
                
                message.channel.send(":octagonal_sign: Vous n'avez pas la permission de faire ceci.").then(message => message.delete({timeout: 3000}));

                console.log(message.author.tag + " a essayé d'obtenir la configuration du bot")
            }

        }
    }

}

module.exports.help = {
    name: "config"
}