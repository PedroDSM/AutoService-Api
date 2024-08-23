'use strict'

const Schema = use('Schema')

class ServiciosSchema extends Schema {
  up () {
    this.create('servicios', (table) => {
      table.increments()  // Identificador único
      table.string('nombre', 255).notNullable()  // Nombre del servicio
      table.text('descripcion').notNullable()  // Descripción del servicio
      table.string('categoria', 100).notNullable()  // Categoría del servicio
      table.integer('precio').notNullable()  // Precio estimado
      table.integer('duracion').notNullable()  // Duración estimada en minutos
      table.boolean('status').defaultTo(true).notNullable()  // Estado del servicio (activo/inactivo)
      table.timestamps()  // Crea las columnas 'created_at' y 'updated_at'
    })
  }

  down () {
    this.drop('servicios')
  }
}

module.exports = ServiciosSchema
