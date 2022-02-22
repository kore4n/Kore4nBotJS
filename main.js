const Discord = require('discord.js');
const fs = require('fs')

const client = new Discord.Client({
     intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]});

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