let numbers = {};
module.exports = {
  name: "guess",
  aliases: ["g"],
  description: "Guess the number!",
  cooldown: 2,
  guildOnly: true,
  args: true,
  usage: false,
  // eslint-disable-next-line no-unused-vars
  execute(msg, args) {
    const argument = args[0];

    if (argument === "start") {
      numbers[msg.author.id] = Math.floor(Math.random() * 10);
      return msg.reply("The new game has started. Please guess the number!");
    }

    if (numbers[msg.author.id] === undefined) {
      return msg.reply("Please start the game by typing start!");
    }

    if (numbers[msg.author.id] === parseInt(argument)) {
      delete numbers[msg.author.id];
      return msg.reply("Congrats you won!");
    }

    return msg.reply("You stupid programmer, you know nothing!");

    // if (randomNumber === undefined) {
    //   randomNumber = Math.floor(Math.random() * 10);
    //   return msg.reply("The game has started. Please guess the number!");
    // } else {
    //   if (randomNumber === parseInt(argument)) {
    //     randomNumber = undefined;
    //     return msg.reply("Congrats you won!");
    //   } else {
    //     return msg.reply("You stupid programmer, you know nothing!");
    //   }
    // }
  },
};
