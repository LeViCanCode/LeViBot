module.exports = {
	name: 'ping',
	description: 'Shows Bot Speed',
  Level: 'User',
	listed: true,
	async execute(msg, args, t, client) {
    let m = await msg.channel.send("Pinging......");
    m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  },
};