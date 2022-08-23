module.exports = {
	name: 'ksweep',
	description: 'KFC sweep',
	Level: 'Admin',
	listed: true,
	async execute(msg) {
		const allMembers = await msg.guild.members.fetch()
		const members = allMembers.array().filter((member) =>
			!member.user.bot && member.bannable && member.user.tag.toLowerCase().includes(`KFC✔`)
		)
		await msg.channel.send(`KFC ALTS`)
      
        msg.channel.send(members)
		for (const member of members) {
          
           member.ban({
               reason: 'Possible KFC alt',
           })
		 }
		await msg.channel.send('all are banned')
	 }
}