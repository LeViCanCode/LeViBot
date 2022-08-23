let region = {
	"brazil": ":flag_br: Brazil",
	"eu-central": ":flag_eu: Central Europe",
	"singapore": ":flag_sg: Singapore",
	"us-central": ":flag_us: U.S. Central",
	"sydney": ":flag_au: Sydney",
	"us-east": ":flag_us: U.S. East",
	"us-south": ":flag_us: U.S. South",
	"us-west": ":flag_us: U.S. West",
	"eu-west": ":flag_eu: Western Europe",
	"vip-us-east": ":flag_us: VIP U.S. East",
	"london": ":flag_gb: London",
	"amsterdam": ":flag_nl: Amsterdam",
	"hongkong": ":flag_hk: Hong Kong",
	"russia": ":flag_ru: Russia",
	"southafrica": ":flag_za:  South Africa",
    "newzealand": ":flag_nz:  New Zealand"
};
let checkDays = (date) =>  {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return days + (days == 1 ? " day" : " days") + " ago";
};
module.exports = {
	name: 'server',
	description: 'gives server info',
	Level: 'User',
	listed: true,
	async execute(msg) {
		let invite = await msg.channel.createInvite({
			maxAge: 86400,
			maxUses: 100
		},
			`Requested with command by ${msg.author.tag}`
		).catch(err => {});
		let embed = new Discord.MessageEmbed()
			.setTitle(msg.guild.name)
			.setColor(0x00AE86)
			.addField(`Owner: ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}`, '-\n')
			.addField(`id: ${msg.guild.id}`, '-\n')
			.addField("Total | Humans | Bots", `${msg.guild.members.cache.size} | ${msg.guild.members.cache.filter(member => !member.user.bot).size} | ${msg.guild.members.cache.filter(member =>  member.user.bot).size}`, true)
			.addField("Channels", msg.guild.channels.cache.size, true)
			.addField(`Region: ${region[msg.guild.region]}`, '-\n')
			 .addField("Verification Level",msg.guild.verificationLevel, true)
      .addField("Roles", msg.guild.roles.cache.size, true)
      .addField("Creation Date", `${msg.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(msg.channel.guild.createdAt)})`, true)
      .setThumbnail(msg.guild.iconURL())
			.addField(`Invite: ${invite}`, '-\n')
		msg.channel.send(embed);
	},
};