module.exports = {
	name: 'unblock',
	description: 'unBlocks a user from the bot',
	Level: 'Dev',
	listed: true,
	async execute(msg, args, type, client, firebase, Discord, config) {
		let argument = args.map((element) => {return element;})
		argument = argument.splice(args.length).join(' ');
    try {
      let member = msg.mentions.members.first().id ?  msg.mentions.members.first().id : args[0];
		  DB.ref(`blist/${member}`).remove();
      msg.channel.send("user unBlocked");
    } catch (e) {
      msg.channel.send("Please Enter an ID to unblock or a mention.")
    }
	},
};