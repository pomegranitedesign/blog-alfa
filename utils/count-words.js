export default function countWords(text) {
  if (!text) {
    return 0
  }
  // protect against Handlebars.SafeString
  if (text.hasOwnProperty('string')) {
    text = text.string
  }

  text = text.replace(/<(.|\n)*?>/g, ' ') // strip any HTML tags

  const pattern = /[a-zA-ZÀ-ÿ0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g
  const match = text.match(pattern)
  let count = 0

  if (match === null) {
    return count
  }

  for (var i = 0; i < match.length; i += 1) {
    if (match[i].charCodeAt(0) >= 0x4e00) {
      count += match[i].length
    } else {
      count += 1
    }
  }

  return count
}
