module.exports = {
	name: 'ping',
	aliases: ['pong', 'pulse'],
	description: 'Ping!',
	cooldown: 5,
	guildOnly: true,
	args:false,
	usage:false,
	// eslint-disable-next-line no-unused-vars
	execute(msg, args) {
		const now = Date.now();
		const duration = (now - msg.createdTimestamp) / 1000;
		msg.reply(`Pong! Time needed: ${duration.toFixed(3)}s`);
	},
};