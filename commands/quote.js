const fetch = require("node-fetch");
module.exports = {
  name: "quote",
  aliases: ["q"],
  description: "Random quote from internet",
  cooldown: 5,
  guildOnly: true,
  args: false,
  usage: false,
  // eslint-disable-next-line no-unused-vars
  async execute(msg, args) {
    const author = args[0];

    const response = await fetch(
      `https://api.quotable.io/random${author ? `?author=${author}` : ""}`
    );
    const result = await response.json();

    console.log(result);
    msg.reply(result.content + "; author: " + result.author);
  },
};
