const db = require('../data/dbConfig.js')

const find = () => {
  return db('schemes')
}

const findById = id => {
  const d = db('schemes').where('id', '=', id).null
  d.then(a => console.log(a)).catch(b => console.log(b))
  return d
}

module.exports = ({ find, findById })