const unidecode = require('unidecode');
module.exports = {
	name: 'sweep',
	description: 'h0nda/h0nde sweep',
	Level: 'Admin',
	listed: true,
	async execute(msg) {
		const allMembers = await msg.guild.members.fetch()
		const members = allMembers.array().filter((member) =>
			!member.user.bot && member.bannable && (member.user.tag.toLowerCase().includes(`twitter.com/`) || member.user.tag.toLowerCase().includes(`h0nde`) || member.user.tag.toLowerCase().includes(`h0nda`) || unidecode(member.user.tag).toLowerCase().includes(`h0nda`) || unidecode(member.user.tag).toLowerCase().includes(`h0nde`) || unidecode(member.user.tag).toLowerCase().includes(`twitter.com/`))
		)
		await msg.channel.send(`I've started to ban h0nda/h0nde's`)
        msg.channel.send(members)
		for (const member of members) {
          
           member.ban({
               reason: 'h0nda alt',
           })
		 }
		await msg.channel.send('all are banned')
	}
}