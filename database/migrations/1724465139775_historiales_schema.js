'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HistorialesSchema extends Schema {
  up () {
    this.create('historiales', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.text('descripcion').notNullable()  // Descripción de la accion
      table.timestamps()
    })
  }

  down () {
    this.drop('historiales')
  }
}

module.exports = HistorialesSchema
