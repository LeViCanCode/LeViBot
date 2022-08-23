module.exports = {
  name: 'massunnick',
  description: 'Nicks entire server',
  Level: 'Dev',
  listed: true,
  async execute(msg, args) {
    function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
    let Members = await msg.guild.members.fetch();
    let memb = Members.array().filter((member) =>
    !member.user.bot && member.bannable
  );

  msg.channel.send(`I've started to unnick everyone. I can unnick \`${memb.length}/${Members.size}\` members in the current guild. There is about an estimate of \`${msToTime(1000 * memb.length)}\` to have the whole server unnicked.`);
    
    let NickNames = new Map();
    for (const member of memb) {
      let {user:mem, nickname:nick, bannable } = member, id = member.id, user = mem.username;
      if (!nick && nick != user) NickNames.set(id, user);
      await member.setNickname(user, `${msg.author.tag} used massnick command`).catch(e => console.log(`Failed to nick: ${mem.tag}`));
      await sleep(1000)
    };
  },
} 