module.exports = {
	name: 'type',
	description: 'changes server type',
	Level: 'Dev',
	listed: true,
	async execute(msg, args) {
		let LeaderBoard = [], Prefix = CFG.prefix;
		let snap = await DB.ref(`data/server/${msg.guild.id}/`).once('value');
		if (snap.val()) {
      Prefix = snap.val().prefix ? snap.val().prefix : CFG.prefix;
      LeaderBoard = snap.val().users ? snap.val().users : [];
		}
    DB.ref(`data/server/${msg.guild.id}`).set({ name: msg.guild.name, type: args[0], prefix: Prefix, users: LeaderBoard });
		msg.channel.send("Type changed");
	},
};