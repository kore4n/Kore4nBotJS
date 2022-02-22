require('dotenv').config();

module.exports = (Discord, client, message) =>{
    const prefix = process.env.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot)
    {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    // check if command is correct
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try{
        command.execute(message, args, cmd, client, Discord);
    }
    catch (err){
        message.reply("There was an error trying to execute this command.");
        console.log(err);
    }
}
