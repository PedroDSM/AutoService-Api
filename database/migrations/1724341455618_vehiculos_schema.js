'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VehiculosSchema extends Schema {
  up () {
    this.create('vehiculos', (table) => {
      table.increments() // ID del vehículo
      table.string('marca', 50).notNullable() // Marca del vehículo
      table.string('modelo', 50).notNullable() // Modelo del vehículo
      table.integer('anio').notNullable() // Año de fabricación
      table.string('color', 30) // Color del vehículo
      table.string('numero_placa', 20).unique().notNullable() // Número de placa
      table.string('numero_serie', 17).unique().notNullable() // Número de Serie del vehículo
      table.string('tipo_vehiculo', 50).notNullable() // Tipo de vehículo
      table.integer('kilometraje').notNullable() // Kilometraje
      table.string('transmision', 20).notNullable() // Tipo de transmisión
      table.integer('estado').defaultTo(1).notNullable() // Estado del vehículo como número (activo: 1, inactivo: 2, etc.)
      table.integer('propietario_id').unsigned().references('id').inTable('users') // Propietario del vehículo
      table.timestamps() // created_at y updated_at
    })
  }

  down () {
    this.drop('vehiculos')
  }
}

module.exports = VehiculosSchema
