const Discord = require("discord.js");
const { nom, ynAide, prefixconfig } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynAide == 1){
        
        if(message.guild === null){message.reply(":octagonal_sign: Je ne peux pas vérifier que vous êtes administrateur par message privé, utilisez cette commande sur le serveur.")}
        else {

            message.delete();

            var aideEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('❔ Aide')
            .setDescription(nom + ' est conçu pour être le moins intrusif possible, par conséquent, très peu de commandes sont disponibles.')
            .addField('Gestion des invitations', 'Supprime automatiquement les invitations infinies.')
            .addField('Pseudos inappropriés', 'Banni automatiquement les utilisateurs avec un pseudonyme inapproprié.')
            .addField('Anti-raid', 'Expulse automatiquement les utilisateurs arrivant en vague.')
            .addField('WikiAuthBot', 'Vérifie que les nouveaux administrateurs ont vérifié leur compte avec WikiAuthBot, que personne ne gagne ou ne perdent de façon incohérente le rôle des uttilisateurs vérifiés, surveille les modifications du salon *logs* de WikiAuthBot.')
            .addField(prefixconfig + 'aide', 'Indique les commandes et fonctions disponibles.', true)
            .addField(prefixconfig + 'info', 'Procure des informations générales sur le bot.', true)
            .addField(prefixconfig + 'ping', 'Effectue un test de latence.', true)

            if (message.member.hasPermission('ADMINISTRATOR')) {
                aideEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('❔ Aide')
                .setDescription(nom + ' est conçu pour être le moins intrusif possible, par conséquent, très peu de commandes sont disponibles.')
                .addField('Gestion des invitations', 'Supprime automatiquement les invitations infinies.')
                .addField('Pseudos inappropriés', 'Banni automatiquement les utilisateurs avec un pseudonyme inapproprié.')
                .addField('Anti-raid', 'Expulse automatiquement les utilisateurs arrivant en vague.')
                .addField('WikiAuthBot', 'Vérifie que les nouveaux administrateurs ont vérifié leur compte avec WikiAuthBot, que personne ne gagne ou ne perdent de façon incohérente le rôle des uttilisateurs vérifiés, surveille les modifications du salon *logs* de WikiAuthBot.')
                .addField(prefixconfig + 'aide', 'Indique les commandes et fonctions disponibles.', true)
                .addField(prefixconfig + 'info', 'Procure des informations générales sur le bot.', true)
                .addField(prefixconfig + 'ping', 'Effectue un test de latence.', true)
                .addField(prefixconfig + 'clear [NB]', 'Supprime les x derniers messages (ADMIN)', true)
                .addField(prefixconfig + 'lock [on/off] [MOTIF]', 'Empêche tous les utilisateurs de parler (ADMIN)', true)
                .addField(prefixconfig + 'stop [MOTIF]', 'Arrête le programme (ADMIN)', true)
                .addField(prefixconfig + 'config', 'Donne la configuration du bot (ADMIN)', true)

                const aideRaidEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('❔ Que faire en cas de raid ?')
                .setDescription(`Un [raid](https://fr.wiktionary.org/wiki/raid) est, sur Discord ou IRC, une arrivée massive d'utilisateurs ou de robots ayant sur un canal ayant pour but de rendre le rendre inutilisable, notamment par l'envoi continu de messages. ` + nom + ' peut être configuré pour exclure les utilisateurs arrivant en vague. Ceci est une protection supplémentaire à celles natives de Discord, mais toutes ces protections peuvent être menées en échec.')
                .addField('En cas de raid', "Voici comment réagir si la protection anti-raid de " + nom + " ne suffit pas.")
                .addField('1️⃣', 'Si ' + nom + " n'a pas reconnu l'arrivée simultanée de plusieurs utilisateurs, utilisez `"+prefixconfig+"raid on`.")
                .addField('2️⃣', 'Si plusieurs utilisateurs réussissent quand même à spam, utilisez `'+prefixconfig+"lock on`.")
                .addField('3️⃣', "Supprimez les messages à l'aide de `"+prefixconfig+"clear [NB]`.")
                .addField('4️⃣', 'Désactivez ce que vous avez utilisé avec `'+prefixconfig+"raid off` et `"+prefixconfig+"lock off`.")

                const user = client.users.cache.get(message.author.id);
                user.send(aideEmbed);
                user.send(aideRaidEmbed)
            } else {
                const user = client.users.cache.get(message.author.id);
                user.send(aideEmbed);
            }

            console.log("Aide demandée par " + message.author.tag);

        }
        
    }

}

module.exports.help = {
    name: "aide"
}
