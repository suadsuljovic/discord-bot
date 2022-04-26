module.exports = {
  name: "add",
  aliases: [],
  description: "Add two numbers!",
  cooldown: 5,
  guildOnly: true,
  args: true,
  usage: false,
  // eslint-disable-next-line no-unused-vars
  execute(msg, args) {
    var a = parseInt(args[0]);
    var b = parseInt(args[1]);

    console.log(msg);

    if (args.length < 2) {
      return msg.reply("You didn't provide 2 arguments");
    }

    msg.reply(`Sum of two numbers is ${a + b}`);
  },
};
