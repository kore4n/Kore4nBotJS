module.exports = {
    name: 'youtube',
    aliases: ['yt', 'rat'],
    description: "sends the youtube link!",
    execute(message){
        message.channel.send("https://www.youtube.com/channel/UCtzdMV59MiGT29PhqiwD3cQ");
    }
}