module.exports = {
    name: 'help',
    aliases: ['commands', 'cmd', 'cmds'],
    description: "Displays all commands and their use cases",
    execute(message){
        message.channel.send("all commands start with '.'")
        message.channel.send("help, github, interrupt, join, ping, play, youtube")
    }
}