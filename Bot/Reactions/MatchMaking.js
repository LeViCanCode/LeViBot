module.exports = {
	name: 'MatchMaking',
	async execute(reaction, client) {
    let Pass = true;
		switch (reaction._emoji.name) {
			case '🇦':
				await reaction.message.channel.send("you reacted with 🇦!");
        reaction.users.cache.forEach(async User => {
          if (User.id != client.user.id) {
            let Msg = {
              'author': User,
              'channel': reaction.message.channel
            };
            if (client.Cmds.has('find')) client.Cmds.get('find').execute(Msg, [], client)
          }
				})
				break;
			case '🇧':
				await reaction.message.channel.send("you reacted with 🇧!")
				break;
			case '🇨':
        reaction.users.cache.forEach(async User => {
          if (User.id != client.user.id) {
            let Msg = {
              'author': User,
              'channel': reaction.message.channel
            };
            if (client.Cmds.has('unfind')) client.Cmds.get('unfind').execute(Msg, [], client)
          }
				})
				break;
			default:
				Pass = false;
				break;
		}
    return Pass;
  },
};