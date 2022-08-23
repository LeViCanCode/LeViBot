module.exports = {
  name: 'gban',
  description: 'Global banning',
  Level: 'Dev',
  listed: true,
  async helper(msg, args, t, client, ban) {
      const [user, reason, debug] = args, log = [];
      const serversToBanFrom = ['456216320183238666', '456150020593418240', '456485645318225951', '199293903180922880', '331506551661527040', '521816566472376341', '489939754021027841', '280926223834546177', '469106550926082049', '508039146888232970', '507589792343785472', '421442870864510976', '95491064999190528', '94500988664160256', '187964338978553857', '509820123033370666', '187964338978553857', '126456272684843008', '463428790186409984', '106191478119731200', '164518963777241088', '145894811956674560', '284881696392740865', '456665686966796299', '500782972799156234', '702298645776826508', '190221128629878786', '124680198149898242', '108053442605367296', '477174832329654272', '854067570310905946', '619325614184202241', '509820744306262046', '507563481583714314', '468642249543254038', '456227820746833923', '509820942076215307', '126896382689804288', '457407914311680021', '125318974136123392', '243460308046184448', '858494474748690442', '507563481583714314', '130128789719089152']
     if (user == client.user.id || !parseInt(user) || ![17, 18, 19].includes(user.length))
          return msg.channel.send('Invalid ID');
      await Promise.all([...new Set(serversToBanFrom)].map(async (guild) => {
          if (client.guilds.cache.has(guild)) {
              try {
                  if (ban) {
                      if (reason.toString() != 'debug') {
                          await
                          client.guilds.cache.get(guild).members.ban(user, {
                            reason: reason.toString().replaceAll('_', ' ')
                          });
                      }
                      await
                      client.guilds.cache.get(guild).members.ban(user, {
                        reason: 'No reason provided'
                      });
                  } else {
                      if (reason.toString() != 'debug') {
                          await
                          client.guilds.cache.get(guild).members.unban(user, {
                            reason: JSON.stringify(reason.toString().replaceAll('_', ' '))
                          });
                        }
                      else {
                      await
                      client.guilds.cache.get(guild).members.unban(user, {
                          reason: 'No reason provided'
                      });
                    }
                  }
                  log.push({
                      effect: true, // 1 is success, 0 is failure
                      msg: `+ Successfully ${ban ? 'banned' :'unbanned'} member from server ${guild}`
                  });
              } catch (err) {
                  log.push({
                      effect: false, // 1 is success, 0 is failure
                      msg: `- Failed to ${ban ? 'ban' : 'unban'} member from server ${guild}: ${err}`
                  });
              }
          } else {
              log.push({
                  effect: false, // 1 is success, 0 is failure
                  msg: `- Bot is not in server ${guild}`
              });
          }
      }));
      const data = new Discord.MessageEmbed()
          .setColor('#0000ee')
          .setTitle(`Global ${ban ? 'ban' : 'unban'}`)
          .addFields({
              name: 'User ID',
              value: `\`\`\`${user}\`\`\``
          }, {
              name: 'Reason',
              value: `\`\`\`${reason || 'Unkown'}\`\`\``
          }, {
              name: 'Successful Count',
              value: `\`\`\`${log.filter(({ effect }) =>
        effect).length}\`\`\``,
              inline: true
          }, {
              name: 'UnSuccessful Count',
              value: `\`\`\`${log.filter(({ effect }) =>
        !effect).length}\`\`\``,
              inline: true
          })
          .setTimestamp()
          .setFooter(`Requested by ${msg.author.tag}`, await msg.author.avatarURL({
              dynamic: true,
              size: 2048
          }))
      if (debug == 'debug') {
          const logMsg = log.map(({msg}) => msg).join('\n');
          data.addFields({
              name: 'Log',
              value: `\`\`\`diff\n${logMsg.slice(0, 997)}${logMsg.length > 997 ? '...' : ''}\n\`\`\``
          });
      }
      msg.channel.send(data);
  },
  async execute(msg, args, t, client) {
      await this.helper(msg, args, t, client, true)
  }
}