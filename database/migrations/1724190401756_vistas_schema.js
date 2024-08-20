'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VistasSchema extends Schema {
  up () {
    this.create('vistas', (table) => {
      table.increments()
      table.string('nombre', 80).notNullable()
      table.string('icono', 150).notNullable()
      table.string('ruta', 150).notNullable()
      table.string('status',50).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('vistas')
  }
}

module.exports = VistasSchema
