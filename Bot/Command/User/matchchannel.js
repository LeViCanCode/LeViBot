module.exports = {
	name: 'channel',
	description: 'channel',
	Level: 'Admin',
	listed: true,
	async execute(msg, args) {
		let a = args[0], embed = new Discord.MessageEmbed()
			.setTitle("MatchMaking")
			.addField("React with A", "to find/create a match with rotations")
			.addField("React with B", "to find/create a match with no rotations")
			.addField("React with C", "to remove yourself from the queue")
			.setColor('#7289DA')
    if (msg.guild.channels.cache.get(a)) {
      msg.guild.channels.cache.get(a).send(embed).then((async msg => {
			  await msg.react('🇦')
			  await msg.react('🇧')
			  await msg.react('🇨')
		  }));
      msg.channel.send("sent successfully!")
    } else msg.channel.send("Channel Does Not Exist")
	},
};