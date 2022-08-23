const botPerms = ['MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS'];
module.exports = {
	name: 'unmute',
	description: 'unmutes user',
	Level: 'Admin',
	listed: true,
	async execute(msg, args, t, client) {
	  let member = !msg.mentions.members.first() ? await msg.guild.members.cache.get(`${args[0]}`) : msg.mentions.members.first();
		if (member) {
			if (msg.guild.me.permissions.has(botPerms)) {
				let muterole = msg.guild.roles.cache.find(name => name.name === "Mute") ? msg.guild.roles.cache.find(name => name.name === "Mute") : msg.guild.roles.create({ data: {name: 'Mute'} });
				msg.guild.channels.cache.forEach(async (channel) => {
					let chan = msg.guild.channels.cache.get(channel.id);
					await chan.createOverwrite(muterole, {
						READ_MESSAGES: false,
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
				member.roles.remove(muterole.id);
        msg.channel.send("Successfully unmuted")
			} else
				msg.channel.send(`I need the permissions ${botPerms.join(', ')} for this demonstration to work properly`)
		} else msg.channel.send('User Either not found Or not given')
	},
};