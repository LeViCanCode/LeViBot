module.exports = {
	name: 'lb',
	description: 'shows the leaderboard',
  Level: 'User',
	listed: true,
	async execute(msg) {
		DB.ref(`data/server/${msg.guild.id}/users/`).once('value').then(Snap => {
      let board = [], points = [], list = [];
			if (Snap) {
				Snap.forEach((data) => {
					list.push({
						name: `${data.val().username}:`,
						xp: data.val().xp
					})
				});
				list.sort(function(a, b) {
    			return ((a.xp < b.xp) ? -1 : ((a.xp == b.xp) ? 0 : 1));
				});
				if (list.length == 0) {
					list.push({
						name: "-----------",
						xp: "---------"
					})
				}
				list.reverse().forEach((element) => {
					board.push(element.name);
					points.push(`${element.xp}`);
				})
			} else {
				board.push('empty');
				points.push('empty');
			}
			board = board.join("\n");
			points = points.join("\n");
			const Embed = {
				color: 3092790,
				title: `Leaderboard`,
				author: {
					name: 'LuigiMUBot',
					icon_url: 'http://www.simpleimageresizer.com/_uploads/photos/4cfa8fc8/unknown_1_128x128.png',
				}, thumbnail: {
					url: 'http://www.simpleimageresizer.com/_uploads/photos/4cfa8fc8/unknown_1_128x128.png',
				}, fields: [
					{
						name: `Users:`,
						value: board,
						inline: true,
					},
					{
						name: `Points:`,
						value: points,
						inline: true,
					}
				],
				timestamp: new Date(),
				footer: {
					text: 'Made by LeVi#8107',
					icon_url: 'https://cdn.discordapp.com/avatars/191540302631141376/1c39cbb348bfca4b82968b12c24eb00c.webp?size=128',
				},
			};
			msg.channel.send({ embed: Embed });
		});
  },
};