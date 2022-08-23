/**
 * @param {String} msg - required
 * @param {Boolean} discord - not required
 */
module.exports.Log = (msg) => {
	let split = "";
  for (let n = 0; n < msg.length; n++) {
		split += "=";
	}
	console.log('\x1b[33m%s\x1b[0m', split);
	console.log('\x1b[36m%s\x1b[0m', msg);
	console.log('\x1b[33m%s\x1b[0m', split);
};