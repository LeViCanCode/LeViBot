module.exports = {
	name: 'find',
	description: 'Do $find to queue yourself for a match. When someone else enters the queue, the bot will DM you, and you will be able to talk to the person via the bot. Host an arena and do all the normal matchmaking stuff afterwards.When you want to leave the queue, or finish playing, do $hangup',
	Level: 'User',
	listed: true,
	async execute(msg, args, type, client) {
    let Snap = await DB.ref(`data/find/`).once('value');
    if(Snap.val()) {
      if(Object.values(Snap.val()).some(Elm => {
        return Object.keys(Elm).includes(msg.author.id);
      })) return msg.channel.send(`<@${msg.author.id}> already waiting, please use **-unfind**`);
    }
    let Region = args[0] && (args[0].toLowerCase() == 'na' || args[0].toLowerCase() == 'eu' || args[0].toLowerCase() == 'au') ? args[0].toLowerCase() : 'universal';
		let go = true
		await DB.ref(`data/matched/`).once('value', (data) => {
			if (data.val()) {
				data.val().forEach(f => {
          return f.u1 === msg.author.id || f.u2 === msg.author.id ? false : true;
				})
			}
		})
		if (!go) return msg.channel.send(`<@${msg.author.id}> already talking to someone, please use **$hangup**`);
		DB.ref(`data/find/${Region}/${msg.author.id}`).set({
			id: msg.author.id,
			name: msg.author.username,
		});
		let snap = await DB.ref(`data/find/${Region}`).once('value');
	  let line = [];
		snap.forEach((child) => {
			if (child.val()) line.push(child.val().name);
		});
		msg.channel.send("You have Successfully been added to the queue. If you wish to remove yourself from the queue, type __$unfind__")
		let q = [];
		snap.forEach((child) => {
			if (child.val()) q.push(child.val().id);
		});
		let i = Math.floor(q.length / 2);
		for (let n = 0; n < i * 2; n += 2) {
			let u1 = client.users.cache.get(q[n])
			let u2 = client.users.cache.get(q[n + 1])
			let b = 0
			await DB.ref('data/matched').once('value', async (data) => {
				try {
					b = data.val().length
					await match(u1, u2, b)
				} catch{
					b = 0
					await match(u1, u2, b)
				}
			})
		}
		if (i >= 1) DB.ref(`data/find/${Region}`).remove();
	  async function match(u1, u2, b) {
		  u1.send(`You have succesfully been mathched!\nReply to this DM as if you were DMing the other user directly, the bot will send your messages over. Images, links, and emotes are banned. \nTag: \<@${u2.id}\>\nUsername: \`${client.users.cache.get(u2.id).username}\` \nUser ID:\`${u2.id}\` \n\n__Reporting__ \nIf you felt uncomfortable during the session or your opponent broke the Discord TOS or Smashcord rules, please report the user ID to any Smashcords server staff member, or __$report__ to get it directly to the developers of this bot. \n\n__Wrap-up__ \nOnce done, you may type __$hangup__ in this DM or the server you queued up from. If you have any questions/problems/suggestions please DM the assistant, \`Luigio#9785\``)
		  u2.send(`You have succesfully been mathched!\nReply to this DM as if you were DMing the other user directly, the bot will send your messages over. Images, links, and emotes are banned. \nTag: \<@${u1.id}\>Username: \`${client.users.cache.get(u1.id).username}\` \nUser ID:\`${u1.id}\` \n\n__Reporting__ \nIf you felt uncomfortable during the session or your opponent broke the Discord TOS or Smashcord rules, please report the user ID to any Smashcords server staff member, or __$report__ to get it directly to the developers of this bot. \n\n__Wrap-up__ \nOnce done, you may type __$hangup__ in this DM or the server you queued up from. If you have any questions/problems/suggestions please DM the assistant, \`Luigio#9785\``)
		  DB.ref(`data/matched/${b}`).set({
			  u1: u1.id,
			  u2: u2.id,
		  });
    }
	},
};