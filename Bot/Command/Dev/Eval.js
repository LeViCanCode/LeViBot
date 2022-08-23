const vm = require('vm');
let isBalanced = (input) => {
  input = input.replace(/["`']+(.*?)["`']+/g, "");
  let brackets = "[]{}()''``\"\"", stack = []
  for(let bracket of input) {
    let bracketsIndex = brackets.indexOf(bracket)
    if (bracketsIndex === -1) continue
    if (bracketsIndex % 2 === 0) stack.push(bracketsIndex + 1)
    else if(stack.pop() !== bracketsIndex) return false;
  }
  return stack.length === 0
}
module.exports = {
	name: 'eval',
	description: 'runs code',
  Level: 'Dev',
	listed: true,
	async execute(msg, args, t, client) {
    msg.channel.send("Evaling");
    const context = {client: client,msg: msg};
    args.unshift("try {");
    args.push("} catch (err) {msg.channel.send(err);}");
    let code = `${args.join(" ").replace('console.log', 'msg.channel.send')}`
    if (isBalanced(code)) {
      try {
        let script = new vm.Script(code, {displayErrors: true});
        vm.createContext(context);
        await script.runInContext(context, {displayErrors: true});
      } catch (err) {
        msg.channel.send(`Error: ${err}`);
      }
    } else {
      msg.channel.send("Code is not balanced");
    }
  },
};