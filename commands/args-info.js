module.exports = {
	name: 'args-info',
	aliases: false,
	description: 'Information about the arguments provided.',
	cooldown: false,
	guildOnly: true,
	args:true,
	usage:'<argument> <argument> ...',
	execute(msg, args) {
		if (args[0] === 'foo') {
			return msg.channel.send('bar');
		}

		msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};