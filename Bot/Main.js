//Helpers
require("./Helper/Globals.js");
require("./Helper/Firebase.js");
let config = require('./config.json')
const unidecode = require('unidecode');
//Varibles
const Cmd_Path = `${process.cwd()}/Bot/Command`;
const Reaction_Path = `${process.cwd()}/Bot/Reactions`;
//Client
const client = new Discord.Client(({ ws: { properties: { $browser: "Discord iOS" }} }));
client.Cmds = new Discord.Collection();
client.Cmd_Reactions = new Discord.Collection();
//Commands
let Cmd_Folder = FS.readdirSync(Cmd_Path).map((Folder) => {
  if (FS.lstatSync(`${Cmd_Path}/${Folder}`).isDirectory())
    return FS.readdirSync(`${Cmd_Path}/${Folder}`).filter(File => File.endsWith('.js')).map(E => { return `${Folder}/${E}` });
}).flat().filter(File => File.endsWith('.js'));
Cmd_Folder.forEach((file) => {
  let Cmd = require(`${Cmd_Path}/${file}`);
  Cmd.Path = `${Cmd_Path}/${file}`;
  if (Cmd.name && Cmd.listed) client.Cmds.set(Cmd.name, Cmd);
});
// reactions
let Cmd_Reactions_Folder = FS.readdirSync(Reaction_Path).map((Folder) => {
  if (FS.lstatSync(`${Reaction_Path}/${Folder}`).isDirectory())
    return FS.readdirSync(`${Reaction_Path}/${Folder}`).filter(File => File.endsWith('.js')).map(E => { return `${Folder}/${E}` });
  else
    return FS.readdirSync(`${Reaction_Path}/`).filter(File => File.endsWith('.js')).map(E => { return `${E}` });
}).flat().filter(File => File.endsWith('.js'));
Cmd_Reactions_Folder.forEach((file) => {
  let Cmd_Reaction = require(`${Reaction_Path}/${file}`);
  if (Cmd_Reaction.name) client.Cmd_Reactions.set(Cmd_Reaction.name, Cmd_Reaction);
});
client.on('ready', async () => {
  Log(`${client.user.username} | startup`)
  client.user.setActivity(`@${client.user.username} prefix`);

	// job.start();

  client.guilds.cache.forEach(async element => {
    let snap = await DB.ref(`data/server/${element.id}/Join_Role`).once('value');
    if (snap && snap.val()) {
      let Time = snap.val().Time;
      let Role = element.roles.cache.find(n => n.id == snap.val().Role);;
      if (Role) {
        element.members.cache.forEach(member => {
          if (Time == null) member.roles.add(Role);
          else {
            let Time_Join = member.joinedAt ? new Date().getTime() - member.joinedAt.getTime() - Time : 0;
            if (Time_Join < 0) {
              member.roles.add(Role.id);
              setTimeout(() => {
                if (member.roles.cache.has(Role.id))
                  member.roles.remove(Role);
              }, Time_Join * -1);
            } else member.roles.remove(Role);
          }
        });
      }
    }
		let used = process.memoryUsage().rss / 1024 / 1024;
		console.log(Math.round(used * 100) / 100)
  });
  client.guilds.cache.forEach(async element => {
    let muterole = element.roles.cache.find(name => name.name === "Mute");
    let snapshot = await DB.ref(`data/server/${element.id}/mute/`).once('value');
    snapshot.forEach(child => {
      if (child.val()) {
        let diff = child.val().time - (Date.now() - child.val().start);
        if (diff >= 100) {
          setTimeout(async (arg) => {
            client.guilds.cache.get(element.id).member.fetch(child.val().id).then(Member => {
              Member.roles.remove(muterole.id).catch(logger.error);
              child.val().roles.cache.forEach((element) => {
                Member.roles.add(element);
              })
              DB.ref(`data/server/${element.id}/mute/${Member.id}`).remove();
            });
          }, diff);
        } else {
          client.guilds.cache.get(element.id).members.fetch(child.val().id).then(Member => {
            Member.roles.remove(muterole.id).catch(logger.error);
            child.val().role.forEach((element) => {
              Member.roles.add(element);
            })
            DB.ref(`data/server/${element.id}/mute/${Member.id}`).remove();
          });
        }
      }
    });
  });
});
client.on("guildCreate", async (E) => {
  DB.ref(`data/server/${E.guild.id}`).update({
    name: E.guild.name,
    type: "default",
    prefix: CFG.prefix
  });
});
client.on('messageReactionAdd', async (reaction, user) => {
  if (reaction.partial) {
    console.log(reaction);
    try {
      await reaction.fetch();
    } catch (E) { return; }
  }
  if (reaction.message.author.id == client.user.id && reaction.count >= 2 && reaction.users.cache.has(client.user.id) && client.Cmd_Reactions.has(reaction.message.embeds[0].title.split(":")[0])) {
    let Pass = await client.Cmd_Reactions.get(reaction.message.embeds[0].title.split(":")[0]).execute(reaction, client, CFG);
    reaction.users.cache.forEach((User) => {
      if (User != client.user.id && Pass) reaction.users.remove(User);
    })
  }
});
// && tag.toLowerCase.includes(`twitter.com/`
client.on("guildMemberAdd", async (GuildMember) => {
let id = GuildMember.user.id, tag = GuildMember.user.tag, time = Date.now() - GuildMember.user.createdAt 
if (tag.toLowerCase().includes('twitter.com/') || tag.toLowerCase().includes('h0nde') || tag.toLowerCase().includes('h0nda') || unidecode(tag).toLowerCase().includes('twitter.com/') || unidecode(tag).toLowerCase().includes('h0nde') || unidecode(tag).toLowerCase().includes('h0nda')){
 GuildMember.ban({
    reason: 'h0nda alt'
  })
}
if (tag.toLowerCase().startsWith('clonex') && tag.toLowerCase().includes('1')) {
  GuildMember.ban({
     reason: 'CloneX Bot'
   })
 }
 if (tag.toLowerCase().startsWith('rtfkt') && tag.toLowerCase().includes('sale')) {
  GuildMember.ban({
     reason: 'RTFKT Sale Bot'
   })
 }
if (tag.toLowerCase().includes('KFC✔')){
  GuildMember.ban({
     reason: 'KFC alt'
   })
 }
if (time - 604800000 <= 0) {
	if (GuildMember.guild.id == "456150020593418240"){
	GuildMember.guild.channels.cache.get("803793989618237510").send(`new user, User id: ${id}, user tag: ${tag}, account creation date: ${GuildMember.user.createdAt}`)}
	else if (GuildMember.guild.id == "421449065704980480"){
	GuildMember.guild.channels.cache.get("421456773137039360").send(`new user, User id: ${id}, user tag: ${tag}, account creation date: ${GuildMember.user.createdAt}`)}
	else if (GuildMember.guild.id == "804047968264781854"){
	GuildMember.guild.channels.cache.get("804434844138209301").send(`<@320197542568656898> new user, User id: ${id}, user tag: ${tag}, account creation date: ${GuildMember.user.createdAt}`)}
}
});
client.on('message', async (msg) => {
  if (!msg.author.bot) {
    if (msg.channel.type === "dm") {
      if (msg.content.startsWith(CFG.prefix)) {
        let args = msg.content.slice(CFG.prefix.length).split(' '), command = args.shift().toLowerCase();
        if (client.Cmds.has(command) && client.Cmds.get(command).listed && client.Cmds.get(command).Level == 'User') {
          try {
            client.Cmds.get(command).execute(msg, args, 'default', client);
          } catch (err) { };
        }
      } else Dm(msg, client);
      return;
    }
    let Snap = await DB.ref(`data/server/${msg.guild.id}`).once('value');
    let prefix = Snap.val() && Snap.val().prefix != null ? Snap.val().prefix : CFG.prefix;
    if (msg.channel.id == "456155646019108866" && msg.content.includes("<@&653309320498511925>")) {
      msg.channel.send('please use $match na instead :) ')
    }
    if (msg.content.startsWith(`<@!${client.user.id}>`)) return msg.reply(`Prefix is ${prefix}`);
    if (!msg.content.startsWith(prefix)) return;
    if (await BlockList(msg))
      return msg.channel.send("You are not allowed to use the bot speak to LeVi#8107 For Help if you feel a block was placed under incorrect circumstances");
    Log(`${msg.author.id}, ${msg.author.username} | ${msg.content}`);
    let args = msg.content.slice(prefix.length).split(' '),
      command = args.shift().toLowerCase(),
      type = Snap.val() && Snap.val().type ? Snap.val().type : 'default';
    let LVL = CFG.Admin.some(Elm => msg.member.roles.cache.has(Elm)) || msg.member.hasPermission('MANAGE_CHANNELS') ? 1 : 0;
    LVL = CFG.Dev.includes(msg.author.id) ? 2 : LVL;
    if (client.Cmds.has(command) && client.Cmds.get(command).listed) {
      let Permit;
      switch (client.Cmds.get(command).Level) {
        case 'Dev':
          Permit = 2;
          break;
        case 'Admin':
          Permit = 1;
          break;
        case 'User':
          Permit = 0;
          break;
        default:
          Permit = 0;
          break;
      }
      if (client.Cmds.get(command).Guild && client.Cmds.get(command).Guild.length != 0 && !client.Cmds.get(command).Guild.includes(msg.channel.id)) Permit = 3;
      if (LVL >= Permit) {
        client.Cmds.get(command).execute(msg, args, type, client);
        Requests();
      }
      else msg.channel.send('You are Not Permited To Use This Command');
    } else if (!command.match(/[.#$\[\]]/)){
      let Snap = await DB.ref(`types/${type}/${command}`).once('value');
      if (Snap.val()) {
        Requests();
        let header = Snap.val().title ? Snap.val().title : null;
        let reply = Snap.val().reply ? Snap.val().reply : null;
        let description = Snap.val().description ? Snap.val().description : null;
        URL_Exist(Snap.val().image, (err, E) => {
          let embed = new Discord.MessageEmbed().setColor('#2F3136').setTitle(header).setDescription(reply);
          if (E) embed.setImage(Snap.val().image);
          msg.channel.send(embed);
        });
      }
    }
  }
});
client.login(config.token)
