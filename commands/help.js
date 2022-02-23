module.exports = {
    name: 'help',
    aliases: ['h', 'commands', 'cmd', 'cmds'],
    description: "Displays all commands and their use cases",
    execute(message){
        message.channel.send("All commands begin with '.'")
        message.channel.send("help, github, interrupt, join, ping, play, youtube")
    }
}