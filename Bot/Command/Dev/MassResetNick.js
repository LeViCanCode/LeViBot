module.exports = {
	name: 'massrenick',
	description: 'Nicks entire server',
	Level: 'Dev',
	listed: true,
	async execute(msg, args) {
		function msToTime(duration) {
			let milliseconds = parseInt((duration % 1000) / 100),
				seconds = Math.floor((duration / 1000) % 60),
				minutes = Math.floor((duration / (1000 * 60)) % 60),
				hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;

			return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
		}
		let snap = await DB.ref(`nicks/${msg.guild.id}`).once('value');
		if (snap && snap.val()) {
			if (!snap.val().Set) return msg.channel.send('no nicks held');
			let Data = new Map(JSON.parse(snap.val().Names.toString()));
			let members = await msg.guild.members.fetch();
			let memb = members.array().filter((member) =>
				!member.user.bot && member.bannable
			);

			msg.channel.send(`I've started to renick everyone. I can renick \`${memb.length}/${members.size}\` members in the current guild. There is about an estimate of \`${msToTime(1000 * memb.length)}\` to have the whole server renicked.`);

			for (const member of memb) {

				let { user: mem, nickname: nick } = member, user = mem.username;
				let target;
				if (Data.has(member.id)) {
					target = Data.get(member.id);
					await member.setNickname(target, `${msg.author.tag} used massrenick command`).catch(e => console.log(`Failed to renick: ${mem.tag}`));
					await sleep(2000)
				} else {
					target = user;
					await member.setNickname(target, `${msg.author.tag} used massrenick command`).catch(e => console.log(`Failed to renick: ${mem.tag}`));
					await sleep(2000)
				}

			};

			await DB.ref(`nicks/${msg.guild.id}`).set({
				Names: '{}',
				Set: null
			});
		} 
		await msg.channel.send('Server ReNicked!');
	},
}
