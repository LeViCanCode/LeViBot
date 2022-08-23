module.exports = {
	name: 'report',
	description: 'report user',
	Level: 'User',
	listed: true,
	async execute(msg, args, type, client) {
		if (!args[0])
			return sendexample(
				"id",
				"Screenshots(upload to sites like imgur etc, OPTIONAL)",
				"reason"
			);
		if (!args[1])
			return sendexample(
				args[0],
				"Screenshots(upload to sites like imgur etc, OPTIONAL)",
				"reason"
			);
		if (!args[2]) return sendexample(args[0], args[1], "(reason)");
		let uid = args[0], fn = args[1], reason = args.slice(2).join(" ");
		report(uid, fn, reason);
		msg.reply("Reported sucessfully!");
		function sendexample(id, fn, reason) {
			return msg.reply(
				`Trying doing it this way: \`$report ${id} ${fn} ${reason}\``
			);
		}
		async function report(id, fn, reason) {
			if (id === "@") {
				return msg.reply("I can't seem to find a user with that id.");
			}
			let reportChannel = client.channels.cache.get('780172660973240340'), nid, t;
			if (id.includes("<@!")) {
				t = await id.replace("<@!", "")
				nid = await t.replace(">", "")
			} else if (id.includes("<@")) {
				t = await id.replace("<@", "")
				nid = await t.replace(">", "")
			}
			else {
				nid = id
				id = `<@!${id}>`
			}
			let reportedUser = client.users.cache.get(nid);
			if (reportedUser === null) {
				return msg.reply("I can't seem to find a user with that id.");
			}
			let rembed = new Discord.MessageEmbed()
				.setTitle("Report")
				.addField("Screenshots(upload to sites like imgur etc):", fn)
				.setColor("#E74C3C")
				.addField("User Reporting:", "‎")
				.addField("Id:", msg.author.id, true)
				.addField("Tag:", `<@${msg.author.id}>`, true)
				.addField("User Being Reported:", "‎")
				.addField("Id:", nid, true)
				.addField("Tag:", id, true)
				.addField("Reason:", reason)
			reportChannel.send(rembed);
		}
	},
};