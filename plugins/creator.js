let handler = function (m) {
  // this.sendContact(m.chat, '6287714745440', 'Fadhli', m)
  this.sendContact(m.chat, '6287714746440', 'Fadhli', m)
this.conn.reply(m.chat, 'Ini Ownernyaa\nJanlup di sv yaa:>', m),
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(owner|creator)$/i

module.exports = handler
