module.exports = {
    name: 'ping',
    aliases: ['ping me', 'p'],
    description: "this is a ping command!",
    execute(message, args, cmd, client, Discord){
        message.channel.send("Pong!");
    }
}