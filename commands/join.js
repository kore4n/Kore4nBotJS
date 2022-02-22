const { getVoiceConnection } = require("@discordjs/voice")

module.exports = {
    name: 'join',
    aliases: ['j', 'l', 'leave'],
    description: "sends the youtube link!",
    execute(message, args, cmd){
        if (cmd == 'join' || cmd == "j"){
            const connection = joinVoiceChannel({
                channelId: voice_channel.id,
                guildId: voice_channel.guild.id
            })
            message.channel.send("Kore4n Bot has joined the voice channel!")
        }
        else if (cmd == "l" || cmd == "leave"){
            const connection = getVoiceConnection(message.guild.id)
            message.channel.send("Kore4n Bot has left the voice channel!")
        }
    }
}