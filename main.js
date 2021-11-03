const Discord = require('discord.js');
const fs = require('fs')

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"]});

const prefix = '.';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
}

client.once('ready', () =>{
    console.log("Bot is ready.")
});

client.on('message', message =>{
    if (!message.content.startsWith(prefix) || message.author.bot)
    {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping')
    {
        client.commands.get('ping').execute(message, args)
    }
    else if (command === 'youtube')
    {
        client.commands.get('youtube').execute(message, args)
    }
});


// read token and login
fs.readFile('token.txt', 'utf8' , (err, _token) => {
  if (err) {
    console.error(err);
    return
    }
    client.login(_token);
})