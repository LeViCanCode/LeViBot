module.exports = {
  name: 'gunban',
  description: 'Global unban',
  Level: 'Dev',
  listed: true,
  async execute(msg, args, t, client) {
    await client.Cmds.get('gban').helper(msg, args, t, client, false);
  }
}  
