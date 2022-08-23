const botPerms = ['MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS'];
module.exports = {
	name: 'mute',
	description: 'mutes user',
	Level: 'Admin',
	listed: true,
	async execute(msg, args) {
    let member = !msg.mentions.members.first() ? await msg.guild.members.cache.get(`${args[0]}`) : msg.mentions.members.first();
		if (member != null) {
			if (msg.guild.me.permissions.has(botPerms)) {
				let muterole = msg.guild.roles.cache.find(name => name.name === "Mute") ? msg.guild.roles.cache.find(name => name.name === "Mute") : msg.guild.roles.create({ data: {name: 'Mute'} });
				msg.guild.channels.cache.forEach(async (channel, id) => {
					let chan = msg.guild.channels.cache.get(channel.id);
					if (channel.id == 673667393620410418) {
						await chan.overwritePermissions(muterole, {
							READ_MESSAGES: false,
							SEND_MESSAGES: false,
							ADD_REACTIONS: false
						});
					}
				});
				member.roles.add(muterole.id);
				msg.channel.send("Successfully muted")
			} else msg.channel.send(`I need the permissions ${botPerms.join(', ')} for this command to work properly`)
		} else msg.channel.send('User Either not found Or not given')
	},
};