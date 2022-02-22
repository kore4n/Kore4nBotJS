const { getVoiceConnection } = require("@discordjs/voice")

module.exports = {
    name: 'join',
    aliases: ['j', 'l', 'leave'],
    description: "sends the youtube link!",
    execute(message, args, cmd){
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command!');
        if (!voice_channel.joinable) return message.channel.send('I need permission to join your voice channel!')

        if (cmd === 'join' || cmd === "j"){
            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })
            message.channel.send("Kore4n Bot has joined the voice channel!")
        }
        else if (cmd === "l" || cmd === "leave"){
            const connection = getVoiceConnection(voice_channel.guild.id)
            if(!connection) return message.channel.send("I'm not in a voice channel!")
            connection.destroy()
            message.channel.send("Kore4n Bot has left the voice channel!")
        }

        message.channel.send("Command registered")
        console.log(cmd)
        message.channel.send(cmd)
    }
}