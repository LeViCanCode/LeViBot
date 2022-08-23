const Commands_Per_Pg = 10;
module.exports = {
	name: 'help',
	description: 'Help Command',
	Level: 'User',
	listed: true,
	async execute(msg, args, type, client) {
	  let names = [], description, user;
    let [Cmd_Names, Cmd_Descs, Cmd_Levels] = [[], [], []]
    client.Cmds.forEach(command => {
			if (command.listed) {
        Cmd_Names.push(command.name);
        Cmd_Descs.push(command.description);
        Cmd_Levels.push(command.use);
      };
		});
		let snapshot = await DB.ref(`types/${type}`).once('value');
		if (snapshot.val() != null) {
      names.push("---------");
			names.push(Object.keys(snapshot.val()));
			description = names.map((element) => {
        return element.description ? element.description : 'undefined';
			});
			user = names.map((element) => {return 'user';})
		}
		if (args[0] && Cmd_Names.includes(args[0])) {
			const Embed = {
				color: 3092790,
				title: `Help:${type}`,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL(),
				}, thumbnail: {
					url: client.user.avatarURL(),
				}, fields: [
					{
						name: `Commands:`,
						value: args[0],
						inline: true,
					},
					{
						name: `Description:`,
						value: description.concat(Cmd_Descs)[names.concat(Cmd_Names).indexOf(args[0])],
						inline: true,
					},
					{
						name: `Rank:`,
						value: user.concat(Cmd_Levels)[names.concat(Cmd_Names).indexOf(args[0])],
						inline: true,
					}
				],
				timestamp: new Date(),
				footer: {
					text: 'Made by LeVi#8107',
					icon_url: msg.author.avatarURL(),
				},
			};
			msg.channel.send({ embed: Embed });
			names = []
		} else if (parseInt(args[0])) {
			names.push("---------");
      if (Cmd_Names.concat(names).slice(Commands_Per_Pg*(parseInt(args[0])-1), Commands_Per_Pg*parseInt(args[0])).join('\n').length <= 0) args[0] = args[0]-1;
      if (parseInt(args[0]) <= 0) args[0] = 1;
			names = Cmd_Names.concat(names).slice(Commands_Per_Pg*(parseInt(args[0])-1), Commands_Per_Pg*parseInt(args[0])).join('\n');
			const Embed = {
				color: 3092790,
				title: `Help:${type}`,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL(),
				}, thumbnail: {
					url: client.user.avatarURL(),
				}, fields: [
					{
						name: `Commands:`,
						value: names,
						inline: true,
					}
				],
				timestamp: new Date(),
				footer: {
					text: `PG: ${parseInt(args[0])}`,
					icon_url: msg.author.avatarURL(),
				},
			};
			let Help_Reply = await msg.channel.send({ embed: Embed });
      await Help_Reply.react('⬅');
      await Help_Reply.react('🔴');
      await Help_Reply.react('➡');
		} else {
      names.push("---------");
			names = Cmd_Names.concat(names).slice(0, Commands_Per_Pg).join('\n');
			const Embed = {
				color: 3092790,
				title: `Help:${type}`,
				author: {
					name: client.user.username,
					icon_url: client.user.avatarURL(),
				}, thumbnail: {
					url: client.user.avatarURL(),
				}, fields: [
					{
						name: `Commands:`,
						value: names,
						inline: true,
					}
				],
				timestamp: new Date(),
				footer: {
					text: 'PG: 1',
					icon_url: msg.author.avatarURL(),
				},
			};
			let Help_Reply = await msg.channel.send({ embed: Embed });
      await Help_Reply.react('⬅');
      await Help_Reply.react('🔴');
      await Help_Reply.react('➡');
    }
	},
  async PG(PG, Type, client, Foot_Pic) {
    let names = [], description, user;
    let [Cmd_Names, Cmd_Descs, Cmd_Levels] = [[], [], []]
    client.Cmds.forEach(command => {
			if (command.listed) {
        Cmd_Names.push(command.name);
        Cmd_Descs.push(command.description);
        Cmd_Levels.push(command.use);
      };
		});
		let snapshot = await DB.ref(`types/${Type}`).once('value');
		if (snapshot.val() != null) {
			names.push("---------");
			names.push(Object.keys(snapshot.val()));
			description = names.map(element => {
        return element.description ? element.description : 'undefined';
			});
			user = names.map(element => {return 'user';})
		};
    if (PG == 0) PG = Math.ceil(Cmd_Names.concat(names).length / Commands_Per_Pg);
    if (Cmd_Names.concat(names).slice(Commands_Per_Pg*(PG-1), Commands_Per_Pg*PG).length == 0) PG = 1;
		names = Cmd_Names.concat(names).slice(Commands_Per_Pg*(PG-1), Commands_Per_Pg*PG).join('\n');
		return {
			color: 3092790,
			title: `Help:${Type}`,
			author: {
				name: client.user.username,
				icon_url:client.user.avatarURL(),
			}, thumbnail: {
				url: client.user.avatarURL(),
			}, fields: [
			  {
				  name: `Commands:`,
				  value: names,
					inline: true,
				}
			],
			timestamp: new Date(),
			footer: {
				text: `PG: ${PG}`,
				icon_url: Foot_Pic,
			},
		};
  },
};