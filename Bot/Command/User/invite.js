module.exports = {
    name: 'invite',
    description: 'invite',
    Level: 'User',
    listed: true,
    async execute(msg) {
        let invite = await msg.channel.createInvite({
            maxAge: 86400,
            maxUses: 1
        });
        if (msg.guild.id === '311207928503861248') msg.channel.send(`${invite}`)
    },
}