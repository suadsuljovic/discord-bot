module.exports = {
  name: "greetings",
  aliases: ["hello"],
  description: "The bot will greet you",
  cooldown: 1,
  guildOnly: true,
  args: false,
  usage: false,
  // eslint-disable-next-line no-unused-vars
  execute(msg, args) {
    var randomNumber = Math.floor(Math.random() * 5);

    switch (randomNumber) {
      case 1:
        return msg.channel.send(`Greetings fellow human called ${msg.author}`);
      case 2:
        return msg.channel.send(
          `Hello old friend, I hope you're still called ${msg.author.username}`
        );
      case 3:
        return msg.channel.send(`You again ${msg.author.username}, get lost!`);
      case 4:
        return msg.channel.send(`Nice to meet you ${msg.author.username}`);
      case 5:
        return msg.channel.send("Your the best, you rolled 5!");
    }
  },
};
