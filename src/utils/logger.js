const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}
const error = (...param) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('error', ...param)
  }
}
export default { error, info }
