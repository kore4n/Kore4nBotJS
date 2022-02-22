const Discord = require('discord.js');
const fs = require('fs')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"]});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
});

// read token and login
// fs.readFile('token.txt', 'utf8' , (err, _token) => {
//   if (err) {
//     console.error(err);
//     return
//     }
//     client.login(_token);
// })
client.login(process.env.TOKEN);