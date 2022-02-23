const Discord = require('discord.js');
const { Player } = require("discord-player");

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

global.player = new Player(client);

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(process.env.TOKEN);