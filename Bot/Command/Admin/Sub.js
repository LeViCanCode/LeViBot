module.exports = {
	name: 'sub',
	description: 'subtracts from the leaderboard',
  Level: 'Admin',
	listed: true,
	async execute(msg, args) {
		let member = !msg.mentions.members.first() ? await msg.guild.members.cache.get(`${args[0]}`) : msg.mentions.members.first();
		if (member != null) {
			try {
				DB.ref(`data/server/${msg.guild.id}/users/${member.id}`).once('value').then(function(snapshot) {
				  let experience = snapshot.val() && snapshot.val().xp ? snapshot.val().xp : 0;
				  DB.ref(`data/server/${msg.guild.id}/users/${member.id}`).set({
					  username: `${member.user.username}`,
					  id: `${member.id}`,
					  xp: experience - parseFloat(args[1])
				  })
				  msg.channel.send(`subtracted ${parseFloat(args[1])} to ${member.user.username} total now ${experience - parseFloat(args[1])}`)
			  });
		  } catch (err) {
			  DB.ref(`data/server/${msg.guild.id}/users/${member.id}`).set({
					username: `${member.user.username}`,
					id: `${member.id}`,
					xp: parseFloat(args[1])
				})
				msg.channel.send(`set ${parseFloat(args[1])} to ${member.user.username} total now ${parseFloat(args[1])}`)
			}
		}
  },
};