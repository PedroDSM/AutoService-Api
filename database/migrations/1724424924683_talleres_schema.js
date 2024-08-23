'use strict'

const Schema = use('Schema')

class TalleresSchema extends Schema {
  up () {
    this.create('talleres', (table) => {
      table.increments()
      table.string('nombre', 255).notNullable()  // Nombre del taller
      table.string('direccion', 255).notNullable()  // Dirección del taller
      table.string('telefono', 20).notNullable()  // Teléfono de contacto
      table.time('horario_apertura').notNullable()  // Hora de apertura
      table.time('horario_cierre').notNullable()  // Hora de cierre
      table.boolean('status').defaultTo(true).notNullable() // Estado del taller (activo/inactivo)
      table.timestamps()  // Crea las columnas 'created_at' y 'updated_at'
    })
  }

  down () {
    this.drop('talleres')
  }
}

module.exports = TalleresSchema
