const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: 'interrupt',
    aliases: ['i', 'annoy'],
    description: "Interrupts everyone in the current voice channel by joining and leaving",
    execute(message, args){
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a voice channel to execute this command!');
        if (!voice_channel.joinable) return message.channel.send('I need permission to join your voice channel!')

        if (!args.length){
            inOut()
            return
        }

        // running 3+ times crashes the bot, maybe add in a delay or something
        // const num = parseInt(args[0])
        // if (isNaN(num)){
        //     return message.channel.send("First argument must be a number")
        // }
        // else{
        //     for (let i = 0; i < num; i++){
        //         inOut()
        //     }
        // }

        function inOut(){
            message.delete()    // delete original command
                const connection = joinVoiceChannel({
                    channelId: message.member.voice.channelId,
                    guildId: message.guild.id,
                    adapterCreator: message.guild.voiceAdapterCreator,
                })
            connection.destroy()
        }
    }
}