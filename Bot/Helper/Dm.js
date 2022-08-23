module.exports.Dm = async (msg, client) => {
	let go = false, sendU;
	await DB.ref('data/matched').once('value', async (data) => {
		if (data.val() !== null) {
			await data.val().forEach(f => {
				if (f.u1 === msg.author.id || f.u2 === msg.author.id) {
					if (f.u1 === msg.author.id) sendU = f.u2
					else if (f.u2 === msg.author.id) sendU = f.u1
					go = true;
				}
			})
		}
	})
  if (go !== true) return
	if (msg.content.toString().match(/https?:\/\/.+\..+/)) return client.users.cache.get(msg.author.id).send("Please do not post links Due to Security Concerns");
	else return client.users.cache.get(sendU).send(`${msg.author.username}: ${msg.content}`);
}