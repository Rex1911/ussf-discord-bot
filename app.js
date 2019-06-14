const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

const auth = "";
const PREFIX = "."

client.commands = new Discord.Collection();

//Dynamically including the files in the commands folder
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async message => {
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;
    
    const args = message.content.slice(PREFIX.length).split(/ +/); 
    const command = args.shift().toLowerCase();
    
    if(command === `online`) {
        client.commands.get('online').execute(message)
    } else if(command === `isonline`) {
        if(!args.length) return message.reply("You didnt provide any name!"); //If no arguments provided
        if(args.length > 1) return message.reply("Please provide only 1 name!"); //If more than 1 arguments provided
        if(args[0].length < 3) return message.reply("The name provided should have 3 or more letters!"); //If the name provided has less than 3 characters

        client.commands.get('isonline').execute(message, args)
    }
});

const token = process.env.token || auth

client.login(token);
