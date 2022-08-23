//Modules
global.Discord = require('discord.js');
global.FS = require('fs');
global.Util = require("util");
global.Firebase = require('firebase');
global.Request = require('request');
//Functions
global.ReadFile = Util.promisify(FS.readFile);
//Helpers
global.CFG = require('../config.json');
global.Log = require("./Log.js").Log;
global.Dm = require("./Dm.js").Dm;
//Helpers
global.URL_Exist = (url, cb) => {
  Request({ url: url, method: 'HEAD' }, function(err, res) {
    if (err) return cb(null, false);
    cb(null, /4\d\d/.test(res.statusCode) === false);
  });
}
global.BlockList = async (msg) => {
  return DB.ref(`blist/${msg.author.id}`).once("value").then((Snap) => {
    return Snap.val() ? true : false;
  });
}
global.Emoji = {
	a: '🇦', b: '🇧', c: '🇨', d: '🇩',
	e: '🇪', f: '🇫', g: '🇬', h: '🇭',
	i: '🇮', j: '🇯', k: '🇰', l: '🇱',
	m: '🇲', n: '🇳', o: '🇴', p: '🇵',
	q: '🇶', r: '🇷', s: '🇸', t: '🇹',
	u: '🇺', v: '🇻', w: '🇼', x: '🇽',
	y: '🇾', z: '🇿', 0: '0⃣', 1: '1⃣',
	2: '2⃣', 3: '3⃣', 4: '4⃣', 5: '5⃣',
	6: '6⃣', 7: '7⃣', 8: '8⃣', 9: '9⃣',
	10: '🔟', '#': '#⃣', '*': '*⃣',
	'!': '❗', '?': '❓', 'computer': '🖥',
};
// Dashboard Logs
global.Requests = () => {
  try {
	  DB.ref(`data/requests`).once('value').then(function(snapshot) {
      let Req = snapshot.val() && snapshot.val().Reqs ? snapshot.val().Reqs : 0;
      Req++
		  DB.ref(`data/requests`).set({
			  Reqs: Req
		  })
	  });
  } catch (err) {
		DB.ref(`data/requests`).set({
			Reqs: 1
		})
	}
}
global.sleep = ms => new Promise(res => setTimeout(res, ms));
