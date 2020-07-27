const Discord = require("discord.js");
const { ynPing } = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (ynPing == 1){

        message.delete();

        console.log("Test de latence demandé par " + message.author.tag + " en cours d'éxecution...")

        const msg = await message.channel.send("Test de latence demandé par " + message.author.tag + " en cours d'éxecution...");
            
        var ping = msg.createdTimestamp - message.createdTimestamp;

        await msg.edit(Math.round(ping) + "ms").then(message => message.delete({timeout: 3000}));

        console.log("/ping (ms) --> " + Math.round(ping))
    }

}

module.exports.help = {
    name: "ping"
}