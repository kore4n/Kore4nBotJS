require('dotenv').config();
const { Interaction } = require('discord.js');
const fs = require('fs');
const interactionCreate = require('../events/guild/interactionCreate');

module.exports = (client, Discord) => {
    const prefix = process.env.prefix;
    const load_dir = (dirs) =>{
        const event_files = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));
        for (const file of event_files){
            const event = require(`../events/${dirs}/${file}`);
            const event_name = file.split(prefix)[0];   // i.e. ready, message

            client.on(event_name, event.bind(null, Discord, client))
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e))
}