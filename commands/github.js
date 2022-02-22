module.exports = {
    name: 'github',
    aliases: ['git', 'source', 'src'],
    description: "Link to Github bot repository",
    execute(message, args, Discord){
        message.channel.send("https://github.com/kore4n/Kore4nBotJS");
    }
}