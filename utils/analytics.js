export const logPageView = (url) => {
  if (window.hasOwnProperty('analytics')) {
    window.analytics.page(url)
  }
}
export const track = (name, properties) => {
  if (window.hasOwnProperty('analytics')) {
    window.analytics.track(name, properties)
  }
}

