module.exports = function (input) {
  const PIRATE_OPEN = '<pirate>'
  const PIRATE_CLOSE = '</pirate>'

  const result = []

  for (i = 0; i < input.length; i++) {
    const str = input[i]
    const firstDevider = str.indexOf('/')
    if (firstDevider === -1) continue
    const secodnDevider = str.indexOf('/', firstDevider + 1)
    if (secodnDevider === -1) continue
    const messageDevider = str.indexOf(':{', secodnDevider)
    if (messageDevider === -1) continue
    const galaxy = str.slice(0, firstDevider)
    if (!galaxy) continue
    const system = str.slice(firstDevider + 1, secodnDevider)
    if (!system) continue
    const planet = str.slice(secodnDevider + 1, messageDevider)
    if (!planet) continue
    const message = str.slice(messageDevider)
    if (!message) continue

    const [galaxyName, galaxyNumber, ...rest] = galaxy.split('-')
    // galaxy name
    if (rest.length) continue
    if (galaxyName.length < 2) continue
    if (galaxyName.length > 8) continue
    if (!/^[A-Z-]*$/.test(galaxyName)) continue
    // galaxy number
    if (galaxyNumber.length < 2) continue
    if (galaxyNumber.length > 8) continue
    if (!/^[0-9]*$/.test(galaxyNumber)) continue

    // check system
    if (system.startsWith('-')) continue
    if (system.endsWith('-')) continue
    if (system.indexOf('--') !== -1) continue
    if (!/^[A-Z-]*$/.test(system)) continue

    // check planet
    if (!/^[A-Z]*$/.test(planet)) continue
    let prevChar = ''
    let isDone = false
    for (let j = 0; j < planet.length; j++) {
      const currentChar = planet[j]
      if (prevChar === currentChar) break
      prevChar = currentChar
      if (j + 1 === planet.length) isDone = true
    }
    if (!isDone) continue

    // check message
    const parts = message.split('@')
    let newMessage = ''
    if (parts.length) {
      let wasStart = false
      for (let k = 0; k < parts.length; k++) {
        const tag = wasStart ? PIRATE_CLOSE : PIRATE_OPEN
        const isLast = parts.length === k + 1
        newMessage += !isLast ? parts[k] + tag : parts[k]
        wasStart = !wasStart
      }
    } else {
      newMessage = message
    }

    result.push(`${galaxy}/${system}/${planet}${newMessage}`)
  }
  return result
}
