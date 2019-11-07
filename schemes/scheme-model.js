const db = require('../data/dbConfig.js')

const find = () => {
  return db('schemes')
}

const findById = async id => {
  try {
    const scheme = await db('schemes').where('id', '=', id)
    if (scheme.length === 0) return null
    else return scheme
  } catch (error) {
    return error
  }
}

module.exports = ({ find, findById })