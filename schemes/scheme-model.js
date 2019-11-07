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
  try {
    const steps = await db('steps')
      .join('schemes', 'schemes.id', '=', 'steps.scheme_id')
      .where('steps.scheme_id', '=', id)
      .select('steps.id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
    return steps
  } catch (error) {
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

const remove = async id => {
  try {
    return await db('schemes')
      .where('id', '=', id)
      .del()
  } catch (error) {
    return error
  }
}

const addStep = async (stepData, schemeId) => {
  const step = {
    ...stepData,
    scheme_id: schemeId
  }

  try {
    const insertStep = await db('steps').insert(step)
    return insertStep
  } catch (error) {
    return error
  }
}

module.exports = ({ find, findById, findSteps, add, update, remove, addStep })