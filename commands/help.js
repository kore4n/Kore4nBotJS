module.exports = {
    name: 'help',
    aliases: ['h', 'commands', 'cmd', 'cmds'],
    description: "Displays all commands and their use cases",
    execute(message){
        message.channel.send("All commands begin with '.'")
        message.channel.send("General Commands: help, github, interrupt/i/annoy, join/j, leave/l/dc, ping/p, youtube")
        message.channel.send("Music Commands: play")
    }
}