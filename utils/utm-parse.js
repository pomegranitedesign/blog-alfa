const queryString = require('query-string')

const has = Object.prototype.hasOwnProperty

export function utmParse(query) {
  if (query.charAt(0) === '?') {
    query = query.substring(1)
  }

  query = query.replace(/\?/g, '&')
  let param
  let params = queryString.parse(query)
  let results = {}
  for (let key in params) {
    if (has.call(params, key)) {
      if (key.substr(0, 4) === 'utm_') {
        param = key.substr(4)
        results[param] = params[key]
      }
    }
  }

  return results
}
