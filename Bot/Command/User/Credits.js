module.exports = {
	name: 'credits',
	description: 'Crediting creators and helpers!',
  Level: 'User',
	listed: true,
	async execute(msg) {
    let embed = new Discord.MessageEmbed()
      .setTitle("Thanks to all these people for their contribution!")
      .addField("Luigio#9785", "Helped with spreading the bot's usage")
      .addField("spotandjake#1510", "For helping throughout most of the bot's development process!")
      .addField("Max Thakur#0831", "For helping with the logic for matchmaking, and more!")
      .addField("LeVi#8107", "For creating me, and making all of my commands!")
      .addField(msg.author.tag, "For Being Part of the community who makes my work important!")
      .setColor('#7289DA')
    msg.channel.send(embed);
  },
};