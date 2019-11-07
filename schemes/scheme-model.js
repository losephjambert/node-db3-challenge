const db = require('../data/dbConfig.js')

const find = () => {
  return db('schemes')
}

module.exports = ({ find })