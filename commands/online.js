const Gamedig = require('gamedig');

const exec = async (message) => {
    try{
        let state =  await Gamedig.query({
            type: 'mtasa',
            host: '94.23.153.11'
        });
        let onlineUSSF = [];
        state.players.forEach(player => {
            if(player.name.match(/(USSF)/g)) {
                onlineUSSF.push(player.name);
            }
        });
        let string = `There are **${onlineUSSF.length}** USSF Operator(s) online. \n\`\`\``
        onlineUSSF.forEach(player => {
            string = string + player + "\n"
        });
        string = string + "\`\`\`"
        message.channel.send(string);
    } catch(err) {
        message.channel.send("Beep Boop! Something went wrong. Please blame Rex!");
    }
}

module.exports = {
    name: 'online',
    description: 'Check online USSF Operators',
    execute(message) {
        exec(message);
    }
}