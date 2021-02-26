const { createHash } = require('crypto')
let Reg = /(.*)([.|])([0-9]*)$/i
let handler = async function (m, { text, usedPrefix }) {
let d = new Date
    let locale = 'id'
    let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
  let user = global.DATABASE._data.users[m.sender]
  if (user.registered === true) throw `Kamu sudah terdaftar misqah\nMau daftar ulang? ${usedPrefix}unreg <SN|SERIAL NUMBER>`
  if (!Reg.test(text)) throw `Format salah\n*${usedPrefix}daftar <nama>.umur>*`
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw 'Hey Nama Ga boleh kosong (Alphanumeric)'
  if (!age) throw 'Hey Umur Ga boleh kosong (Angka)'
  user.name = name
  user.age = parseInt(age)
  user.regTime = + new Date
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  m.reply(`
「 PENDAFTARAN BERHASIL 」
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
⏜⏜⏜⏜⏜⏜⏜⏜
⌲    *Informations* 
⏝⏝⏝⏝⏝⏝⏝⏝
%week, %date
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
------------------------------
⌬ \`\`\`Nama: ${name}\`\`\`
⌬ \`\`\`Umur: ${age} tahun\`\`\`
⌬ \`\`\`SN: ${sn}\`\`\`
------------------------------
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
⏜⏜⏜⏜⏜⏜⏜⏜
⍚ *NOTE*
Diharapkan SN ini jangan hilang,\nKarena ini sangat penting:v
⏝⏝⏝⏝⏝⏝⏝⏝
⏥⏥⏥⏥⏥⏥⏥⏥⏥⏥
`.trim())
}
handler.help = ['daftar', 'reg', 'register'].map(v => v + ' <nama>.<umur>')
handler.tags = ['exp']

handler.command = /^(daftar|reg(ister)?)$/i

module.exports = handler

