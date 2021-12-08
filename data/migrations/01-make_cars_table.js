exports.up = async (knex) => {
  await knex.schema.createTable('cars', (table) => {
    table.increments('id')
    table.text('vin', 17).unique()
    table.text('make', 128).notNullable()
    table.text('model', 128).notNullable()
    table.decimal('mileage').unsigned()
    table.text('title', 128)
    table.text('transmission', 128)
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('cars')
}
