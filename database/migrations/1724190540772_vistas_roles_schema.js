'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VistasRolesSchema extends Schema {
  up () {
    this.create('vistas_roles', (table) => {
      table.increments()
      table.integer('rol_id').unsigned().references('id').inTable('roles')
      table.integer('vista_id').unsigned().references('id').inTable('vistas')
      table.timestamps()
    })
  }

  down () {
    this.drop('vistas_roles')
  }
}

module.exports = VistasRolesSchema
