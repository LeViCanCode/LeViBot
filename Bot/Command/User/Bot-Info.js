module.exports = {
	name: 'bot',
	description: 'shows bot info',
  Level: 'User',
	listed: true,
	async execute(msg, args, t, client) {
    let Guild_Count;
    if (client.shard) {
      client.shard.fetchClientValues('guilds.cache.size').then(results => {
        Guild_Count= results.reduce((acc, guildCount) => acc+guildCount, 0);
        let invite = 'https://discord.gg/hGJHNqD', embed = new Discord.MessageEmbed()
			    .setTitle(client.user.username)
			    .setColor(0x00AE86)
			    .addField(`${Emoji['computer']}  uptime: ${client.uptime}ms`, '-\n')
			    .addField(`servers: ${Guild_Count}`, '-\n')
			    .addField(`bot help invite: ${invite}`, '-\n')
		    msg.channel.send(embed);
	   }).catch(console.error)
    } else {
      Guild_Count= client.guilds.cache.size;
      let invite = 'https://discord.gg/hGJHNqD', embed = new Discord.MessageEmbed()
			  .setTitle(client.user.username)
			  .setColor(0x00AE86)
			  .addField(`${Emoji['computer']}  uptime: ${client.uptime}ms`, '-\n')
			  .addField(`servers: ${Guild_Count}`, '-\n')
			  .addField(`bot help invite: ${invite}`, '-\n')
		   msg.channel.send(embed);
    }
    
  },
};