const { getVoiceConnection } = require("@discordjs/voice")
const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: 'interrupt',
    aliases: ['i', 'annoy'],
    description: "Interrupts everyone in the current voice channel by joining and leaving",
    execute(message, cmd){
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command!');
        if (!voice_channel.joinable) return message.channel.send('I need permission to join your voice channel!')

        const connection = joinVoiceChannel({
            channelId: message.member.voice.channelId,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
        })
        connection.destroy()
    }
}