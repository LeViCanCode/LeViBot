module.exports = {
	name: 'avatar',
	description: 'shows someones avatar',
  Level: 'User',
	listed: true,
	async execute(msg, args, t, client) {
    let user = args[0] ? msg.mentions.users.first() || client.users.cache.get(args[0]) :  msg.author;
    let embed = new Discord.MessageEmbed()
      .setImage(await user.avatarURL({
        dynamic: true,
        size: 2048
      }))
      .setColor('#7289DA')
      .setTimestamp()
      .setFooter("Requested by " + msg.author.tag, await msg.author.avatarURL({
        dynamic: true,
        size: 2048
      }))
    msg.channel.send(embed);
  },
};