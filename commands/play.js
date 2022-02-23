const { QueryType } = require('discord-player')
const { getVoiceConnection } = require("@discordjs/voice");
const { joinVoiceChannel } = require('@discordjs/voice');


//Global queue for your bot. Every server will have a key and value pair in this map. { guild.id, queue_constructor{} }
// const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'skip', 'stop'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message,args, cmd){
        //Checking for the voicechannel and permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        //This is our server queue. We are getting this server queue from the global queue.
        // const server_queue = queue.get(message.guild.id);

        //If the user has used the play command
        if (cmd === 'play' || cmd ==='p'){
            if (!args.length) return message.channel.send('You need to send the second argument!');

            const connection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            })
            message.channel.send("Kore4n Bot has joined the voice channel!")
        }

        if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

        const res = await player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

        const queue = await player.createQueue(message.guild, {
            metadata: message.channel
        });

        // try {
        //     if (!queue.connection) await queue.connect(message.member.voice.channel);
        // } catch {
        //     await player.deleteQueue(message.guild.id);
        //     return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
        // }

        await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    }
}