module.exports = {
  name: 'reload',
  description: 'Reloads All Commands',
Level: 'Dev',
  listed: true,
  async execute(msg, args, t, client) {
  const Cmd_Path = `${process.cwd()}/Bot/Command`;
  const Reaction_Path = `${process.cwd()}/Bot/Reactions`;
  msg.channel.send("Reloading");
  let m = new Discord.MessageEmbed()
      .setColor('#0000ee')
        .setTitle('Reloaded');
  if (args[0]) {
    if (client.Cmds.has(args[0].toLowerCase())) {
      await client.Cmds.get('current').execute(msg, [...args], 'f', client);
      let Path = client.Cmds.get(args[0].toLowerCase()).Path;
      delete require.cache[require.resolve(Path)];
      try {
          let Cmd = require.main.require(Path);
        Cmd.Path = Path;
        if (Cmd.name && Cmd.listed) client.Cmds.set(Cmd.name, Cmd);
      } catch (error) {
        msg.channel.send(`There was An Error Reloading the ${args[0]} Command`);
      }
    }
  } else {
    client.Cmds.array().forEach(Cmd => {
      delete require.cache[require.resolve(Cmd.Path)];
    });
    let Cmd_Folder = FS.readdirSync(Cmd_Path).map((Folder) => {
        if (FS.lstatSync(`${Cmd_Path}/${Folder}`).isDirectory())
            return FS.readdirSync(`${Cmd_Path}/${Folder}`).filter(File => File.endsWith('.js')).map(E => { return `${Folder}/${E}` });
      }).flat().filter(File => File.endsWith('.js'));
    Cmd_Folder.forEach((file) => {
        let Cmd = require.main.require(`${Cmd_Path}/${file}`);
      Cmd.Path = `${Cmd_Path}/${file}`;
        if (Cmd.name && Cmd.listed) client.Cmds.set(Cmd.name, Cmd);
      m.addField(Cmd.name, Cmd.description);
    });
    msg.channel.send(m);
  }
},
};