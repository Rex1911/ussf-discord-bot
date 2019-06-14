const Gamedig = require('gamedig');

const exec = async (message,args) => {
    try{
        let state =  await Gamedig.query({
            type: 'mtasa',
            host: '94.23.153.11'
        });
        let onlineList = [];
        state.players.forEach(player => {
            var toFind = args[0];
            var re = new RegExp(`(${toFind})`, "gi")
            if(player.name.match(re)) {
                onlineList.push(player.name);
            }
        });

        if(!onlineList.length) return message.reply("No player online with this name!");

        let string = `Found ${onlineList.length} player(s) with this name:\n\`\`\``;
        onlineList.forEach(player => {
            string = string + player + "\n"
        })
        string = string + "\`\`\`"
        message.channel.send(string);
    } catch(err) {
        message.channel.send("Beep Boop! Something went wrong. Please blame Rex!");
    }
}

module.exports = {
    name: 'isonline',
    description: 'Check if any player is online',
    execute(message, args) {
        exec(message, args);
    }
}