module.exports = {
	name: 'prefix',
	description: 'changes server prefix',
  Level: 'Admin',
	listed: true,
	async execute(msg, args, type) {
    let LeaderBoard;
    let Snap = await DB.ref (`data/server/${msg.guild.id}/`).once('value');
    LeaderBoard = Snap.val() && Snap.val().users ? Snap.val().users : [];
    DB.ref(`data/server/${msg.guild.id}`).set({
      name: msg.guild.name, 
      type: type,
      prefix: args[0],
      users: LeaderBoard
    });
		msg.channel.send(`Changed prefix to ${args[0]}`)
  },
};