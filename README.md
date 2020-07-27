# DiscordSysopBot

Bot Discord pour modération automatique (Pseudos inappropriés, gestion des invitations, protection anti-raid, ...)


## Installation
Suivez ces étapes pour installer sysopBot sur votre serveur Discord.

### Pré-requis
* Créer une application sur le Discord Developer Portal
* Avoir une solution d'hébergement
* Installer Node.js
* Installer discord.js (`npm i discord.js`)
* Installer fs (`npm i fs`)

### Configuration
* Ouvrez `config.js` avec n'importe quel éditeur
* Complétez les champs requis :
  * Identité
    * `nom` -> le nom que vous avez donné au bot
    * `licenceImage` -> l'auteur et la licence de l'image utilisée par le bot comme image de profil
    * `hebergement` -> l'hébergeur du bot
    * `prefixconfig` -> le préfixe du bot
    * `token` -> le token du bot
  * Serveur
    * `guild` -> le nom du serveur pour lequel est configuré le bot
    * `guildImage` -> le lien de l'image du serveur
    * `invitation` -> le code de l'invitation permanente du serveur
    * `modchannelid` -> l'ID du canal de modération
    * `modchannelbisid` -> l'ID d'un deuxième canal de modération (logs de préférence, peut être identique du précédent)
    * `genchannelid` -> l'ID du canal général du serveur
  * Services -> utilisez `1` pour activer le service sélectionné, `0` pour le désactiver
    * `ynInvitation` -> supprime les nouvelles invitations pérennantes
    * `ynRaid` -> expulse les utilisateurs arrivant en vague
    * `ynPseudo` -> banni automatiquement les nouveaux utilisateurs avec un pseudo contenant des mots interdit
    * `ynAide` -> commande d'aide
    * `ynInfo` -> commande d'informations sur le bot
    * `ynPing` -> commande de ping
    * `ynClear` -> suppression de plusieurs messages sur un canal
    * `ynStop` -> arrêt du bot
    * `ynConfig` -> donne la configuration du bot
    * `ynLock` -> empêche à tous les utilisateurs de parler
    * `ynVerif` -> nécessite WikiAuthBot
  * Raid -> configuration du service anti-raid
    * `raidon` -> seuil d'utilisateurs simultanés
    * `raiddelais`-> cooldown (ex: `100` pour une minute, `130` pour une minute et 30 secondes, `1223` pour 12 minutes et 23 secondes)
    * `raiddelaisH` -> traduction du cooldown en langage humain (ex: une minute)
  * Pseudo -> configuration du service anti-pseudo
    * `pseudointerdit` -> liste des mots interdit dans les pseudos
  * Vérification -> configuration de l'aide à WikiAuthBot
    * `idWikiAuthBot` -> ID de WikiAuthBot
    * `verifRole` -> ID du rôle des utilisateurs confirmés
    * `channelAuth` -> ID du canal de log de WikiAuthBot

### Ajouter le bot sur votre serveur
Voici le lien d'ajout du bot, remplacez `INSERT_CLIENT_ID_HERE` par l'ID d'application disponible sur le portail de développement.
> https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=8


## Démarrage
Voici deux méthodes pour démarrer le bot

### IDE
Utiliser l'interface développement

### run.bat
Créez un fichier `.bat` dans le dossier de votre bot avec le code :
`node index.js
pause`


## Conditions
### Licence
**Ce code est délivré dans les conditions de la licence MIT.** Merci de respecter ces termes.

### Retours
Je vous demande de bien vouloir me retourner les problèGitHubceGitHubceec cGitHubGitHubGitHubsectionla section adaptée sur GitHub.
