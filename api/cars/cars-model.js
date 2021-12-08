const db = require('../../data/db-config')

const getAll = async () => {
  return await db('cars').select()
}

const getById = async (id) => {
  return await db('cars').select().where('id', id).first()
}

const create = async (car) => {
  const id = await db('cars').insert(car)
  return await getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
}
