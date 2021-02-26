let handler = async (m, { conn }) => {
  if (new Date - global.DATABASE._data.users[m.sender].lastclaim > 86400000) {
    global.DATABASE._data.users[m.sender].exp += 1000
    m.reply('Klaim Harian dari Bot senilai *+1000 XP*')
    global.DATABASE._data.users[m.sender].lastclaim = new Date * 1
  } else m.reply('Kamu sudahh mengklaim harian ambil lagi besok yaa:)')
}
handler.help = ['daily', 'claim']
handler.tags = ['xp']
handler.command = /^(daily|claim)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0

module.exports = handler

