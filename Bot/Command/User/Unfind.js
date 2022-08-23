module.exports = {
	name: 'unfind',
	description: 'Do $find to queue yourself for a match. When someone else enters the queue, the bot will DM you, and you will be able to talk to the person via the bot. Host an arena and do all the normal matchmaking stuff afterwards.When you want to leave the queue, or finish playing, do $hangup',
	Level: 'User',
	listed: true,
	async execute(msg) {
    let Snap = await DB.ref(`data/find/`).once('value');
    if(Snap.val()) {
      Object.keys(Snap.val()).forEach(Elm => {
        DB.ref(`data/find/${Elm}/${msg.author.id}`).remove();
      });
    } 
    msg.channel.send("You have been removed from the queue");
	},
};