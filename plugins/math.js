global.math = global.math ? global.math : {}
let handler  = async (m, { conn, args, usedPrefix }) => {
  if (args.length < 1) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contohnya gini sayang: ${usedPrefix}math tk
`.trim(), m)
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) return conn.reply(m.chat, `
Mode: ${Object.keys(modes).join(' | ')}

Contohnya gini sayang: ${usedPrefix}math tk
`.trim(), m)
  let id = m.chat
  if (id in global.math) return conn.reply(m.chat, 'Masih ada PR belum terjawab_-', global.math[id][0])
  let math = genMath(mode)
  global.math[id] = [
    await conn.reply(m.chat, `*Pertanyaan:* Berapakah hasil dari *${math.str}*??\n\nWaktunya: ${(math.time / 1000).toFixed(2)} detik dari Sekarang!\n\n*Kalo Bener dapet:* ${math.bonus} XP ,Lumayan kan buat beli martabucks`, m),
    math, 4,
    setTimeout(() => {
      if (global.math[id]) conn.reply(m.chat, `*yahh..* waktunya habis;(\nJawabannya ${math.result}`, global.math[id][0])
      delete global.math[id]
    }, math.time)
  ]
}
handler.help = ['math <mode>']
handler.tags = ['game']
handler.command = /^math/i

module.exports = handler

let modes = {
  tk: [-3, 3,-3, 3, '+-', 15000, 75],
  sd: [-10, 10, -10, 10, '*/+-', 20000, 125],
  smp: [-40, 40, -20, 20, '*/+-', 20000, 175],
  sma: [-100, 100, -70, 70, '*/+-', 30000, 350],
  smk: [-999999, 999999, -999999, 999999, '*/', 20000, 10101],
  kuliah: [-9999999, 9999999, -9999999, 9999999, '*/', 25000, 50505],
  smart: [-9999, 9999, -999, 999, '/', 15000, 5000]
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
