module.exports = {
	name: 'massnick',
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
		if (args.join('').length > 32) return msg.reply('It\'s longer than 32 chars I can\'t do that loser.')

		const allMembers = await msg.guild.members.fetch()
		const members = allMembers.array().filter((member) =>
			!member.user.bot && member.bannable && member.nickname !== args.join('') && member.user.username !== args.join('')
		)
		await msg.channel.send(`I've started to name everyone to \`${args.join('')}\`. I can nick \`${members.length}/${allMembers.size}\` members in the current guild. There is about an estimate of \`${msToTime(1000 * members.length)}\` to have the whole server nicked.`)

		const nicknames = new Map()
		for (const member of members) {
			const { id, nickname, user: { username } } = member
			nicknames.set(id, nickname !== username && nickname ? nickname : null)

			try {
				await member.setNickname(args.join(' '), `${msg.author.tag} used massnick command`)
			} catch {
				console.log(`Failed to nick: ${member.user.tag}`)
			}
			await sleep(2000)
		}
		let nicknamesArray = [...nicknames]

		const snap = await DB.ref(`nicks/${msg.guild.id}`).once('value')
		if (snap && snap.val()) {
			const expectedValue = snap.val().Set // Idk what to name this lol
			nicknamesArray = nicknamesArray.filter(([, value]) => value != expectedValue)
		}

		// Personally hate the PascalCase key names but whatever
		await DB.ref(`nicks/${msg.guild.id}`).set({
			Names: JSON.stringify(nicknamesArray),
			Set: args.join('')
		})
		await msg.channel.send('Server nicked!')
	}
}
