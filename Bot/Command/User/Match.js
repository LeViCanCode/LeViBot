let a, fn = (role, msg) => {
	role.setMentionable(true).then(() => { if (msg.member.roles.cache.has('456152721205100544')) { a = '(Luigi main)' } else { if (msg.member.roles.cache.has('456152747935399937')) { a = '(Luigi secondary)' } else { if (msg.member.roles.cache.has('456152753161633802')) { a = `(Doesn't play Luigi)` } else { a = '_ _' } } } }).then(() => msg.channel.send(role.toString() + ' requested by ' + msg.author.username + " " + a)).then(() => role.setMentionable(false));
  }
  module.exports = {
	name: 'match',
	description: 'Matchmaking',
	Level: 'User',
	listed: true,
	async execute(msg, args) {
	  let role;
	  if (args[0]) {
		switch (args[0].toLowerCase()) {
		  case 'au':
			role = msg.guild.roles.cache.get('698768608838418504');
			fn(role, msg);
			break;
		  case 'na':
			role = msg.guild.roles.cache.get('698768537216614421');
			fn(role, msg);
			break;
		  case 'eu':
			role = msg.guild.roles.cache.get('698768665847267338');
			fn(role, msg);
			break;
		  case 'jmu':
			role = msg.guild.roles.cache.get('653309320498511925');
			fn(role, msg);
			break;
		  default:
			msg.reply('Please do $match na/eu/au or $friendlies na/eu/au');
		}
	  } else msg.reply('Please do $match na/eu/au or $friendlies na/eu/au');
	}
  }