exports.up = async (knex) => {
  await knex.schema.createTable('cars', (table) => {
    table.increments('car_id')
    table
      .text('vin', 128) // sqlite does not enforce the char limit
      .unique()
      .notNullable()
    table.text('make').notNullable()
    table.text('model').notNullable()
    table.decimal('mileage').notNullable()
    table.text('title').defaultTo('')
    table.text('transmission').defaultTo('')
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('cars')
}
