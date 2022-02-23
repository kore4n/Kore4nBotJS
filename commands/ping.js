module.exports = {
    name: 'ping',
    aliases: ['ping me'],
    description: "this is a ping command!",
    execute(message){
        message.channel.send("Pong!");
    }
}