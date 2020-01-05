const shortMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const getShortDate = (date) => {
  let dateTime = new Date(date)
  return dateTime.getDate() + ' ' + shortMonths[dateTime.getMonth()]
}
export const getFullDate = (date) => {
  let dateTime = new Date(date)
  return dateTime.getDate() + ' ' + months[dateTime.getMonth()]
}
