module.exports = {
    name: 'youtube',
    description: "sends the youtube link!",
    execute(client, message, args, Discord){
        message.channel.send("https://www.youtube.com/channel/UCtzdMV59MiGT29PhqiwD3cQ");
    }
}