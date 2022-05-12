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
  execute(msg, args) {
    fetch("https://api.quotable.io/random")
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        msg.reply(result.content + "; author: " + result.author);
      });
  },
};
