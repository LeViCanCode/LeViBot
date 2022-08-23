module.exports = {
	name: 'clear',
	description: 'Deletes messages older than 14 days',
	Level: 'Admin',
	listed: true,
	async execute(msg, args) {
    let deleteCount = (parseInt(args[0], 10) || parseInt(args[0], 10) > 100 ? parseInt(args[0], 10) : 10) + 1, R = deleteCount % 100, Whole = (deleteCount - R) / 100, Fail = 0;
    for(let E = 0; E < Whole; E++) {
      if (Fail <= 5) {
        let MSG = await msg.channel.messages.fetch({ limit: 100});
        MSG = MSG.array().filter(N => N)
        await MSG.forEach((message) => {
          try {
            message.delete(); 
          } catch (e) {}
			  })
      }
    }
    if (R != 0 && Fail <= 5) {
      let MSG = await msg.channel.messages.fetch({ limit: R});
      MSG = MSG.array().filter(N => N)
      await MSG.forEach((message) => {
        try {
          message.delete(); 
        } catch (e) {}
			})
    }
		msg.channel.send(`BulkDeleted ${deleteCount-1} Messages`);
	},
};