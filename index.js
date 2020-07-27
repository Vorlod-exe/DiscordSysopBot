const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
client.commands = new Discord.Collection();
const { nom, prefixconfig, token, guild, guildImage, invitation, modchannelid, modchannelbisid, pseudointerdit, raidon, raiddelais, ynInvitation, ynRaid, ynPseudo, raiddelaisH, ynVerif, verifRole, channelAuth, idWikiAuthBot } = require('./config.json');

fs.readdir("./commands/", (err, files) => {
  console.log(`---------------------`);

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Commande introuvable.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} chargé.`);
        client.commands.set(props.help.name, props);
    });
  
  console.log(`---------------------`);
});


client.on('ready', () => {
  client.user.setStatus('online');
  console.log(`Connecté en tant que ${client.user.tag}`);
  console.log(`---------------------`);
});

client.on('message', async (message) => {
  if(message.author.bot) return;
    message.guild === null;


    let prefix = prefixconfig
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(message.content.startsWith(prefix)) {
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(client,message,args);
    }else{
        
        
    }
});

//Anti-pseudo + Anti-raid
client.on('guildMemberAdd', member => {

    //Anti-pseudo
    if (ynPseudo == 1){
      function antipseudo() {
        const banpseudoEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setAuthor(guild, guildImage)
        .setTitle(':no_entry: Vous avez été banni.')
        .setDescription(nom + " vous a banni automatiquement.")
        .addField('Motif', 'Pseudo innaproprié')
      
        const user = client.users.cache.get(`${member.id}`);
        user.send(banpseudoEmbed);
      
        const channel = client.channels.cache.get(modchannelbisid);
        channel.send(`:no_entry: ${member.user.tag} a été banni automatiquement pour pseudo innaproprié.`);
      
        console.log(`${member.user.tag} banni pour pseudo innaproprié.`);
      
        function banpseudo() { member.ban({ days: 0, reason: 'Pseudo innaproprié' }) }
      
        setTimeout(banpseudo, 1000); 
      }

      const has= (a,b)=> {
        for(let c in a) {
            if(b.includes(a[c])) return c;
        } return false;
    };

      let pseudointerditbis = pseudointerdit,
        interdit= has(pseudointerditbis, member.displayName.toLowerCase());
      if(interdit) {
        setTimeout(antipseudo, 100); 
      } else {
    }

      //Anti-raid
      if (ynRaid == 1){

        fs.readFile('raidVar.json', function(erreur, fichier) {
          let raidVar = JSON.parse(fichier)
     
          var nudate=new Date()
          var d=nudate.getDate();
          if (d<10) {d = "0" + d}
          var mo=nudate.getMonth();
          if (mo<10) {mo = "0" + mo}
          var y=nudate.getFullYear();
          if (y<10) {y = "0" + y}
          var h=nudate.getHours();
          if (h<10) {h = "0" + h}
          var m=nudate.getMinutes();
          if (m<10) {m = "0" + m}
          var s=nudate.getSeconds();
          if (s<10) {s = "0" + s}
          var thisdate = (y+mo+d+h+m+s)

          if(raidVar.RaidMemberAdd !== 999){
            if((raidVar.ludate - thisdate) >= raiddelais){
              ++raidVar.RaidMemberAdd
            }

            if((raidVar.ludate - thisdate) < raiddelais){
              if(raidVar.RaidMemberAdd >= raidon){

                const offraidEmbed = new Discord.MessageEmbed()
                .setColor('#2a4b8d')
                .setTitle(':shield: Mode anti-raid désactivé.')
                .setDescription(nom + " a désactivé le mode anti-raid automatiquement.")

                const channel = client.channels.cache.get(modchannelid);
                channel.send(offraidEmbed)

                console.log('Mode anti-raid désactivé.')
              }
              raidVar.RaidMemberAdd = 1
            }
          }

          if(raidVar.RaidMemberAdd >= raidon){

            if(raidVar.RaidMemberAdd === raidon){

              const onraidEmbed = new Discord.MessageEmbed()
              .setColor('#2a4b8d')
              .setTitle(':shield: Mode anti-raid actif.')
              .setDescription(nom + " a activé le mode anti-raid automatiquement.")
              .addField('Motif', 'Trop de nouveaux utilisateurs en même temps.')
              .addField('Cooldown', `Fin de la procédure dans ${raiddelaisH}.`)
              .addField('Arrêt', `En cas d'abus, uttilisez /raid off.`)

              const channel = client.channels.cache.get(modchannelid);
              channel.send(onraidEmbed)

              console.log('Mode anti-raid actif.')

            }
              const kickraidEmbed = new Discord.MessageEmbed()
              .setColor('#2a4b8d')
              .setAuthor(guild, guildImage)
              .setTitle(':shield: Vous avez été expulsé.')
              .setDescription(nom + " vous a expulsé automatiquement.")
              .addField('Motif', 'Vous avez rejoint le serveur en période de raid, réessayez plus tard.')
              .addField('Invitation', `Voici le [lien du serveur](https://discord.gg/${invitation}).`)
            
              const user = client.users.cache.get(`${member.id}`);
              user.send(kickraidEmbed);
            
              const channel = client.channels.cache.get(modchannelbisid);
              channel.send(`:shield: ${member.user.tag} a été expulsé automatiquement car il a rejoint en période de raid.`);
            
              console.log(`${member.user.tag} expulsé par le mode anti-raid.`);
            
              function kickraid() { member.kick('Mode anti-raid actif') }
            
              setTimeout(kickraid, 1000); 
          }

          if(raidVar.RaidMemberAdd !== 999){
            raidVar.ludate = (y+mo+d+h+m+s)


            fs.writeFileSync('./raidVar.json', `
{
  "ludate": ${raidVar.ludate},
  "RaidMemberAdd": ${raidVar.RaidMemberAdd}
}
            `, function (err) {
              if (err) return console.log(err);
            })
          }
        })
      }
    }
});


//Invitations
client.on("inviteCreate", invite => {
  if (ynInvitation == 1){
    if (invite.maxAge === 0) {
      invite.delete("Action automatique");
        
      const delinviteinfineEmbed = new Discord.MessageEmbed()
      .setColor('#FFFF00')
      .setAuthor(guild, guildImage)
      .setTitle(':link: Invitation supprimée.')
      .setDescription(nom + " a supprimée automatiquement l'invitation que vous venez de créer.")
      .addField('Motif', `Les invitations doivent être temporaires.`)
      .addField('Vous pouvez uttiliser celle-là', `[discord.gg/${invitation}](https://discord.gg/${invitation})`)

      const user = client.users.cache.get(`${invite.inviter.id}`);
      user.send(delinviteinfineEmbed);
    }
  }
});

//WikiAuthBot
client.on("guildMemberUpdate", async (oldmember, newmember) => {
  if (ynVerif == 1){
    const channel = client.channels.cache.get(modchannelid);

    //Adin non vérif
    if(newmember.hasPermission('ADMINISTRATOR')){
      if(!oldmember.hasPermission('ADMINISTRATOR')){
        if(!newmember.roles.cache.has(verifRole)){
          channel.send(`:warning: ${oldmember.user.tag} a reçu les permissions d'administrateur sans avoir confirmé son compte.`);
        }
      }
    }

    //Ajout non autorisé du rôle
    if(newmember.roles.cache.has(verifRole)){
      if(!oldmember.roles.cache.has(verifRole)){

        const fetchedLogs = await channel.guild.fetchAuditLogs({
          limit: 1,
          type: 'MEMBER_ROLE_UPDATE',
        });

        const thisLog = fetchedLogs.entries.first();

        const { executor, target } = thisLog;

        if(executor.id !== idWikiAuthBot){
          executor.send("Merci de ne pas ajouter manuellement le rôle des utilisateurs vérifiés.")
          newmember.roles.remove(verifRole)
          channel.send(`:warning: ${oldmember.user.tag} a reçu sa vérification sans passer par WikiAuthBot.`)
        }
      }
    }

    //Retrait non-autorisé du rôle
    if(!newmember.roles.cache.has(verifRole)){
      if(oldmember.roles.cache.has(verifRole)){
        channel.send(`:information_source: ${oldmember.user.tag} a vu son rôle de vérification retiré.`)
      }
    }
    
  }
}); 
    //supression de messages dans le salon #auth
client.on("messageDelete", (message) => {
  if (ynVerif == 1){
    if(message.channel.id === channelAuth){
      if(message.author.id == idWikiAuthBot){
        const channel = client.channels.cache.get(modchannelid);
        channel.send(`:warning: Un message à été supprimé dans le salon d'authentification.`)
      }
    }
  }
});
    //ajout d'un message non autorisé dans le salon auth
client.on("message", (message) => {
  if (ynVerif == 1){
    if(message.channel.id === channelAuth){
      if(message.author.id !== idWikiAuthBot){
        message.delete()
        message.author.send("Merci de ne pas envoyer de messages dans le salon d'authentification.")
      }
    }
  }
})



//Login
client.login(token);
