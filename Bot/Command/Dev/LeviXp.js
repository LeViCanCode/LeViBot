const Mee6LevelsApi = require("mee6-levels-api");
const fs = require('fs');
function sleepFor(sleepDuration){
let now = new Date().getTime();
while(new Date().getTime() < now + sleepDuration) { 
    /* Do nothing */ 
}
}

module.exports = {
name: 'levixp',
description: 'rank testing',
Level: 'Dev',
listed: true,
async execute(msg, args, t, client) {
    let n = 0;
    const guildCount = [...client.guilds.cache.keys()].length;
    console.log(`Starting, Guilds: ${guildCount}.length`);
    // await sleep (10000)
    msg.channel.send(`Starting, Guilds: ${guildCount}`);
    for (const guildID of client.guilds.cache.keys()) {
    n++;
   // let server = await client.guilds.fetch(guildID)
    const allMembers = await client.guilds.fetch(guildID).server.members.fetch()
    let fakeMap = []
    const notBots = allMembers.array().filter((member) => !member.user.bot && member.user.id != client.id);
    let a = notBots
//starting guilds 

    console.log(`Starting Guild: ${guildID}, Users: ${notBots.length}`);
    msg.channel.send(`Starting Guild ${n}: ${guildID}, Users: ${notBots.length}`);


    if (!client.guilds.cache.get(`${guildID}`).members.cache.has('159985870458322944')) continue;
        let user = client.users.cache.get(id)
        for (let i = 0; i > notBots.length; i++) {
            fakeMap.push(user.id) 
            let aIndex = a.indexof(`${user.id}`)
            a.splice(aIndex)
            if (i % 50 == 0 || a.length() <  50 && a.length <= 0 ) {
                await Mee6LevelsApi.getUserXp(guildID, fakeMap);
                fakeMap = []
            }
        }

        //done guilds
            console.log(`Guild: ${n}/${guildCount}, Member: ${i}/${notBots.length}, MemberId: ${User.tag}`);
    console.log(`Done Guild: ${guildID}, Users: ${notBots.length}`);
    msg.channel.send(`Done Guild ${n}: ${guildID}, Users: ${notBots.length}`);


//dsaved guilds
    console.log(`Data Save Guild: ${guildID}, Users: ${notBots.length}`);
    msg.channel.send(`Data Save Guild ${n}: ${guildID}, Users: ${notBots.length}`);
    }
    // fil write
    fs.writeFileSync('data.json', JSON.stringify(allLevels));
},
};