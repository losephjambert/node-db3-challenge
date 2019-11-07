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

const findSteps = async id => {
  console.log(id)
  try {
    const steps = await db('steps')
      .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
      .where('steps.scheme_id', '=', id)
      .select('steps.id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
    console.log('steps', steps)
    return steps
  } catch (error) {
    console.log(error)
    return error
  }
}

const add = async schemeData => {
  try {
    const newScheme = await db('schemes').insert(schemeData)
    const createdScheme = await db('schemes').where('id', '=', newScheme[0]).first()
    return createdScheme
  } catch (error) {
    return error
  }
}

const update = async (changes, id) => {
  try {
    const updateScheme = await db('schemes').where('id', '=', id).update(changes)
    const updatedScheme = updateScheme &&
      await db('schemes').where('id', '=', id).first()
    return updatedScheme
  } catch (error) {
    return error
  }
}

module.exports = ({ find, findById, findSteps, add, update })