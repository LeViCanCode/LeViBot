module.exports = {
  name: "massgban",
  description: "Mass global ban",
  Level: "Dev",
  listed: true,
  async execute(msg, args, t, client) {
    const serversToBanFrom = [
      "456216320183238666",
      "456150020593418240",
      "456485645318225951",
      "199293903180922880",
      "331506551661527040",
      "521816566472376341",
      "489939754021027841",
      "280926223834546177",
      "469106550926082049",
      "508039146888232970",
      "507589792343785472",
      "421442870864510976",
      "95491064999190528",
      "94500988664160256",
      "187964338978553857",
      "509820123033370666",
      "187964338978553857",
      "126456272684843008",
      "463428790186409984",
      "106191478119731200",
      "164518963777241088",
      "145894811956674560",
      "284881696392740865",
      "456665686966796299",
      "500782972799156234",
      "702298645776826508",
      "190221128629878786",
      "124680198149898242",
      "108053442605367296",
      "477174832329654272",
      "854067570310905946",
      "619325614184202241",
      "509820744306262046",
      "507563481583714314",
      "468642249543254038",
      "456227820746833923",
      "509820942076215307",
      "126896382689804288",
      "457407914311680021",
      "125318974136123392",
      "243460308046184448",
      "858494474748690442",
      "507563481583714314",
      "130128789719089152",
    ];

    let reason = args[0];
    if (isNaN(reason) == false) msg.channel.send("no reason provided");
    let a = args.toString();
    let idArr = [];
    let arr = [...a.matchAll(/[0-9]{17,18}/g)];
    if (arr.length) {
      console.log(arr.length);
      for (let i = 0; i < arr.length; i++) idArr.push(arr[i][0]);
    }
    console.log(idArr);
    for (const id of idArr) {
      await Promise.all(
        [...new Set(serversToBanFrom)].map(async (guild) => {
          if (client.guilds.cache.has(guild)) {
            try {
              await client.guilds.cache.get(guild).members.ban(id, {
                reason: reason.toString().replaceAll("_", " "),
              });
              console.log(`Banning ID: ${id}`)
            } catch (err) {}
          }
        })
      );
    }
    msg.channel.send('Done!')
  },
};
