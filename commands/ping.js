module.exports = {
    name: 'ping',
    aliases: ['ping me', 'p'],
    description: "this is a ping command!",
    execute(message){
        message.channel.send("Pong!");
    }
}