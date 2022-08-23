module.exports = {
	name: 'purge',
	description: 'deletes messages',
	Level: 'Admin',
	listed: true,
	async execute(msg, args) {
    let deleteCount = (parseInt(args[0], 10) || parseInt(args[0], 10) > 100 ? parseInt(args[0], 10) : 10) + 1;
    let R = deleteCount % 100; 
    let Whole = (deleteCount - R) / 100;
    let Fail = 0;
    let Delete = 0;
    for(let E = 0; E < Whole; E++) {
      if (Fail <= 5) {
        let MSG = await msg.channel.messages.fetch({ 
			  limit: 100
		  });
      MSG = MSG.array().map(E => {
        if (new Date() - new Date(E.createdTimestamp) <= 1209600000 && E.id != msg.id && E.createdTimestamp < msg.createdTimestamp) {
          Delete++
          return E;
        } else Fail++;
      }).filter(N => N)
      await msg.channel.bulkDelete(MSG);
      }
    }
    if (R != 0 && Fail <= 5) {
      let MSG = await msg.channel.messages.fetch({ limit: R});
      MSG = MSG.array().map(E => {
        if (new Date() - new Date(E.createdTimestamp) <= 1209600000 && E.id != msg.id && E.createdTimestamp < msg.createdTimestamp) {
          Delete++
          return E;
        }else Fail++;
      }).filter(N => N)
      await msg.channel.bulkDelete(MSG);
    }
		msg.channel.send(`BulkDeleted ${Delete-1} Messages`);
    if (Fail) msg.channel.send(`Could Not Delete ${deleteCount-Delete} Messages Due To Age`);
	},
};