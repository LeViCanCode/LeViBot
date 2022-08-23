//change command $change name header_header img arg
module.exports = {
	name: 'change',
	description: 'adds a commands or changes it',
	Level: 'Admin',
	listed: true,
	async execute(msg, args, type) {
		let argument = args.map((element) => {return element;})
		argument = argument.splice(3, args.length).join(' ');
		if (!args[0]) {
			msg.channel.send("Command write failed please enter paramaters");
			if (args[0].indexOf('.', ',') > -1) 
				msg.channel.send("Please do not include , or .")
		} else {
			let header = args[1].split("_").join(" ");
			DB.ref(`types/${type}`).child(args[0]).set({ 
				title: header, 
				image: String(args[2]), 
				reply: argument 
			});
			msg.channel.send("Command Changed/Added");
		}
  }
}