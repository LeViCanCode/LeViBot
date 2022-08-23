const beautify = require('js-beautify').js;
const Diff = require('diff');

module.exports = {
    name: 'current',
    description: 'Gives current version of code',
  Level: 'Dev',
    listed: true,
    async execute(msg, args, t, client) {
    if (!args[0]) return msg.channel.send('Pls give us a command');
    if (client.Cmds.has(args[0].toLowerCase())) {
      let cmd = client.Cmds.get(args[0]);
      let code = beautify(
        cmd.execute.toString(), 
        {
          indent_size: 2,
          space_in_empty_paren: true
        }
      ); 
      const data = new Discord.MessageEmbed()
        .setColor('#0000ee')
          .setTitle(cmd.name)
        .addFields(
          { 
            name: 'Name', 
            value: `\`\`\`${cmd.name}\`\`\``
          },
          { 
            name: 'Description', 
            value: `\`\`\`${cmd.description}\`\`\`` 
          },
          { 
            name: 'Level', 
            value: `\`\`\`${cmd.Level}\`\`\``, 
            inline: true 
          },
          { 
            name: 'Listed', 
            value: `**${cmd.listed}**`, 
            inline: true 
          },
          { 
            name: 'Path', 
            value: `\`\`\`sh\n${cmd.Path}\`\`\``
          },
        )
                .setTimestamp()
                .setFooter("Requested by " + msg.author.tag, await msg.author.avatarURL({
        dynamic: true,
        size: 2048
      }))

      // Find differences
      const Cmd_Path = `${process.cwd()}/Bot/Command`;
      let Path = client.Cmds.get(args[0].toLowerCase()).Path;
      delete require.cache[require.resolve(Path)];
      let old;
      try {
        let Cmd = require.main.require(Path);
        old = beautify(
          Cmd.execute.toString(), 
          {
            indent_size: 1,
            space_in_empty_paren: true
          }
        ); 
      } catch (error) {}
      if (old) {
        let differrences = Diff.diffLines(code, old);
        differrences.forEach((part) => {
          const change = part.added ? 'added' :
            part.removed ? 'removed' : 'same';
          let c = part.value;
          for(let i=0; i < c.length+999; i+=1000) {
            // handle spliting for new line
            let analysis = c.slice(900, 1000);
            if (analysis.includes('\n')) {
              i -= analysis.lastIndexOf('\n');
              data.addField(change, `\`\`\`js\n${c.slice(0, 1000 - analysis.lastIndexOf('\n'))}\n\`\`\``, false);
              c = c.slice(1000 - analysis.lastIndexOf('\n'));
            } else {
              data.addField(change, `\`\`\`js\n${c.slice(0, 1000)}\n\`\`\``, false);
              c = c.slice(1000);
            }
          }
        });
      }
      msg.channel.send(data);
    } else {
      console.log('command not found');
    }
  },
};