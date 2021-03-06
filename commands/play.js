const { QueryType } = require('discord-player')
const { getVoiceConnection } = require("@discordjs/voice");
const { joinVoiceChannel } = require('@discordjs/voice');
const { Player } = require("discord-player");

module.exports = {
    name: 'play',
    aliases: ['p', 'queue', 'q', 'np', 'nowplaying', 'playing', 'skip', 'sk', 'stop', 'st', 'f'], //We are using aliases to run the skip and stop command follow this tutorial if lost: https://www.youtube.com/watch?v=QBUJ3cdofqc
    cooldown: 0,
    description: 'Advanced music bot',
    async execute(message,args, cmd, client){
        //Checking for the voicechannel and permissions
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.channel.send('You need to be in a channel to execute this command!');
        const permissions = voice_channel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('You dont have the correct permissins');
        if (!permissions.has('SPEAK')) return message.channel.send('You dont have the correct permissins');

        const player = new Player(client);
        //If the user has used the play command
        if (cmd === 'play' || cmd ==='p'){
            if (!args.length) return message.channel.send('You need to send the second argument!');
            const res = await player.search(args.join(' '), {
                requestedBy: message.member,
                searchEngine: QueryType.AUTO
            });
    
            if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}. ❌`);
    
            const queue = await player.createQueue(message.guild, {
                metadata: message.channel
            });
    
            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch (err){
                await player.deleteQueue(message.guild.id);
                console.log(err);
                return message.channel.send(`I can't join the voice channel ${message.author}. ❌`);
            }
    
            await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}. 🎧`);
    
            res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
            
            message.channel.send(queue.current.url);
            if (!queue.playing) await queue.play();
        }
        else if (cmd === "queue" || cmd === 'q'){
            const queue = player.getQueue(message.guild.id);

            if (!queue) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);

            if (!queue.tracks[0]) return message.channel.send(`No music in the queue after the current one ${message.author}... try again ? ❌`);

            const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`);

            const songs = queue.tracks.length;
            const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;

            message.channel.send(nextSongs);
        }
        else if (cmd === 'np' || cmd === 'nowplaying' || cmd === 'playing'){
            const queue = player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}... try again ? ❌`);
            
            const track = queue.current;
            const timestamp = queue.getPlayerTimestamp();
            const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
            message.channel.send(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nRequested by ${track.requestedBy}`);
        }
        else if (cmd === "skip" || cmd === "sk"){
            const queue = player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}. ❌`);

            const success = queue.skip();

            return message.channel.send(success ? `Current music ${queue.current.title} skipped ✅` : `Something went wrong ${message.author}. ❌`);
        }
        else if (cmd === "stop" || cmd === "st" || cmd === "f"){
            const queue = player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.channel.send(`No music currently playing ${message.author}. ❌`);

            queue.destroy();

            message.channel.send(`Music stopped into this server, see you next time ✅`);
        }
    }
}