module.exports = {
	name: 'hangup',
	description: 'Hangups',
	Level: 'User',
	listed: true,
  Guild: [
    "663964049607884823",
    "663964049607884820"
  ],
	async execute(msg, a, t, client) {
		await DB.ref('data/matched').once('value', (data) => {
			if (data.val() !== null) {
        for(i=0; i <= data.val().length; i++){
          if(data.val()[i] !== undefined){
            if(data.val()[i].u1 === msg.author.id){
              client.users.cache.get(msg.author.id).send(`Successfully hung up with <@${data.val()[i].u2}> `)
						  client.users.cache.get(data.val()[i].u2).send(` <@${data.val()[i].u1}> Has successfully ended the connection.`)
              DB.ref(`data/matched/${i}`).remove()
            }else if(data.val()[i].u2 === msg.author.id) {
              client.users.cache.get(msg.author.id).send(`Successfully hung up with <@${data.val()[i].u1}> `)
							client.users.cache.get(data.val()[i].u1).send(` <@${data.val()[i].u2}> Has successfully ended the connection.`)
              DB.ref(`data/matched/${i}`).remove()
            }
          }
        }
			}
		})
	}
}