module.exports = {
	name: 'block',
	description: 'Blocks a user from the bot',
	Level: 'Dev',
	listed: true,
	async execute(msg, args, t, client) {
		let argument = args.map((element) => {return element;})
		argument = argument.splice(args.length).join(' ');
    let member = msg.mentions.members.first().id ?  msg.mentions.members.first().id : args[0];
    if (CFG.Dev.includes(member)) {
      msg.channel.send("You Cannot Block Devs");
	  
    } else {
      DB.ref(`blist/${member}`).set({
			  blocked_id: member,
			  blocker: msg.author.id,
			  blocker_name: msg.author.username
		  });
		  DB.ref(`data/find/${member}`).once('value', (data) => {
			  if (data.val())
			  	DB.ref(`data/find/${member}`).remove();
		  });
		  await DB.ref('data/matched').once('value', (data) => {
			  if (data.val() !== null) {
				  for (i = 0; i <= data.val().length; i++) {
					  if (data.val()[i] !== undefined) {
						  if (data.val()[i].u1 === msg.author.id) {	
							  client.users.cache.get(data.val()[i].u2).send(` <@${data.val()[i].u1}> Has been blocked from Bot Sorry for any inconvience.`)
							  DB.ref(`data/matched/${i}`).remove()
						  } else if (data.val()[i].u2 === msg.author.id) {
							  client.users.cache.get(data.val()[i].u1).send(` <@${data.val()[i].u2}> Has been blocked from Bot Sorry for any inconvience.`)
							  DB.ref(`data/matched/${i}`).remove()
						  }
					  }
				  }
			  }
		  })
		  msg.channel.send("User Blocked");
    }
	},
};