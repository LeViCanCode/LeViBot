const canvacord = require("canvacord");
module.exports = {
	name: 'rank',
	description: 'rank testing',
	Level: 'Dev',
	listed: true,
	async execute(msg, args, client) {
		const img = await msg.author.avatarURL({
            format: 'png'
        })
        const fonts = [
            {
                path: "/home/Leviathan2/Lato-Light.ttf",
                face: {
                    family: "Lato",
                    weight: 300,
                    style: "Light"
                }
            }
        ];
		let a = 50
		let b = 1000
        let tag = msg.author.tag.split('#')
		const rank = new canvacord.Rank()
			/* .setLevel(data, 'LEVEL') */
            .registerFonts(fonts.path, fonts.face)
            .setBackground('IMAGE', "https://cdn.discordapp.com/attachments/674028526013251584/929358354319548467/snow.png")
            .setRank(1, 'Rank:')
            .setLevel(1, 'Level:')
			.setAvatar(img)
			.setCurrentXP(a)
			.setRequiredXP(b)
			.setStatus('dnd', true, 0)
			.setProgressBar('#FFFFFF', 'COLOR')
			.setUsername(tag[0])
			.setDiscriminator(tag[1], '#FFFFFF');
            

		rank.build(fonts.path, fonts.face)
			.then(data => {
				const attachment = new Discord.MessageAttachment(data, "RankCard.png");
				msg.channel.send(attachment);
			});
	},
};