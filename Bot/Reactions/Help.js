module.exports = {
	name: 'Help',
	async execute(reaction, client, CFG) {
    let Pass = true;
    let Page;
		switch (reaction._emoji.name) {
			case '⬅':
        Page = parseInt(reaction.message.embeds[0].footer.text.split(":")[1])-1;
        if (client.Cmds.has('help')) {
          reaction.message.edit({ embed: await client.Cmds.get('help').PG(Page, reaction.message.embeds[0].title.split(":")[1], client, reaction.message.embeds[0].footer.iconURL)}); 
        } else msg.channel.send("There was a server side issue please use the report command to contact the bot maker");
				break;
			case '🔴':
        reaction.users.cache.forEach(async User => {
          if (User.id != client.user.id && (reaction.message.embeds[0].footer.iconURL.split("/").filter(Number)[0] == User.id || CFG.Dev.includes(User.id))) {
            reaction.message.edit(new Discord.MessageEmbed().setTitle("Help Closed By User"));
				    reaction.message.reactions.removeAll();
            Pass = false;
          }
        });
				break;
			case '➡':
				Page = parseInt(reaction.message.embeds[0].footer.text.split(":")[1])+1;
        if (client.Cmds.has('help')) {
          reaction.message.edit({ embed: await client.Cmds.get('help').PG(Page, reaction.message.embeds[0].title.split(":")[1], client, reaction.message.embeds[0].footer.iconURL)}); 
        } else msg.channel.send("There was a server side issue please use the report command to contact the bot maker");
        break;
			default:
				Pass = false;
				break;
		}
    return Pass;
  },
}; 