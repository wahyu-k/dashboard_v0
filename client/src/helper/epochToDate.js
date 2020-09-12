/**
 * Convert the epoch time to the readable date
 *
 * @param {int} epoch - The epoch time
 * @returns {string} date - The converted epoch
 */
const epochToDate = (epoch) => {
  const d = new Date(0)
  d.setSeconds(epoch / 1000)
  return d.toUTCString()
}

export default epochToDate
