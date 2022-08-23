let fn = (role, msg) => {
	role.setMentionable(true).then(() => msg.channel.send(role.toString())).then(() => role.setMentionable(false));
}
module.exports = {
	name: 'friendlies',
	description: 'Matchmaking',
	Level: 'User',
	listed: true,
	Guild: [
		"785723909055447050"
	],
	async execute(msg, args) {
		let role;
		switch (args[0].toLowerCase()) {
			case 'play':
				role = msg.guild.roles.cache.get('765982313611132929');
				fn(role, msg);
				break;
			case 'tournament':
				role = msg.guild.roles.cache.get('764856619473174539');
				fn(role, msg);
				break;
			default:
				msg.reply('Please do $friendlies play/tournament');
		}
	}
} 