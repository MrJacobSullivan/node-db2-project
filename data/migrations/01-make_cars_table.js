exports.up = async (knex) => {
  await knex.schema.createTable('cars', (table) => {
    table.increments('car_id')
  })
}

exports.down = async (knex) => {
  // DO YOUR MAGIC
}
