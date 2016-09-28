const mod = (x, y) => (x - y * Math.floor(x / y))

const randomKey = len => {
  let text = ''
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < len; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}

const randomKeyBin = len => {
  let text = ''

  for (let i = 0; i < len * 8; i++)
    text += (Math.random() > 0.5) ? 1 : 0
  return text
}

export {
  mod,
  randomKey,
  randomKeyBin
}
