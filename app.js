const Discord = require('discord.js');
const auth = "";
const Gamedig = require('gamedig');
const client = new Discord.Client();

const PREFIX = "."

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async message => {
    if(message.content === `${PREFIX}online`) {
        try{
            let state =  await Gamedig.query({
                type: 'mtasa',
                host: '94.23.153.11'
            })
            let onlineUSSF = [];
            state.players.forEach(player => {
                if(player.name.match(/(USSF)/g)) {
                    onlineUSSF.push(player.name);
                }
            })
            let string = `There are **${onlineUSSF.length}** USSF Operators online. \n\`\`\``
            onlineUSSF.forEach(player => {
                string = string + player + "\n"
            })
            string = string + "\`\`\`"
            message.channel.send(string);
        } catch(err) {
            console.log("Beep Boop! Something went wrong. Please blame Rex!");
        }
    }
});

const token = process.env.token || auth

client.login(token);