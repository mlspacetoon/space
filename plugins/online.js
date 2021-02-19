let handler = async (m, { conn, args }) => {
  let id = args && /\d+\-👀\d+@g.us/.test(args[0]) ? args[0] : m.chat
  let online = [...Object.keys(conn.chats.get(id).presences), conn.user.jid]
  conn.reply(m.chat, 'yang online..\n' + online.map(v => '-👀 @' + v.replace(/@.+/, '')).join`\n`, m, {
    contextInfo: { mentionedJid: online }
  })
}
handler.help = ['here','listonline']
handler.tags = ['group']
handler.command = /^(here|(list)?online)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

