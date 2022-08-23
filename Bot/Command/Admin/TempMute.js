const botPerms = ['MANAGE_MESSAGES', 'MANAGE_ROLES', 'MANAGE_CHANNELS'];
module.exports = {
	name: 'tempmute',
	description: 'temp mutes user',
	Level: 'Admin',
	listed: true,
	async execute(Msg, args) {
		let member = !Msg.mentions.members.first() ? await Msg.guild.members.cache.get(`${args[0]}`) : Msg.mentions.members.first();
		if (member != null) {
				if (Msg.guild.me.permissions.has(botPerms)) {
					let muterole = Msg.guild.roles.cache.find(name => name.name === "Mute") ? Msg.guild.roles.cache.find(name => name.name === "Mute") : Msg.guild.roles.create({ data: {name: 'Mute'} });
					Msg.guild.channels.cache.forEach(async (channel, id) => {
						let chan = Msg.guild.channels.cache.get(channel.id);
						if (channel.id == 673667393620410418) {
							await chan.createOverwrite(muterole, {
								READ_MESSAGES: false,
								SEND_MESSAGES: false,
								ADD_REACTIONS: false
							});
						}
					});
					member.roles.add(muterole.id);
					let roles = member.roles.cache.map((Elm) => {
						if (Elm.id != muterole.id) {
              member.roles.remove(Elm.id);
							return Elm.id;
						}
					}).filter(n => n);
          let ms = args[1] ? parseFloat(args[1])*1000*60 != 0 : 1000;
					DB.ref(`data/server/${Msg.guild.id}/mute/${member.id}`).set({
						id: member.id,
						guild: Msg.guild.id,
						role: roles,
						start: Date.now(),
						time: ms
					});
					setTimeout(async (arg) => {
						member.roles.remove(muterole.id);
            DB.ref(`data/server/${Msg.guild.id}/mute/${member.id}`).once("value").then((Snap) => {
            if (Snap.val() != null) {
							Snap.val().role.forEach(Elm => member.roles.add(Elm));
							DB.ref(`data/server/${Msg.guild.id}/mute/${member.id}`).remove();
						}
          });
				}, ms);
			} else 
				Msg.channel.send(`I need the permissions ${botPerms.join(', ')} for this command to work properly`);
		} else
			Msg.channel.send('User Either not found Or not given');
	},
};