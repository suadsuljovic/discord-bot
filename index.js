// not used anymore
require('dotenv').config();
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');

// const fs = require('fs'); //not sure if needed in the future
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const botCommands = require('./commands');

mapCommands();

bot.login(token);

oneReady();

onMessage();


function onMessage() {
	bot.on('message', msg => {
		if(!messageOK(msg)) return;

		const args = getContentArray(msg);
		const commandName = args.shift().toLowerCase();

		const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if(!command) return;

		if (guildOnly(command, msg)) return msg.reply('I can\'t execute that command inside DMs!');

		if(needsArgs(command) && !msgHaveArgs(args)) return msg.channel.send(createReplyBadArrgs(msg, command));

		console.info(`Called command: ${commandName}`);

		setCooldownFor(command);

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(msg.author.id)) {
			const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

			if (now < expirationTime) {
				return msg.reply(CreateReplyCooldown(expirationTime, now, command));
			}
		}

		timestamps.set(msg.author.id, now);
		setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

		try {
			command.execute(msg, args);
		}
		catch (error) {
			console.error(error);
			msg.reply('there was an error trying to execute that command!');

		}
	});

	function CreateReplyCooldown(expirationTime, now, command) {
		const timeLeft = (expirationTime - now) / 1000;
		const reply = `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`;
		return reply;
	}

	function setCooldownFor(command) {
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}
	}

	function msgHaveArgs(args) {
		return args.length > 0;
	}

	function needsArgs(command) {
		return command.args;
	}

	function guildOnly(command, msg) {
		return command.guildOnly && msg.channel.type === 'dm';
	}

	function createReplyBadArrgs(msg, command) {
		let reply = `You didn't provide any arguments, ${msg.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return reply;
	}

	function messageOK(msg) {
		return msg.content.startsWith(prefix) && !msg.author.bot;
	}

	function getContentArray(msg) {
		return msg.content.slice(prefix.length).trim().split(/ +/);
	}
}

function oneReady() {
	bot.on('ready', () => {
		console.info(`Logged in as ${bot.user.tag}!`);
	});
}

function mapCommands() {
	Object.keys(botCommands).map(key => {
		bot.commands.set(botCommands[key].name, botCommands[key]);
	});
}
