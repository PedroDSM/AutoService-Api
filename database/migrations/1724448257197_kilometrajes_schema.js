'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class KilometrajesSchema extends Schema {
  up () {
    this.create('kilometrajes', (table) => {
      table.increments()
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.integer('kilometraje').notNullable() // Kilometraje registrado al fin de mes
      table.integer('km_recorridos').notNullable() // Kilometraje recorrido desde el último registro
      table.timestamps()
    })
  }

  down () {
    this.drop('kilometrajes')
  }
}

module.exports = KilometrajesSchema
