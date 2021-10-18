module.exports = function (input) {
  return input
    .filter((message) => {
      return /^([A-Z]{2,8}-\d{2,8})\/((?:[A-Z]-?)+[A-Z])\/(([A-Z])(?!\4))+:\{(.*)\}$/.test(
        message,
      )
    })
    .map((message) => {
      return message.replace(/@(.*?)@/g, '<pirate>$1</pirate>')
    })
}
