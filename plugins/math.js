global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix }) => {
  if (args.length < 1) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contoh penggunaan: ${usedPrefix}math tk
`.trim(), m)
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contoh penggunaan: ${usedPrefix}math tk
`.trim(), m)
  let id = m.chat
  if (id in global.math) return conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', global.math[id][0])
  let math = genMath(mode)
  global.math[id] = [
    await conn.reply(m.chat, `Berapa hasil dari *${math.str}*?\n\nTimeout: ${(math.time / 1000).toFixed(2)} detik\nBonus Jawaban Benar: ${math.bonus} XP`, m),
    math, 4,
    setTimeout(() => {
      if (global.math[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah ${math.result}`, global.math[id][0])
      delete global.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i

module.exports = handler

let modes = {
  tk: [-3, 3,-3, 3, '+-', 15000, 50],
  sd: [-10, 10, -10, 10, '*/+-', 20000, 100],
  smp: [-40, 40, -20, 20, '*/+-', 15000, 150],
  sma: [-100, 100, -70, 70, '*/+-', 30000, 350],
  smk: [-999999, 999999, -999999, 999999, '*/', 20000, 10000],
  kuliah: [-9999999, 9999999, -9999999, 9999999, '*/', 20000, 50000],
  smart: [-9999, 9999, -999, 999, '/', 10000, 123456789]
} 

let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}

function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}

function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
