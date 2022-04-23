const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	aliases: false,
	description: 'Info about a specific command.',
	cooldown: 5,
	guildOnly: true,
	args: true,
	usage: '[commandName]',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });
	},
};