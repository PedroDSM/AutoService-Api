'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitasSchema extends Schema {
  up () {
    this.create('citas', (table) => {
      table.increments()
      table.integer('vehiculo_id').unsigned().references('id').inTable('vehiculos')
      table.integer('servicio_id').unsigned().references('id').inTable('servicios')
      table.integer('taller_id').unsigned().references('id').inTable('talleres')
      table.date('fecha_cita').notNullable()  // Fecha de la cita
      table.time('hora_cita').notNullable()  // Hora de la cita
      table.text('notas_adicionales').nullable()  // Notas adicionales sobre la cita
      table.integer('costo_cita').notNullable() // costo de la cita
      table.integer('estado').defaultTo(1).notNullable() // Estado de la cita
      table.timestamps()
    })
  }

  down () {
    this.drop('citas')
  }
}

module.exports = CitasSchema
